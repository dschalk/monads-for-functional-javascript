import qualified Data.Text as T
import Data.List
import Data.Text.IO
import Control.Monad.IO.Class (liftIO)
import Control.Exception
import Prelude hiding (catch, readFile, writeFile, appendFile)

save :: FilePath -> T.Text -> IO ()
save fh f = writeFile fh f

append :: FilePath -> T.Text -> IO()
append fh f = appendFile fh f

read2 :: FilePath -> IO T.Text
read2 f = do
    t <- catch (readFile f)
        (\e -> do
            let err = show (e :: IOException)
            print ("Warning: Couldn't open " ++ f ++ ": " ++ err)
            return $ T.pack "no file")
    return t

a = T.pack "a<o>b\n"

b = T.filter (/= '\n') $ T.intercalate (T.pack "<o>") $
  T.splitOn (T.pack ",") a

file = "file" :: FilePath

c = T.filter (/= '\n') b

cleanFile fh = do
  x <- liftIO $ read2 fh
  let c = T.filter (/= '\n') x
  return c

main = do
  x <- cleanFile file
  print x
