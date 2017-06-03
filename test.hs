
{-# LANGUAGE DataKinds         #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell   #-}
import           Data.Tuple.Select 
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
import qualified Network.Wai
import qualified Network.Wai.Application.Static as Static
import qualified Network.Wai.Handler.Warp       as Warp
import qualified Network.Wai.Handler.WebSockets as WaiWS
import           Network.WebSockets             (sendClose)
import qualified Network.WebSockets             as WS
import           System.Directory
import           Data.IORef
import           System.IO.Unsafe

type Counter = Int -> IO Int

makeCounter :: IO Counter
makeCounter = do
    r <- newIORef 0
    return (\i -> do modifyIORef r (+i) >> readIORef r)

barn = unsafePerformIO makeCounter    

a1 = unsafePerformIO $ barn 1
a2 = unsafePerformIO $ barn 1
a3 = unsafePerformIO $ barn 1
a4 = unsafePerformIO $ barn 1




state = [("one",1,2), ("two",3,4), ("three",5,6)] :: [(String,Integer,Integer)]
getName conn = sel1 $ head $ filter (\v -> sel3 v == conn ) state

main = do
  let a = getName 4
  print a
  print $ show [a1,a2,a3,a4] 
