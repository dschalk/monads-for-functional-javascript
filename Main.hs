{-# LANGUAGE OverloadedStrings, TemplateHaskell #-}
import Data.Monoid (mappend)
import Data.Text (Text)
import Data.Text.IO as D
import Control.Exception (finally)
import Control.Monad (forM_, forever)
import Control.Concurrent (forkIO)
import Control.Concurrent.STM
import Control.Monad.IO.Class (liftIO)
import Network.WebSockets (sendClose)
import qualified Data.Text as T
import qualified Data.Text.IO as T
import qualified Network.WebSockets as WS
import qualified Network.Wai
import qualified Network.Wai.Handler.Warp as Warp
import qualified Network.Wai.Handler.WebSockets as WaiWS
import qualified Network.Wai.Application.Static as Static
import Data.FileEmbed (embedDir)
import Fm (rText, truck) 
import Data.List (intersperse)
import Control.Exception.Base (mask_)
import Data.List.Split (splitOn)
import Tasks hiding (main)
import System.Directory
-- import System.Environment (getEnv)

solo :: Text
solo = "solo"
com = T.pack ","

type Name = Text
type Score = Int
type Goal = Int
type Group = Text
type Client = (Name, Score, Goal, Group, WS.Connection)
type ServerState = [Client]

getName :: Client -> Name
getName (a,_,_,_,_) = a

findGroup :: Client -> Name
findGroup (_,_,_,d,_) = d

getConn :: Client -> WS.Connection
getConn (_,_,_,_,e) = e

get4 :: [String] -> [Int]
get4 [_,_,_,a,b,c,d,_,_] = fmap read [a,b,c,d]
get4 _ = [-1,-1,-1,-1]

get5 :: [String] -> [Double]
get5 [_,_,_,a,b,c,d,e] = fmap read [a,b,c,d,e]
get5 _ = [-1,-1,-1,-1,-1]

get2 :: [String] -> Text
get2 [_,_,_,_,_,_,_,e,f] = T.intercalate com (fmap T.pack [e,f])
get2 _ = T.pack "error in get2"

get2G :: [String] -> [Int]
get2G [_,_,_,_,_,_,_,e,f] = fmap read [e,f]
get2G _ = [8888, 8888]

subState :: Text -> Text -> [(Text,Int,Int,Text,WS.Connection)] -> [(Text,Int,Int,Text,WS.Connection)]
subState name gr state  | gr /= solo  = [ (a,b,c,d,e) | (a,b,c,d,e) <- state, gr == d ]
                        | gr == solo = [ (a,b,c,d,e) | (a,b,c,d,e) <- state, name == a]

groupNames :: Text -> [(Text,Int,Int,Text,WS.Connection)] -> [Text]
groupNames gr state  | gr /= solo  = [ a `mappend` (", " :: Text) `mappend` T.pack (show b) `mappend` (", " :: Text) `mappend` T.pack (show c) | (a,b,c,d,e) <- state, gr == d ]
                     | otherwise = [T.empty]

extract :: [Text] -> Text
extract [x] = x
extract _ = "Error in extract"

getGroup :: Eq a => a -> [(a, t, t1, Text, t2)] -> Text
getGroup name state = extract [ d | (a,_,_,d,_) <- state, name == a ]

first :: (a,a1,a2,a3,a4) -> a
first (w,_,_,_,_) = w

bcast :: Text -> ServerState -> IO ()
bcast message clients = do
    T.putStrLn message
    forM_ clients $ \(_ ,_, _, _, conn) -> WS.sendTextData conn message

textState :: (Show a1, Show a) => [(Text, a, a1, t, t1)] -> [Text]
textState s = [ a  `mappend` " " `mappend` T.pack (show b) `mappend` " | " `mappend` T.pack (show c) `mappend` " | "  | (a,b,c,_,_) <- s]

newGroup :: Text -> Text -> Client -> Client
newGroup name group (a, b, c, d, e)   | name == a  = (a, 0, 0, group, e)
                                      | otherwise = (a, b, c, d, e)

newGroupKeepScore :: Text -> Text -> Client -> Client
newGroupKeepScore name group (a, b, c, d, e)  | name == a  = (a, b, c, group, e)
                                   | otherwise = (a, b, c, d, e)

changeGroupKeepScore :: Text -> Text -> ServerState -> ServerState
changeGroupKeepScore name group = map (newGroupKeepScore name group)

changeGroup :: Text -> Text -> ServerState -> ServerState
changeGroup name group = map (newGroup name group)

changeS :: Text -> Int -> Int -> Client -> Client
changeS x y z (a, b, c, d, e) | x == a    = (a, y, z, d, e)
                         | otherwise = (a, b, c, d, e)

chg6 :: Text -> Int -> Int -> Client -> Client
chg6 x y z (a, b, c, d, e) | x == a    = (a, y, z, d, e)
                         | otherwise = (a, b, c, d, e)

changeScore :: Text -> Int -> Int -> ServerState -> ServerState
changeScore name k q = map (changeS name k q)
 
chgScore :: Text -> Int -> Int -> ServerState -> ServerState
chgScore name k q = map (chg6 name k q)
 
newServerState :: ServerState
newServerState = []

matches :: Text -> ServerState -> [Client]
matches a ss = [ x | x <- ss, getName x == a]

clientExists :: Text -> ServerState -> Bool
clientExists a ss  | null (matches a ss)   = False
                   | otherwise             = True

matchesGroup :: Text -> ServerState -> [Client]
matchesGroup a ss = [ x | x <- ss, findGroup x == a]

groupExists :: Text -> ServerState -> Bool
groupExists a ss   | null (matchesGroup a ss) = False
                   | otherwise                = True

addClient :: Client -> ServerState -> ServerState
addClient client clients = client : clients

removeClient :: Client -> ServerState -> ServerState
removeClient client = filter ((/= getName client) . getName)

closeClientConn :: WS.WebSocketsData a => Client -> ServerState -> a -> ServerState
closeClientConn client s = do
    let s' = removeClient client s
    _ <- sendClose (getConn client)
    return s'

broadcast :: Text -> ServerState -> IO ()
broadcast message clients = do
    T.putStrLn message
    forM_ clients $ \(_ , _, _, _, conn) -> WS.sendTextData conn message

main :: IO ()
main = do
    -- por <- getEnv "PORT"
    -- let port = read por
    state <- atomically $ newTMVar newServerState
    Warp.runSettings
     (Warp.setPort 3055 $ 
       Warp.setTimeout 36000 $ 
         Warp.defaultSettings) $ 
           WaiWS.websocketsOr WS.defaultConnectionOptions (application state) staticApp
staticApp :: Network.Wai.Application
staticApp = Static.staticApp $ Static.embeddedSettings $(embedDir "./src/dist")
application :: TMVar ServerState -> WS.ServerApp
application state pending = do
    print "App is fired up"
    conn <- WS.acceptRequest pending
    msg <- WS.receiveData conn
    print $ (T.unpack msg)
    clients <- atomically $ readTMVar state
    case msg of
        _   | not (prefix `T.isPrefixOf` msg) ->
                WS.sendTextData conn ("Wrong announcement" :: Text)
            | any ($ getName client)
                [T.null] ->
                    WS.sendTextData conn ("Name cannot be empty" :: Text)
            | clientExists (getName client) clients -> 
                do
                  let duplicate = getName client
                  WS.sendTextData conn ("EE#$42,solo," `mappend` duplicate `mappend` " ,solo" :: Text)
            | otherwise -> flip finally disconnect $ do
                    let name = getName client
                    st <- atomically $ takeTMVar state
                    let st2 = addClient client st
                    atomically $ putTMVar state st2
                    WS.sendTextData conn ("CC#$42,solo," `mappend` name `mappend` " ,joined" :: Text)
                    talk conn state client
         where
                prefix     = "CC#$42"
                client     = (T.drop (T.length prefix) msg, 0, 0, T.pack "solo", conn)
                disconnect = do
                    let name = getName client
                    s <- atomically $ takeTMVar state
                    let s' = removeClient client s
                    atomically $ putTMVar state s'
                    let gr = getGroup (first client) s
                    let subSt = subState (getName client) gr s'
                    broadcast ("NN#$42," `mappend` gr `mappend` "," `mappend` name `mappend` "," 
                        `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt

talk :: WS.Connection -> TMVar ServerState -> Client -> IO ()
talk conn state (_, _, _, _, _) = forever $ do
    print "In talk"
    msg <- WS.receiveData conn
    print $ "Incoming msg " ++ (T.unpack msg)
    let msgArray = splitOn "," (T.unpack msg)
    let group = T.pack (msgArray !! 1)
    let sender = T.pack (msgArray !! 2)
    let extra = T.pack (msgArray !! 3)
    let extra2 = T.pack (msgArray !! 4)
    let extraNum = read (msgArray !! 3) :: Int
    let extraNum2 = read (msgArray !! 4) :: Int
    let mes = "<><><><><> Outgoing message from Main.hs " :: Text


    if "CA#$42" `T.isPrefixOf` msg
        then
            do
                old <- atomically $ takeTMVar state
                let sg = get2G msgArray
                let new = chgScore sender (sg !! 0) (sg !! 1) old
                atomically $ putTMVar state new
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," 
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt
                z <- rText $ get4 msgArray
                let x = get2 msgArray
                print $ show z
                print $ show x
                broadcast ("CA#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` z `mappend` "," `mappend` x ) subSt

    else if "CZ#$42" `T.isPrefixOf` msg
            then do
                y <- liftIO $ truck $ get5 msgArray
                let yzz = T.pack y
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("CZ#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` yzz) subSt

    else if "DZ#$42" `T.isPrefixOf` msg
            then do
                y <- liftIO $ truck $ get5 msgArray
                let yzz = T.pack y
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("DZ#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` yzz) subSt

    else if "CC#$42" `T.isPrefixOf` msg || "CE#$42" `T.isPrefixOf` msg ||
        "CH#$42" `T.isPrefixOf` msg || "CK#$42" `T.isPrefixOf` msg || "XY#$42" `T.isPrefixOf` msg ||
        "CQ#$42" `T.isPrefixOf` msg || "DE#$42" `T.isPrefixOf` msg || "EQ#$42" `T.isPrefixOf` msg || 
        "GQ#$42" `T.isPrefixOf` msg || "CF#$42" `T.isPrefixOf` msg ||
        "CY#$42" `T.isPrefixOf` msg || "CR#$42" `T.isPrefixOf` msg || "CD#$42" `T.isPrefixOf` msg ||
        "IA#$42" `T.isPrefixOf` msg || "DY#$42" `T.isPrefixOf` msg          
        then
            do
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast msg subSt
                print $ mes `mappend` msg
  
    else if "CO#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                old <- atomically $ takeTMVar state
                let new = changeGroup sender extra old
                atomically $ putTMVar state new
                let subSt1 = subState sender extra new
                tasks <- liftIO $ read2 (msgArray !! 3)
                st <- atomically $ readTMVar state
                let subSt2 = subState sender group st
                broadcast ("DD#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," `mappend` tasks) subSt1
                -- broadcast ("DD#$42," `mappend` extra `mappend` "," `mappend` sender `mappend` "," `mappend` tasks) subSt2
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` (T.pack "Bozo") `mappend` "," 
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt2))) subSt2

    else if "HQ#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                s <- atomically $ readTMVar state
                let subSt = subState sender group s
                broadcast msg subSt
                broadcast ("CB#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt

    else if "CG#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                old <- atomically $ takeTMVar state
                let new = changeScore sender extraNum extraNum2 old
                atomically $ putTMVar state new
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," 
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt


    else if "DD#$42" `T.isPrefixOf` msg
            then do
                tasks <- liftIO $ read2 (msgArray !! 1)
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("DD#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," `mappend` tasks) subSt

    else if "TD#$42" `T.isPrefixOf` msg
        then
            do
                save (msgArray !! 1) $ msg
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("DD#$42," `mappend` group `mappend` "," 
                    `mappend` sender `mappend` "," `mappend` msg) subSt

    else if "TG#$42" `T.isPrefixOf` msg
        then
            do
                let comment = (T.splitOn "@" msg) !! 1
                print comment
                old <- T.readFile "COMMENTS.txt"
                let allComments = old `mappend` "\n" `mappend` sender `mappend ` " commented: " `mappend` comment
                T.writeFile "COMMENTS.txt" allComments
                st <- atomically $ readTMVar state
                broadcast ("GG#$42," `mappend` group `mappend` "," 
                    `mappend` sender `mappend` ",@" `mappend` allComments) st

    else if "TG#$41" `T.isPrefixOf` msg
        then
            do
                old <- T.readFile "COMMENTS.txt"
                st <- atomically $ readTMVar state
                broadcast ("TG#$41," `mappend` group `mappend` "," 
                    `mappend` sender `mappend` ",@" `mappend` old) st

    else if "TG#$40" `T.isPrefixOf` msg
        then
            do
                old <- T.readFile "_count"
                let new = (read (T.unpack old) :: Integer) + 1 
                let new2 = T.pack(show new)
                T.writeFile "_count" new2
                print new
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("TG#$40," `mappend` group `mappend` "," 
                    `mappend` sender `mappend` ","  `mappend` old) subSt


    else if "TX#$42" `T.isPrefixOf` msg
        then
            do
                removeFile (msgArray !! 1)

    else if "NT#$42" `T.isPrefixOf` msg
        then
            do
                let task = (T.splitOn "@" (msg)) !! 1
                save(msgArray !! 1) $ task
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                tasks <- liftIO $ read2 (msgArray !! 1)
                broadcast ("DD#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` tasks) subSt

      else do
        print "*********************************************************"
        print "Message fell through to the bottom in Main.hs"
        print msg
        print "*********************************************************"
