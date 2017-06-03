-- #!/usr/bin/env stack
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
import Control.Concurrent.MVar --(newMVar, newEmptyMVar, readMVar, swapMVar, putMVar, takeMVar, modifyMVar_)

extraStr = "ann<o>Keep good notes<@>" 
xcomments = "xcomments" :: FilePath
unify = filter (\v -> v /= '\n')
xcom = newMVar "fred<o>Prepare for the first task.<@>"

main :: IO ()
main = do
  x <- xcom
  str <- readMVar x
  c <- modifyMVar x (\v -> (return (v ++ extraStr, v ++ extraStr)))
  appendFile xcomments c
  d <- readFile xcomments
  print d






