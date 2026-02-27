export {}

declare global {
    interface Window {
        pywebview: {
            api: {
                close(): Promise<void>;
                minimize(): Promise<void>;
            }
        }
    }
}