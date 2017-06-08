{-# LANGUAGE DataKinds, GeneralizedNewtypeDeriving, OverloadedStrings, TemplateHaskell #-}
import           Data.IORef
import           System.IO.Unsafe
import           Data.Tuple.Select 
import           Control.Concurrent             (forkIO)
import           Control.Concurrent.STM
import           Control.Concurrent.MVar (newEmptyMVar, readMVar, modifyMVar)
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
import           Fm                            (rText, truck)
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

empty :: Text
empty = ""

extra :: Text
extra = "<@>betty<o>Do as you like"

main = do
    let name_pw = T.splitOn (T.pack "<o>") extra
    let nm = head2 name_pw
    nams <- read2 namesFile
    let namses = T.splitOn (T.pack "<&>") nams
    let nmAr = map (T.splitOn (T.pack "<o>")) namses
    let name_pw = T.splitOn (T.pack "<o>") extra
    let nm = extractHead name_pw
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
    st <- atomically $ readTMVar state
    let names = [a | (a,_,_,_,_,_,_) <- st]
    print "In RR before the if blocks --- names are"
    print names




