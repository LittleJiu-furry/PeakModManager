from typing import Dict, List, Any, Union, Optional
import webview
from IPyAPI import IPyAPI
from IPyAPI import IDownloadTaskStatus, IModInfo, IModSettingsInfo, IModUser, IProfile, IUpdateDetails
import multiprocessing as mp
import os
import subprocess

def Path(*args: str):
    return os.path.abspath(os.path.join(*args))

class PyAPI(IPyAPI):
    _config: Dict[str, Any] = {}
    _window: Optional[webview.Window] = None

    def __init__(self):
        self._read_config()
        self._window = webview.create_window(
            title='Mod管理器',
            url='http://localhost:5173/',
            js_api=self,
            frameless=True,
            easy_drag=False,
            width=800,
            height=600,
            resizable=True,
        )

    def _read_config(self):
        ...

    def _start(self):
        webview.start(debug=True)

    def close(self):
        if (self._window is None): return
        self._window.destroy()

    def minimize(self):
        if (self._window is None): return
        self._window.minimize()

    def _startGame(self, enableMod: bool = False, path_for_profile: Optional[str] = None) -> None:
        env_copy = os.environ.copy()
        env_copy.update({
            "DOORSTOP_ENABLED": "TRUE" if enableMod else "FALSE",
            "DOORSTOP_CONFIG_PATH": path_for_profile if path_for_profile else "",
        })
        if env_copy.get("DOORSTOP_CONFIG_PATH", "") == "":
            env_copy.pop("DOORSTOP_CONFIG_PATH", None)
        game_path = self._config.get("gamePath", "")
        flags = (
            subprocess.DETACHED_PROCESS
            | subprocess.CREATE_NEW_PROCESS_GROUP
            | subprocess.CREATE_BREAKAWAY_FROM_JOB
        )
        try:
            subprocess.Popen(
                [game_path],
                env=env_copy,
                cwd=os.path.dirname(game_path),
                shell=False,
                close_fds=True,
                creationflags=flags,
            )
        except Exception as e:
            print(f"启动游戏失败: {e}")

    def startGame(self) -> None:
        mp.Process(target=self._startGame, args=(True, None)).start()

    def startGameWithMod(self, profileName: str) -> None:
        profile_path = self._config.get("profiles", {}).get(profileName, "").get("targetPath", "")
        mp.Process(target=self._startGame, args=(True, profile_path)).start()

    def getGameVersion(self) -> str:
        game_path = self._config.get("gamePath", "")
        version_file = Path(game_path, "..", "version.txt")
        if not os.path.exists(version_file):
            return "unknown"
        lines = []
        with open(version_file, "r") as f:
            lines = f.readlines()
        if not lines:
            return "unknown"
        return lines[0].strip()

    def getFrameworkVersion(self) -> str:
        raise NotImplementedError

    def getLoaderVersion(self) -> str:
        raise NotImplementedError

    def checkUpdate(self) -> bool:
        raise NotImplementedError

    def getUpdateDetails(self) -> IUpdateDetails:
        raise NotImplementedError

    def getProfiles(self) -> List[IProfile]:
        raise NotImplementedError

    def createProfile(self, profileOptions: IProfile) -> bool:
        raise NotImplementedError

    def importProfile(self) -> bool:
        raise NotImplementedError

    def deleteProfile(self, profileName: str) -> bool:
        raise NotImplementedError

    def updateModSettingsForProfile(self, profileName: str, uuv4: str, settings: IModSettingsInfo) -> None:
        raise NotImplementedError

    def loadStore(self) -> None:
        raise NotImplementedError

    def getModInfo(self, uuv4: str) -> IModInfo:
        raise NotImplementedError

    def createDownloadTask(self, url: str) -> str:
        raise NotImplementedError

    def getDownloadTasksStatus(self) -> List[IDownloadTaskStatus]:
        raise NotImplementedError

    def pauseDownloadTask(self, taskId: str) -> None:
        raise NotImplementedError

    def resumeDownloadTask(self, taskId: str) -> None:
        raise NotImplementedError

    def cancelDownloadTask(self, taskId: str) -> None:
        raise NotImplementedError

    def getManagerSettings(self) -> Dict[str, Any]:
        raise NotImplementedError

    def updateManagerSettings(self, settings: Dict[str, Any]) -> None:
        raise NotImplementedError

    def getAllInstalledMods(self) -> List[IModUser]:
        raise NotImplementedError

    def getSettingsOfMod(self, uuv4: str) -> IModSettingsInfo:
        raise NotImplementedError

    def updateSettingsOfMod(self, uuv4: str, settings: IModSettingsInfo) -> None:
        raise NotImplementedError



