{-# LANGUAGE DataKinds, GeneralizedNewtypeDeriving, OverloadedStrings, TemplateHaskell #-}
import           System.IO
import           Data.Tuple.Select 
import           Control.Concurrent             (forkIO)
import           Control.Concurrent.STM
import           Control.Concurrent.MVar (newMVar, readMVar, takeMVar, putMVar)
import           Control.Exception              (finally)
import           Control.Exception.Base         (mask_)
import           Control.Monad                  (forM_, forever)
import           Control.Monad.IO.Class         (liftIO)
import           Data.FileEmbed                 (embedDir)
import           Data.List                      (intersperse, intercalate, delete, splitAt)
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
-- import System.Environment (getEnv)a
--
xcomments = "xcomments" :: FilePath
xnames = "xnames" :: FilePath
namesFile = "namesFile" :: FilePath

unify :: String -> String
unify = filter (\v -> v /= '\n')

solo :: Text
solo = "solo"

nobody :: Text
nobody = "nobody"

com = T.pack ","

oh :: Text
oh = "<o>"

at :: Text
at = "<@>"

dollar :: Text
dollar = "<$>"

empty :: Text
empty = ""

type Name = Text
type Score = Int
type Goal = Int
type Group = Text
type Password = Text
type ID = Int
type Comments = Text
type Client = (Name, Score, Goal, Group, WS.Connection, Password, ID, Comments)

type ServerState = [Client]

newServerState :: ServerState
newServerState = []

newId :: ID
newId = 0

counter = newTVar 0

remove :: Int -> Text -> IO Text
remove n a = do
  let b = T.splitOn at a
  let c = splitAt n b
  let d = mappend (fst c) (drop 1 (snd c))
  return $ T.pack $ intercalate "<@>" (map T.unpack d)

substitute :: Int -> Text -> Text -> IO Text
substitute n a comment = do
  let b = T.splitOn at a
  let c = splitAt n b
  let d = drop 1 (snd c)
  let e = (fst c) `mappend` [comment] `mappend` d
  return $ T.pack $ intercalate "<@>" (map T.unpack e)

mappend3 a b c = mappend a (mappend b c)
mappend4 a b c d = mappend a (mappend b (mappend c d))
mappend5 a b c d e = mappend a (mappend b (mappend c (mappend d e))) 
mappend6 :: Text -> Text -> Text -> Text -> Text -> Text -> Text
mappend6 a b c d e f = mappend a (mappend b (mappend c (mappend d (mappend e f)))) 
mappend7 :: Text -> Text -> Text -> Text -> Text -> Text -> Text -> Text
mappend7 a b c d e f g = mappend a (mappend b (mappend c (mappend d (mappend e (mappend f g))))) 

mappend8 :: Text -> Text -> Text -> Text -> Text -> Text -> Text -> Text -> Text
mappend8 a b c d e f g h = mappend a (mappend b (mappend c (mappend d (mappend e (mappend f (mappend g h)))))) 


head2 :: [Text] -> Text
head2 [a,b] = a
head2 _ = T.pack "Inappropriate head2 argument"

tail2 :: [Text] -> Text
tail2 [a,b] = b
tail2 _ = T.pack "Inappropriate tail2 argument"

head3 :: [String] -> String
head3 [a,b] = a
head3 _ = "Inappropriate head2 argument"

tail3 :: [String] -> String
tail3 [a,b] = b
tail3 _ = "Inappropriate tail2 argument"

head4 :: [Text] -> Text
head4 [] = empty
head4 xs = head xs

head5 [[(a,b,c,d,e,f,g,h)]] = [(a,b,c,d,e,f,g,h)]
head5 _ = [("a","b","c","d","e","f","g","h")]

safeTail [] = []
safeTail v  = tail v

getName = sel1

getConn = sel5

getNm id s = head [ sel1 cl | cl <- s, (sel7 cl) == id]

getN :: [Client] -> Text
getN [(a,_,_,_,_,_,_,_)] = a
getN [] = T.pack "Mr. Nobody"

getScore :: Client -> Score
getScore (_,b,_,_,_,_,_,_) = b

getGoal :: Client -> Goal
getGoal (_,_,c,_,_,_,_,_) = c

findGroup :: Client -> Group
findGroup (_,_,_,d,_,_,_,_) = d

-- getConn :: Client -> WS.Connection
-- getConn (_,_,_,_,e,_,_) = e

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

subState :: Text -> Text -> [(Text,Int,Int,Text,WS.Connection,Text,Int,Text)] -> [(Text,Int,Int,Text,WS.Connection,Text,Int,Text)]
subState name gr state  | gr /= solo  = [ (a,b,c,d,e,f,g,h) | (a,b,c,d,e,f,g,h) <- state, gr == d ]
                        | gr == solo = [ (a,b,c,d,e,f,g,h) | (a,b,c,d,e,f,g,h) <- state, name == a]

extract :: [Text] -> Text
extract [x] = x
extract _ = (T.pack "Message from extract: You seem to have provided a bad argument to getGroup. ")

getGroup name state = extract [ d | (a,_,_,d,_,_,_,_) <- state, name == a ]

content :: [String] -> String
content [] = "Empty List"
content [x] = x
content _ = "Major malfunction in the function named 'content'."

bcast :: Text -> ServerState -> IO ()
bcast message clients = do
    TIO.putStrLn message
    forM_ clients $ \(_ ,_, _, _, conn,_,_,_) -> WS.sendTextData conn message

textState s = [ a  `mappend` " | score: " `mappend` T.pack (show b) `mappend` " | goals: " `mappend` T.pack (show c) `mappend` " | " | (a,b,c,_,_,_,_,_) <- s]

extractName :: String -> IO Text
extractName combo = do
  let a = splitOn "<o>" combo
  let b = T.pack $ head a
  return b

extractHead :: [Text] -> Text
extractHead [a,b] = a
extractHead _ = T.pack "Error. ExtractHead is being applied to something other than a two item list of Text"

extractTail [a,b] = b
extractTail _ = T.pack "Error. ExtractTail is being applied to something other than a two item list of Text"

newName :: Text -> Text -> Text -> Client -> Client
newName name1 name2 name3 (a, b, c, d, e, f, g, h) | name1 == a  = (name2, b, c, d, e, name3,g, h)
                                    | otherwise = (a, b, c, d, e, f, g, h)

changeName :: Text -> Text -> Text -> ServerState -> ServerState
changeName name1 name2 name3 = map (newName name1 name2 name3)

newGroupKeepScore :: Text -> Text -> Client -> Client
newGroupKeepScore name group (a, b, c, d, e, f, g, h)  | name == a  = (a, b, c, group, e, f, g, h)
                                   | otherwise = (a, b, c, d, e, f, g, h)
changeGroupKeepScore :: Text -> Text -> ServerState -> ServerState
changeGroupKeepScore name group = map (newGroupKeepScore name group)

newGroup :: Text -> Text -> Client -> Client
newGroup name group (a, b, c, d, e, f, g, h) | name == a  = (a, 0, 0, group, e, f, g, h)
                                       | otherwise = (a, b, c, d, e, f, g, h)

changeGroup :: Text -> Text -> ServerState -> ServerState
changeGroup name group = map (newGroup name group)

changeS :: Text -> Int -> Int -> Client -> Client
changeS x y z (a, b, c, d, e, f, g, h) | x == a    = (a, y, z, d, e, f, g, h)
                         | otherwise = (a, b, c, d, e, f, g, h)

chg6 :: Text -> Int -> Int -> Client -> Client
chg6 x y z (a, b, c, d, e, f, g, h) | x == a    = (a, y, z, d, e, f, g, h)
                         | otherwise = (a, b, c, d, e, f, g, h)

changeScore :: Text -> Int -> Int -> ServerState -> ServerState
changeScore name k q = map (changeS name k q)

chgScore :: Text -> Int -> Int -> ServerState -> ServerState
chgScore name k q = map (chg6 name k q)

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
removeClient name = filter ((/= getName name) . getName)

clientEq (a',b',c',d',e',f',g') a | a == a' = True
                                  | otherwise = False

getClient name state = filter (\v -> sel1 v == name ) state

rmClient :: Name -> ServerState -> ServerState
rmClient name state = do
  newState <- [ c | c <- state, (getName c) /= name]
  return newState

closeClientConn :: WS.WebSocketsData a => Client -> ServerState -> a -> ServerState
closeClientConn client s = do
    let s' = removeClient client s
    _ <- sendClose (getConn client)
    return s'

broadcast :: Text -> ServerState -> IO ()
broadcast message clients = do
    print $ "Message being broadcast: " ++ (T.unpack message)
    TIO.putStrLn message
    forM_ clients $ \(_ , _, _, _, conn,_,_,_) -> WS.sendTextData conn message

player = newTVar nobody

rain = do
    -- por <- getEnv "PORT"
    -- let port = read por
    state <- atomically $ newTVar newServerState
    Warp.runSettings
     (Warp.setPort 3055 $
       Warp.setTimeout 36000
         Warp.defaultSettings) $
           WaiWS.websocketsOr WS.defaultConnectionOptions (application state) staticApp
taticApp :: Network.Wai.Application
taticApp = Static.staticApp $ Static.embeddedSettings $(embedDir "./src/dist")
plication :: TVar ServerState -> WS.ServerApp
plication state pending = do
    print "App is fired up"
    conn <- WS.acceptRequest pending
    msg <- WS.receiveData conn
    print $ "Message arring at the server: " ++ T.unpack msg

main :: IO ()
main = do
    -- por <- getEnv "PORT"
    -- let port = read por
    state <- atomically $ newTVar newServerState
    Warp.runSettings
     (Warp.setPort 3055 $
       Warp.setTimeout 36000
         Warp.defaultSettings) $
           WaiWS.websocketsOr WS.defaultConnectionOptions (application state) staticApp
staticApp :: Network.Wai.Application
staticApp = Static.staticApp $ Static.embeddedSettings $(embedDir "./src/dist")
application :: TVar ServerState -> WS.ServerApp
application state pending = do
    print "App is fired up"
    conn <- WS.acceptRequest pending
    msg <- WS.receiveData conn
    print $ T.unpack msg
    count <- atomically counter
    id0 <- atomically $ readTVar count
    let id = id0 + 1
    atomically $ writeTVar count id
    clients <- atomically $ readTVar state
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
                    st <- atomically $ readTVar state
                    let st2 = addClient client st
                    atomically $ writeTVar state st2
                    WS.sendTextData conn ("CC#$42,solo," `mappend` name `mappend` " ,joined" :: Text)
                    talk conn state client
         where
                prefix = "CC#$42"
                namePword = T.splitOn oh $ T.drop (T.length prefix) msg
                client = (head namePword, 0, 0, solo, conn, last namePword, id, (T.pack "david<o>Still testing"))
                disconnect = do
                    st <- atomically $ readTVar state
                    let name = getNm id st
                    print $ T.unpack name ++ " is leaving"
                    sta <- atomically $ readTVar state
                    atomically $ writeTVar state $ filter (\v -> ((sel7 v) /= id)) sta
                    sta' <- atomically $ readTVar state  
                    let grp = getGroup name sta'
                    let subSt = subState name grp sta'
                    print "Hello Nurse"
                    -- broadcast ("NN#$42,"  br T.concat (intersperse "<br>" (textState subSt))) subSt   

talk :: WS.Connection -> TVar ServerState -> Client -> IO ()
talk conn state client = forever $ do
  msg <- WS.receiveData conn
  let msg2 = T.unpack msg
  print $ "In talk. The incoming message is " ++ msg2
  let mArr = splitOn "," msg2
  let msgArray = T.splitOn "," msg
  let group = msgArray !! 1
  let sender = msgArray !! 2
  let extra = msgArray !! 3
  let extraStr = mArr !! 3
  let extra2 = msgArray !! 4
  let extraNum = read (mArr !! 3) :: Int
  let extraNum2 = read (mArr !! 4) :: Int
  let mes = "<><><><><> Outgoing message from Main.hs " :: Text
  let at = T.pack "<@>"
  let oh = T.pack "<o>"
  let br = T.pack "br"
  let false = T.pack "false"
  let true = T.pack "true"
  let comma = T.pack ", "
  let comma2 = T.pack ","
  comz <- TIO.readFile xcomments
  comms <- atomically $ newTVar comz
  ns <- TIO.readFile namesFile
  names <- atomically $ newTVar ns
  print at
  print at
  
  if "RR#$42" `T.isPrefixOf` msg
    then
      do                                               -- Is the name/password registered
        coms1 <- TIO.readFile xcomments
        let name_pw = T.splitOn (T.pack "<o>") extra
        let nm = head2 name_pw
        nams <- read2 namesFile
        let namses = T.splitOn (T.pack "<&>") nams
        let nmAr = map (T.splitOn (T.pack "<o>")) namses
        -- let nm = extractHead name_pw
        let pw = extractTail name_pw
        print "nm and pw"
        print nm
        print pw
        nams <- read2 namesFile
        let namses = T.splitOn (T.pack "<&>") nams
        let res_1 = show (extra `elem` namses)
        let nmAr = map (T.splitOn (T.pack "<o>")) namses
        let namesAr = map head2 nmAr
        -- let namAr = filter (/= (T.pack "\n")) namesAr 
        let namAr = filter (/= (T.pack "\n")) (concat nmAr) 
        let res_2 = show (nm `elem` namesAr)
        print "res_1  res_2" 
        print res_1
        print res_2 
        st <- atomically $ readTVar state
        let names = [a | (a,_,_,_,_,_,_,_) <- st]
        print "In RR before the if blocks --- names are"
        print names
        if res_1 == "True" && res_2 == "True"
          then
            do
              print "True True in RR#$42. A recognized name/password combination was entered"
              st <- atomically $ readTVar state
              let names = [a | (a,_,_,_,_,_,_,_) <- st]
              print "In RR again. In the res_1 == True block --- names are"
              print names

              s <- atomically $ readTVar state
              let (a,b,c,d,e,f,g,h) = head (getClient sender s)
              let new = (nm,b,c,d,e,pw,g,h):s 
              st <- atomically $ readTVar state
              atomically $ writeTVar state new

              st' <- atomically $ readTVar state
              atomically $ writeTVar state $ filter (\v -> not ((sel1 v) == sender)) st'

              let names = [a | (a,_,_,_,_,_,_,_) <- new]
              print "In RR --- names are"
              print names

              let subSt = subState sender group new
              broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` nm `mappend` ","
                  `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt

              broadcast ("RR#$42," `mappend` group `mappend` "," `mappend` sender
                `mappend` "," `mappend` nm `mappend` "," `mappend` (T.pack "code1")) subSt
          else
            print "Not previously registered"
        if (res_1 == "False" && res_2 == "False")                 -- A new name will be registered
          then
            do
              st <- atomically $ readTVar state
              print "length five times"
              print $ length st
              let names = [a | (a,_,_,_,_,_,_,_) <- st]
              print "In RR again. In False, False --- names are"
              print names
              print $ length st
      
              Tasks.append namesFile (extra `mappend` (T.pack "<&>"))
              
              s <- atomically $ readTVar state
              let (a,b,c,d,e,f,g,h) = head (getClient sender s)
              let new = (nm,b,c,d,e,pw,g,h):s 
              st <- atomically $ readTVar state
              atomically $ writeTVar state new

              print $ length st
              st' <- atomically $ readTVar state
              atomically $ writeTVar state $ filter (\v -> not ((sel1 v) == sender)) st'

              print $ length st
             {- old <- atomically $ readTVar stater
              let new = changeName sender nm pw old
              atomically $ writeTVar state new 

              let subSt = subState nm group new
              broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," `mappend` 
               (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt
              print "False False in RR#$42. New username:"
              print nm   -}
              
              st <- atomically $ readTVar state
              let names = [a | (a,_,_,_,_,_,_,_) <- st]
              print "In RR --- names are"
              print names

              print $ length st

              let subSt = subState sender group new
              broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` nm `mappend` ","
                  `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt

              let names = [a | (a,_,_,_,_,_,_,_) <- st]
              broadcast ("RR#$42," `mappend` group `mappend` "," `mappend` nm
               `mappend` "," `mappend` nm `mappend` "," `mappend` (T.pack "code2")) subSt
          else print "The name is already taken"      
        if (res_1 == "False" && res_2 == "True")                 -- A new name will be registered
          then
             do
               print "False True. The password does not match the registered password"
               print "In RR#$42, third if block."
               st <- atomically $ readTVar state
               let sb = subState sender group st
               let subSt = subState sender group st
               broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` ","
                `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt
               broadcast ("RR#$42," `mappend` group `mappend` "," `mappend` sender
                `mappend` "," `mappend` sender `mappend` "," `mappend` (T.pack "code3")) subSt
          else print "Confirming False False"

     else if "CA#$42" `T.isPrefixOf` msg
        then
            do
                old <- atomically $ readTVar state
                let sg = get2G mArr
                let new = chgScore sender (sg !! 0) (sg !! 1) old
                atomically $ writeTVar state new
                st <- atomically $ readTVar state
                let subSt = subState sender group st
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` ","
                  `mappend` (T.pack "<br>") `mappend` 
                    T.concat (intersperse "<br>" (textState subSt))) subSt
                z <- rText $ get4 mArr
                let x = get2 mArr
                print $ show z
                print $ show x
                broadcast ("CA#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," `mappend` z `mappend` "," `mappend` x ) subSt

-- ******************************** Comments are maintained in a file and in a TVar ****** START

     else if "GZ#$42" `T.isPrefixOf` msg               -- FETCH AND BROADCAST ALL COMMENTS
        then                                           -- PERFORM ON LOAD
            do
                comments <- atomically $ readTVar comms
                st <- atomically $ readTVar state
                broadcast (mappend6 (T.pack "ZZ#$42,") group com sender com comments) st

     else if "GN#$42" `T.isPrefixOf` msg -- RECEIVE A NEW COMMENT, UPDATE THE FILE AND THE TVAR,
                                         --  AND BROADCAST THE NEW COMMENTCOMMENT 
        then
            do
                old <- atomically $ readTVar comms
                let updat = old `mappend` extra
                let updated = T.replace (T.pack "<@><@>") (T.pack "<@>") updat
                TIO.writeFile xcomments updated
                atomically $ writeTVar comms updated
                st <- atomically $ readTVar state
                broadcast ("ZN#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` extra) st

     else if T.isPrefixOf (T.pack "GD#$42") msg              -- DELETE A COMMENT
        then
            do
                old <- atomically $ readTVar comms
                a <- TIO.readFile xcomments
                b <- remove extraNum a
                TIO.writeFile xcomments b
                st <- atomically $ readTVar state
                broadcast (mappend6 (T.pack "ZD#$42,") group com sender com extra) st 
                    
     else if "GE#$42" `T.isPrefixOf` msg 
        then
            do
                a <- atomically $ readTVar comms
                b <- substitute extraNum a extra2
                TIO.writeFile xcomments b
                atomically $ writeTVar comms b
                st <- atomically $ readTVar state
                broadcast (mappend8 "ZE#$42," group com sender com extra com extra2) st





-- ******************************** Comments are maintained in a file and in a TVar ****** START
 
     else if "DZ#$42" `T.isPrefixOf` msg
            then do
                y <- liftIO $ truck $ get5 mArr
                let yzz = T.pack y
                st <- atomically $ readTVar state
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
                st <- atomically $ readTVar state
                let subSt = subState sender group st
                broadcast msg subSt
                print $ mes `mappend` msg
                let names = [a | (a,_,_,_,_,_,_,_) <- st]
                print "Here are the names which are currently being served"
                mapM_ print names

     else if "CO#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                old <- atomically $ readTVar state
                let new = changeGroup sender extra old
                atomically $ writeTVar state new
                let subSt1 = subState sender extra new
                tasks <- liftIO $ read2 (mArr !! 3)
                print $ "The server is sending: " ++ T.unpack tasks
                st <- atomically $ readTVar state
                let subSt2 = subState sender group st
                broadcast ("DD#$42," `mappend` group `mappend` "," `mappend` sender `mappend` "," `mappend` tasks) subSt1
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` (T.pack "Bozo") `mappend` ","
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt2))) subSt2

     else if "XX#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                s <- atomically $ readTVar state
                let new = filter (\(a,_,_,_,_,_,_,_) -> a == sender) s
                atomically $ writeTVar state new

     else if "CG#$42" `T.isPrefixOf` msg
        then
            mask_ $ do
                old <- atomically $ readTVar state
                let new = changeScore sender extraNum extraNum2 old
                atomically $ writeTVar state new
                st <- atomically $ readTVar state
                let subSt = subState sender group st
                broadcast ("NN#$42," `mappend` group `mappend` "," `mappend` sender `mappend` ","
                    `mappend` (T.pack "<br>") `mappend` T.concat (intersperse "<br>" (textState subSt))) subSt

     else if "TD#$42" `T.isPrefixOf` msg     -- Delete tasks
        then
            do
                st <- atomically $ readTVar state
                let subSt = subState sender group st
                let shorter = drop 3 mArr
                let tex = Prelude.map T.pack shorter
                let trunc = T.intercalate comma tex
                save (mArr !! 1) trunc
                print $ "The server is sending: " ++ T.unpack trunc
                broadcast ("DD#$42," `mappend` group `mappend` ","
                    `mappend` sender `mappend` "," `mappend` trunc) subSt


     else if "TX#$42" `T.isPrefixOf` msg    -- Delete when only one task remains.
        then
            removeFile (mArr !! 1)

{-- ****************************************************************************** START COMMENTS

--}
-- ****************************************************************************** END COMMENTS


    else do
        print "*********************************************************"
        print "Message fell through to the bottom in Main.hs"
        print msg
        st <- atomically $ readTVar state
        print "length of ServerState: "
        print (length st);
        let names = [a | (a,_,_,_,_,_,_,_) <- st]
        print "Here are the names which are currently being served"
        mapM_ print names
        print "<@><#><$><#><@>"
        old <- atomically $ readTVar state
        let new = old
        atomically $ writeTVar state new
        print "*********************************************************"


