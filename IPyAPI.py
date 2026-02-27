from dataclasses import dataclass
from abc import ABC, abstractmethod
from typing import Dict, List, Any

@dataclass
class IModInfo:
    """模组信息"""
    pass

@dataclass
class IModUser:
    """已安装模组信息"""
    pass

@dataclass
class IProfile:
    """配置文件"""
    pass

@dataclass
class IDownloadTaskStatus:
    """下载任务状态"""
    pass

@dataclass
class IModSettingsInfo:
    """模组设置信息"""
    pass

@dataclass
class IUpdateDetails:
    """更新详情"""
    pass

class IPyAPI(ABC):
    """
    对应前端 IPyAPI 接口的 Python 抽象基类。
    所有 Promise<T> 在此处均为同步返回 T 类型。
    """

    @abstractmethod
    def close(self) -> None:
        """关闭窗口"""
        pass

    @abstractmethod
    def minimize(self) -> None:
        """最小化窗口"""
        pass

    @abstractmethod
    def startGame(self) -> None:
        """启动游戏"""
        pass

    @abstractmethod
    def startGameWithMod(self, profileName: str) -> None:
        """启动游戏并加载指定配置的模组"""
        pass

    @abstractmethod
    def getGameVersion(self) -> str:
        """获取游戏版本"""
        pass

    @abstractmethod
    def getFrameworkVersion(self) -> str:
        """获取模组加载器版本"""
        pass

    @abstractmethod
    def getLoaderVersion(self) -> str:
        """获取模组管理器版本"""
        pass

    @abstractmethod
    def checkUpdate(self) -> bool:
        """检查更新，返回是否有更新"""
        pass

    @abstractmethod
    def getUpdateDetails(self) -> IUpdateDetails:
        """获取更新详情"""
        pass

    @abstractmethod
    def getProfiles(self) -> List[IProfile]:
        """获取所有配置文件"""
        pass

    @abstractmethod
    def createProfile(self, profileOptions: IProfile) -> bool:
        """创建配置文件"""
        pass

    @abstractmethod
    def importProfile(self) -> bool:
        """导入配置文件"""
        pass

    @abstractmethod
    def deleteProfile(self, profileName: str) -> bool:
        """删除配置文件"""
        pass

    @abstractmethod
    def updateModSettingsForProfile(self, profileName: str, uuv4: str, settings: IModSettingsInfo) -> None:
        """更新配置文件中模组的设置"""
        pass

    @abstractmethod
    def loadStore(self) -> None:
        """加载商店数据文件"""
        pass

    @abstractmethod
    def getModInfo(self, uuv4: str) -> IModInfo:
        """获取模组信息"""
        pass

    @abstractmethod
    def createDownloadTask(self, url: str) -> str:
        """创建下载任务，返回任务id"""
        pass

    @abstractmethod
    def getDownloadTasksStatus(self) -> List[IDownloadTaskStatus]:
        """获取下载任务状态"""
        pass

    @abstractmethod
    def pauseDownloadTask(self, taskId: str) -> None:
        """暂停下载任务"""
        pass

    @abstractmethod
    def resumeDownloadTask(self, taskId: str) -> None:
        """恢复下载任务"""
        pass

    @abstractmethod
    def cancelDownloadTask(self, taskId: str) -> None:
        """取消下载任务"""
        pass

    @abstractmethod
    def getManagerSettings(self) -> Dict[str, Any]:
        """获取管理器设置"""
        pass

    @abstractmethod
    def updateManagerSettings(self, settings: Dict[str, Any]) -> None:
        """更新管理器设置"""
        pass

    @abstractmethod
    def getAllInstalledMods(self) -> List[IModUser]:
        """获取所有已安装的模组列表"""
        pass

    @abstractmethod
    def getSettingsOfMod(self, uuv4: str) -> IModSettingsInfo:
        """获取模组的设置"""
        pass

    @abstractmethod
    def updateSettingsOfMod(self, uuv4: str, settings: IModSettingsInfo) -> None:
        """更新模组的设置"""
        pass
