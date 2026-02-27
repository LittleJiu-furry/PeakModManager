
export interface IModInfo { }

export interface IModUser { }

export interface IProfile { }

export interface IDownloadTaskStatus { }

export interface IModSettingsInfo { }

export interface IUpdateDetails { }

export default interface IPyAPI {
    close(): Promise<void>; // 关闭窗口
    minimize(): Promise<void>; // 最小化窗口

    startGame(): Promise<void>; // 启动游戏
    startGameWithMod(profileName: string): Promise<void>; // 启动游戏并加载指定配置的模组

    getGameVersion(): Promise<string>; // 获取游戏版本
    getFrameworkVersion(): Promise<string>; // 获取模组加载器版本
    getLoaderVersion(): Promise<string>; // 获取模组管理器版本
    checkUpdate(): Promise<boolean>; // 检查更新，返回是否有更新
    getUpdateDetails(): Promise<IUpdateDetails>; // 获取更新详情

    getProfiles(): Promise<IProfile[]>; // 获取所有配置文件
    createProfile(profileOptions: IProfile): Promise<boolean>; // 创建配置文件
    importProfile(): Promise<boolean>; // 导入配置文件
    deleteProfile(profileName: string): Promise<boolean>; // 删除配置文件
    updateModSettingsForProfile(profileName: string, uuv4: string, settings: IModSettingsInfo): Promise<void>; // 更新配置文件中模组的设置

    loadStore(): Promise<void>; // 加载商店数据文件

    getModInfo(uuv4: string): Promise<IModInfo>; // 获取模组信息

    createDownloadTask(url: string): Promise<string>; // 创建下载任务，返回任务id
    getDownloadTasksStatus(): Promise<IDownloadTaskStatus[]>; // 获取下载任务状态
    pauseDownloadTask(taskId: string): Promise<void>; // 暂停下载任务
    resumeDownloadTask(taskId: string): Promise<void>; // 恢复下载任务
    cancelDownloadTask(taskId: string): Promise<void>; // 取消下载任务

    getManagerSettings(): Promise<Record<string, any>>; // 获取管理器设置
    updateManagerSettings(settings: Record<string, any>): Promise<void>; // 更新管理器设置
    getAllInstalledMods(): Promise<IModUser[]>; // 获取所有已安装的模组列表
    getSettingsOfMod(uuv4: string): Promise<IModSettingsInfo>; // 获取模组的设置
    updateSettingsOfMod(uuv4: string, settings: IModSettingsInfo): Promise<void>; // 更新模组的设置
}