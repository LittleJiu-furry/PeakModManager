
import IPyAPI from './pyapi.interface';

class _PyAPI implements IPyAPI {
    private static instance: _PyAPI;
    private isPyWebViewReady: boolean = false;
    private constructor() {}

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