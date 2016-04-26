module Tasks where
import Data.Text
import Data.Text.IO
import Control.Exception
import Prelude hiding (catch, readFile, writeFile, appendFile)

save :: FilePath -> Text -> IO ()
save fh f = writeFile fh f

append :: FilePath -> Text -> IO()
append fh f = appendFile fh f

read2 :: FilePath -> IO Text
read2 f = do
    t <- catch (readFile f)
        (\e -> do 
            let err = show (e :: IOException)
            print ("Warning: Couldn't open " ++ f ++ ": " ++ err)
            return $ pack "no file")
    return t

main = do
    save "./yes.js" $ pack "Oh yes."
    read2 "./yes.js"

