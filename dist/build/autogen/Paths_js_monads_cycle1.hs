module Paths_js_monads_cycle1 (
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
version = Version [0,1,0,0] []
bindir, libdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/home/d/.cabal/bin"
libdir     = "/home/d/.cabal/lib/x86_64-linux-ghc-7.8.4/js-monads-cycle1-0.1.0.0"
datadir    = "/home/d/.cabal/share/x86_64-linux-ghc-7.8.4/js-monads-cycle1-0.1.0.0"
libexecdir = "/home/d/.cabal/libexec"
sysconfdir = "/home/d/.cabal/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "js_monads_cycle1_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "js_monads_cycle1_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "js_monads_cycle1_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "js_monads_cycle1_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "js_monads_cycle1_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
