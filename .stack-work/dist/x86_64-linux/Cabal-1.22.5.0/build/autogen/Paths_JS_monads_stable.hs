module Paths_JS_monads_stable (
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

bindir     = "/mnt/B/StackZone/JS-monads-stable/.stack-work/install/x86_64-linux/lts-5.14/7.10.3/bin"
libdir     = "/mnt/B/StackZone/JS-monads-stable/.stack-work/install/x86_64-linux/lts-5.14/7.10.3/lib/x86_64-linux-ghc-7.10.3/JS-monads-stable-0.7.0.0-BQ800DhakbCLtBFdLK5Ps7"
datadir    = "/mnt/B/StackZone/JS-monads-stable/.stack-work/install/x86_64-linux/lts-5.14/7.10.3/share/x86_64-linux-ghc-7.10.3/JS-monads-stable-0.7.0.0"
libexecdir = "/mnt/B/StackZone/JS-monads-stable/.stack-work/install/x86_64-linux/lts-5.14/7.10.3/libexec"
sysconfdir = "/mnt/B/StackZone/JS-monads-stable/.stack-work/install/x86_64-linux/lts-5.14/7.10.3/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "JS_monads_stable_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "JS_monads_stable_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "JS_monads_stable_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "JS_monads_stable_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "JS_monads_stable_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
