declare interface AlertOptions {
    msg: string;
    type?: 'success' | 'error' | 'info';
    duration?: number; // 持续时间，单位为毫秒，默认为3000ms, 设置为0表示不自动关闭，此时closeable强制为true
    closeable?: boolean; // 是否显示关闭按钮，默认为true
    hoverPause?: boolean; // 鼠标悬停时是否暂停自动关闭，默认为true
    onClose?: () => void; // 关闭时的回调函数
}

declare class AlertExposed {
    addAlert: (options: AlertOptions) => string; // 返回alert的id
    closeAlert: (id: string) => void;
    getAlertCount: () => number;
}