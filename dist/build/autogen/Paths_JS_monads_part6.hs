module Paths_JS_monads_part6 (
    version,
    getBinDir, getLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
catchIO = Exception.catch

version :: Version
version = Version [0,7,0,0] []
bindir, libdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/home/d/.cabal/bin"
libdir     = "/home/d/.cabal/lib/x86_64-linux-ghc-7.8.4/JS-monads-part6-0.7.0.0"
datadir    = "/home/d/.cabal/share/x86_64-linux-ghc-7.8.4/JS-monads-part6-0.7.0.0"
libexecdir = "/home/d/.cabal/libexec"
sysconfdir = "/home/d/.cabal/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "JS_monads_part6_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "JS_monads_part6_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "JS_monads_part6_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "JS_monads_part6_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "JS_monads_part6_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
