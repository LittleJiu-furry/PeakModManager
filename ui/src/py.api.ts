// @ts-nocheck
import IPyAPI, { IDownloadTaskStatus, IModInfo, IModSettingsInfo, IModUser, IProfile, IUpdateDetails } from './pyapi.interface';

class _PyAPI implements IPyAPI {
    private static instance: _PyAPI;
    private isPyWebViewReady: boolean = false;
    private constructor() {}
    startGame(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    startGameWithMod(profileName: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getGameVersion(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    getFrameworkVersion(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    getLoaderVersion(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    checkUpdate(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getUpdateDetails(): Promise<IUpdateDetails> {
        throw new Error('Method not implemented.');
    }
    getProfiles(): Promise<IProfile[]> {
        throw new Error('Method not implemented.');
    }
    createProfile(profileOptions: IProfile): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    importProfile(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    deleteProfile(profileName: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    updateModSettingsForProfile(profileName: string, uuv4: string, settings: IModSettingsInfo): Promise<void> {
        throw new Error('Method not implemented.');
    }
    loadStore(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getModInfo(uuv4: string): Promise<IModInfo> {
        throw new Error('Method not implemented.');
    }
    createDownloadTask(url: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
    getDownloadTasksStatus(): Promise<IDownloadTaskStatus[]> {
        throw new Error('Method not implemented.');
    }
    pauseDownloadTask(taskId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    resumeDownloadTask(taskId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    cancelDownloadTask(taskId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getManagerSettings(): Promise<Record<string, any>> {
        throw new Error('Method not implemented.');
    }
    updateManagerSettings(settings: Record<string, any>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getAllInstalledMods(): Promise<IModUser[]> {
        throw new Error('Method not implemented.');
    }
    getSettingsOfMod(uuv4: string): Promise<IModSettingsInfo> {
        throw new Error('Method not implemented.');
    }
    updateSettingsOfMod(uuv4: string, settings: IModSettingsInfo): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async waitForPyWebViewReady(): Promise<void> {
        if (this.isPyWebViewReady) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            window.addEventListener('pywebviewready', () => {
                if (window.pywebview) {
                    this.isPyWebViewReady = true;
                    resolve();
                } else {
                    reject(new Error('pywebview is not available after pywebviewready event'));
                }
            })
        })
    }

    public static getInstance(): _PyAPI {
        if (!_PyAPI.instance) {
            _PyAPI.instance = new _PyAPI();
        }
        return _PyAPI.instance;
    }

    public async close(): Promise<void> {
        await this.waitForPyWebViewReady();
        await window.pywebview?.api.close();
    }

    public async minimize(): Promise<void> {
        await this.waitForPyWebViewReady();
        await window.pywebview?.api.minimize();
    }
    


}

const PyAPI = _PyAPI.getInstance();

export default PyAPI;