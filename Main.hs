{-# LANGUAGE DataKinds         #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell   #-}
import           Control.Concurrent             (forkIO)
import           Control.Concurrent.STM
import           Control.Exception              (finally)
import           Control.Exception.Base         (mask_)
import           Control.Monad                  (forM_, forever)
import           Control.Monad.IO.Class         (liftIO)
import           Data.FileEmbed                 (embedDir)
import           Data.List                      (intersperse)
import           Data.List.Split                (splitOn)
import           Data.Monoid                    (mappend)
import           Data.Text                      (Text)
import qualified Data.Text                      as T
import qualified Data.Text.IO                   as TIO
import           Fm                             (rText, truck)
import qualified Network.Wai
import qualified Network.Wai.Application.Static as Static
import qualified Network.Wai.Handler.Warp       as Warp
import qualified Network.Wai.Handler.WebSockets as WaiWS
import           Network.WebSockets             (sendClose)
import qualified Network.WebSockets             as WS
import           System.Directory
import           Tasks                          hiding (main)
-- import System.Environment (getEnv)

solo :: Text
solo = "solo"

com = T.pack ","

oh :: Text
oh = "<o>"

type Name = Text
type Score = Int
type Goal = Int
type Group = Text
type Password = Text
type Client = (Name, Score, Goal, Group, WS.Connection, Password)
type ServerState = [Client]

getName :: Client -> Text
getName (a,_,_,_,_,_) = a

getScore :: Client -> Score
getScore (_,b,_,_,_,_) = b

getGoal :: Client -> Goal
getGoal (_,_,c,_,_,_) = c

findGroup :: Client -> Group
findGroup (_,_,_,d,_,_) = d

getConn :: Client -> WS.Connection
getConn (_,_,_,_,e,_) = e

checkName :: String -> String -> IO Bool
checkName n f = do
  let b = splitOn "<@>" f
  let c = map (splitOn "<o>") b
  let d = [a | [a,b] <- c]
  let e = n `elem` d
  return e

checkCombo nt ft = do
  let n = T.unpack nt
  print n
  let f = T.unpack ft
  print f
  let c = splitOn "<@>" f
  print c
  let d = filter (\x -> not (null x))  c
  print d
  let e = n `elem` c
  print $ show e
  return e

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

subState :: Text -> Text -> [(Text,Int,Int,Text,WS.Connection,Text)] -> [(Text,Int,Int,Text,WS.Connection,Text)]
subState name gr state  | gr /= solo  = [ (a,b,c,d,e,f) | (a,b,c,d,e,f) <- state, gr == d ]
                        | gr == solo = [ (a,b,c,d,e,f) | (a,b,c,d,e,f) <- state, name == a]

extract :: [Text] -> Text
extract [x] = x
extract _ = "Error in extract"

getGroup name state = extract [ d | (a,_,_,d,_,_) <- state, name == a ]

content :: [String] -> String
content [] = "Empty List"
content [x] = x
content _ = "Major malfunction in the function named 'content'."

extractClient :: [Client] -> Client
extractClient [(a,b,c,d,e,f)] = (a,b,c,d,e,f)

first :: (a,a1,a2,a3,a4,a5) -> a
first (w,_,_,_,_,_) = w

bcast :: Text -> ServerState -> IO ()
bcast message clients = do
    TIO.putStrLn message
    forM_ clients $ \(_ ,_, _, _, conn,_) -> WS.sendTextData conn message

textState s = [ a  `mappend` " " `mappend` T.pack (show b) `mappend` " | " `mappend` T.pack (show c) `mappend` " | "  | (a,b,c,_,_,_) <- s]

newGroup :: Text -> Text -> Client -> Client
newGroup name group (a, b, c, d, e, f)   | name == a  = (a, 0, 0, group, e, f)
                                      | otherwise = (a, b, c, d, e, f)

extractName :: String -> IO Text
extractName combo = do
  let a = splitOn "<o>" combo
  let b = T.pack $ head a
  return b

extractHead [a,b] = a
extractHead _ = T.pack "Error. ExtractHead is being applied to something other than a two item list of Text"

extractTail [a,b] = b
extractTail _ = T.pack "Error. ExtractTail is being applied to something other than a two item list of Text"

newName :: Text -> Text -> Text -> Client -> Client
newName name1 name2 name3(a, b, c, d, e, f) | name1 == a  = (name2, b, c, d, e, name3)
                                    | otherwise = (a, b, c, d, e, f)

changeName :: Text -> Text -> Text -> ServerState -> ServerState
changeName name1 name2 name3 = map (newName name1 name2 name3)

newGroupKeepScore :: Text -> Text -> Client -> Client
newGroupKeepScore name group (a, b, c, d, e, f)  | name == a  = (a, b, c, group, e, f)
                                   | otherwise = (a, b, c, d, e, f)

changeGroupKeepScore :: Text -> Text -> ServerState -> ServerState
changeGroupKeepScore name group = map (newGroupKeepScore name group)

changeGroup :: Text -> Text -> ServerState -> ServerState
changeGroup name group = map (newGroup name group)

changeS :: Text -> Int -> Int -> Client -> Client
changeS x y z (a, b, c, d, e, f) | x == a    = (a, y, z, d, e, f)
                         | otherwise = (a, b, c, d, e, f)

chg6 :: Text -> Int -> Int -> Client -> Client
chg6 x y z (a, b, c, d, e, f) | x == a    = (a, y, z, d, e, f)
                         | otherwise = (a, b, c, d, e, f)

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
    TIO.putStrLn message
    forM_ clients $ \(_ , _, _, _, conn,_) -> WS.sendTextData conn message

main :: IO ()
main = do
    -- por <- getEnv "PORT"
    -- let port = read por
    state <- atomically $ newTMVar newServerState
    Warp.runSettings
     (Warp.setPort 3055 $
       Warp.setTimeout 36000
         Warp.defaultSettings) $
           WaiWS.websocketsOr WS.defaultConnectionOptions (application state) staticApp
staticApp :: Network.Wai.Application
staticApp = Static.staticApp $ Static.embeddedSettings $(embedDir "./src/dist")
application :: TMVar ServerState -> WS.ServerApp
application state pending = do
    print "App is fired up"
    conn <- WS.acceptRequest pending
    msg <- WS.receiveData conn
    print $ T.unpack msg
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
                namePword = T.splitOn oh $ T.drop (T.length prefix) msg
                client = (head namePword :: Name, 0, 0, solo, conn, last namePword :: Password)
                disconnect = do
                    let name = getName client
                    print $ T.unpack name ++ " is leaving"
                    s <- atomically $ takeTMVar state
                    let grp = getGroup name s
                    let s' = removeClient client s
                    atomically $ putTMVar state s'
                    let subSt = subState name grp s'
                    broadcast ("NN#$42," `mappend` grp `mappend` ",nobody,"
                        `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt


talk :: WS.Connection -> TMVar ServerState -> Client -> IO ()
talk conn state client = forever $ do
    msg <- WS.receiveData conn
    let msg2 = T.unpack msg
    print $ "In talk. The incoming message is " ++ msg2
    let mArr = splitOn "," msg2
    let msgArray = T.splitOn "," msg
    let group = msgArray !! 1
    let sender = msgArray !! 2
    let extra = msgArray !! 3
    let extra2 = msgArray !! 4
    let extraNum = read (mArr !! 3) :: Int
    let extraNum2 = read (mArr !! 4) :: Int
    let mes = "<><><><><> Outgoing message from Main.hs " :: Text
    let xcomments = "xcomments" :: FilePath
    let xnames = "xnames" :: FilePath
    let namesFile = "namesFile" :: FilePath
    let at = T.pack "<@>"
    let oh = T.pack "<o>"
    let comma = T.pack ", "
    let comma2 = T.pack ","

    if "XX#$42" `T.isPrefixOf` msg
      then
        do
          let newName = (T.unpack extra)
          nams <- readFile namesFile
          let namses = splitOn "<&>"nams
          let result = any (==newName) namses
          if (not result)
            then
              do
                appendFile namesFile newName
                let newNameList = T.splitOn (T.pack "<&>") extra
                st <- atomically $ readTMVar state
                let newState = changeName sender (extractHead newNameList) (extractTail newNameList) st
                print "Have arrived in XX"
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                names <- readFile namesFile
                print "*******************************************  of XX#$42"
                print names
                print newName
                let nam = splitOn "<&>" names
                let nameList = map (head . splitOn"<o>") nam
                print nameList
                print $ "Hello Nurse " ++ (show result)
                print "******************************************* End of XX#$42"
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("XX#$42," `mappend` group `mappend` ","
                 `mappend` (extractHead    newNameList) `mappend` ","
                  `mappend` extra `mappend` ","
                   `mappend` (T.pack (show result)) `mappend` ",") subSt
            else
              print "Hello Nurse"
      else
        print "Hello Nurse, how do you do?"

    if "YY#$42" `T.isPrefixOf` msg                              -- TEST AND ADD NAME AND NAME<o>PASSWORD
        then
            do
                let check = splitOn "<o>" (T.unpack extra)
                let checkName = head check
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                names <- readFile namesFile
                print "*******************************************  of YY#$42"
                print names
                print checkName
                let nam = splitOn "<&>" names
                let nameList = map (head . splitOn "<o>") nam
                let result = checkName `elem` nameList
                let result2 = T.unpack extra `elem` nam
                print nameList
                print $ "Hello Nurse. Here are result and result2 from YY" ++ show result ++ "***" ++ show result2
                print "******************************************* End of YY#$42"
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("YY#$42," `mappend` group `mappend` "," `mappend` sender `mappend` ","
                       `mappend` T.pack (show result) `mappend` "," `mappend` (T.pack (show result2))) subSt

    else if "AB#$42" `T.isPrefixOf` msg                             -- CHANGE A NAME, KEEPING THE SOCKET
        then
            do
                appendFile namesFile (T.unpack extra ++ "<&>")
                old <- atomically $ takeTMVar state
                let new = changeName sender extra extra2 old
                atomically $ putTMVar state new
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` extra `mappend` ","
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt

    else if "CA#$42" `T.isPrefixOf` msg
        then
            do
                old <- atomically $ takeTMVar state
                let sg = get2G mArr
                let new = chgScore sender (sg !! 0) (sg !! 1) old
                atomically $ putTMVar state new
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` ","
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt
                z <- rText $ get4 mArr
                let x = get2 mArr
                print $ show z
                print $ show x
                broadcast ("CA#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` z `mappend` "," `mappend` x ) subSt

    else if "DZ#$42" `T.isPrefixOf` msg
            then do
                y <- liftIO $ truck $ get5 mArr
                let yzz = T.pack y
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("DZ#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` yzz) subSt

    else if "CE#$42" `T.isPrefixOf` msg ||
        "CH#$42" `T.isPrefixOf` msg || "XY#$42" `T.isPrefixOf` msg ||
        "DE#$42" `T.isPrefixOf` msg || "EQ#$42" `T.isPrefixOf` msg ||
        "GQ#$42" `T.isPrefixOf` msg || "CF#$42" `T.isPrefixOf` msg ||
        "CY#$42" `T.isPrefixOf` msg || "CR#$42" `T.isPrefixOf` msg || "CD#$42" `T.isPrefixOf` msg ||
        "IA#$42" `T.isPrefixOf` msg || "DY#$42" `T.isPrefixOf` msg
        then
            do
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast msg subSt
                print $ mes `mappend` msg
                let names = [a | (a,_,_,_,_,_) <- st]
                print "Here are the names which are currently being served"
                mapM_ print names

    else if "CO#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                old <- atomically $ takeTMVar state
                let new = changeGroup sender extra old
                atomically $ putTMVar state new
                let subSt1 = subState sender extra new
                tasks <- liftIO $ read2 (mArr !! 3)
                print $ "The server is sending: " ++ T.unpack tasks
                st <- atomically $ readTMVar state
                let subSt2 = subState sender group st
                broadcast ("DD#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," `mappend` tasks) subSt1
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` (T.pack "Bozo") `mappend` ","
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt2))) subSt2

    else if "XX#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                s <- atomically $ takeTMVar state
                let new = filter (\(a,_,_,_,_,_) -> a == sender) s
                atomically $ putTMVar state new

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

    else if "TD#$42" `T.isPrefixOf` msg
        then
            do
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                let shorter = drop 3 mArr
                let tex = Prelude.map T.pack shorter
                let trunc = T.intercalate comma tex
                save (mArr !! 1) trunc
                print $ "The server is sending: " ++ T.unpack trunc
                broadcast ("DD#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` trunc) subSt


    else if "TX#$42" `T.isPrefixOf` msg
        then
            removeFile (mArr !! 1)

-- ****************************************************************************** START COMMENTS

     else if "GZ#$42" `T.isPrefixOf` msg                            -- SEND ALL COMMENTS
        then
            do
                com <- liftIO $ read2 xcomments
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("ZZ#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` com) subSt

    else if "GG#$42" `T.isPrefixOf` msg                              -- APPEND AND SEND
        then
            do
                TIO.appendFile xcomments extra
                com <- liftIO $ read2 xcomments
                st <- atomically $ readTMVar state
                let subSt = subState sender group st
                broadcast ("ZZ#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` com) subSt



    else do
        print "*********************************************************"
        print "Message fell through to the bottom in Main.hs"
        print msg
        print "*********************************************************"
