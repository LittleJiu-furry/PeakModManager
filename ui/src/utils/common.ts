
export const getRamdomString = (length: number) => {
    const ramdomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * ramdomChars.length);
        result += ramdomChars[randomIndex];
    }
    return result;
}

class sharedTime {
    private static instance: sharedTime;
    public time = shallowRef(performance.now())

    private constructor() {
        this.updateTime()
    }

    private updateTime() {
        this.time.value = performance.now()
        requestAnimationFrame(() => this.updateTime())
    }

    public static getInstance(): sharedTime {
        if (!sharedTime.instance) {
            sharedTime.instance = new sharedTime();
        }
        return sharedTime.instance;
    }

    public getReadonlyTime() {
        return readonly(this.time)
    }

}

export const useTime = () => {
    return sharedTime.getInstance().getReadonlyTime()
}

export const getPutcontainer = () => {
    return document.querySelector('#custom-container') as HTMLDivElement;
}

interface ITickOptions {
    duration: number; // 定时器的持续时间，单位为毫秒
    autoStart?: boolean; // 是否自动开始计时，默认为true
    onTickEnd: () => void; // 定时器结束时的回调函数
    onStoped?: () => void; // 定时器被停止时的回调函数（可选）
}

interface ITick extends ITickOptions {
    id: string; // 定时器的唯一标识符
    startAt: number; // 定时器开始的时间戳
    remainingTime: Ref<number>; // 定时器剩余的时间，单位为毫秒
    isStarted: boolean; // 定时器是否已经开始, 允许手动开启
    isPaused: boolean; // 定时器是否暂停
    isEnded: boolean; // 定时器是否结束
}

class TickManager {
    private static instance: TickManager | null = null;
    private ticks: Map<string, ITick> = new Map();

    private constructor() {
        // 执行更新逻辑
        this.updateTicks();
    }
    public static getInstance(): TickManager {
        if (!TickManager.instance) {
            TickManager.instance = new TickManager();
        }
        return TickManager.instance;
    }

    public getTick(timerID: string) {
        return this.ticks.get(timerID) as ITick;
    }

    public createTick(options: ITickOptions) {
        const id = getRamdomString(16);
        const tick: ITick = {
            id,
            ...options,
            startAt: performance.now(),
            remainingTime: ref(options.duration),
            isPaused: false,
            isEnded: false,
            isStarted: options.autoStart ? true : false
        }
        this.ticks.set(id, tick);
        return id;
    }

    public startTick(timerID: string) {
        const tick = this.ticks.get(timerID);
        if (!tick) {
            return;
        }
        if (tick.isStarted) {
            return;
        }
        tick.startAt = performance.now();
        tick.isStarted = true;
    }

    public pauseTick(timerID: string) {
        const tick = this.ticks.get(timerID);
        if (!tick) {
            return;
        }
        if(!tick.isStarted) {
            return;
        }
        tick.isPaused = true;
    }

    public resumeTick(timerID: string) {
        const tick = this.ticks.get(timerID);
        if (!tick) {
            return;
        }
        if(!tick.isStarted) {
            return;
        }
        if(!tick.isPaused) {
            return;
        }
        // 调整这个tick的参数，使得它继续计时
        const now = performance.now();
        tick.startAt = now;
        tick.duration = tick.remainingTime.value;
        tick.isPaused = false; // 恢复计时
    }

    public stopTick(timerID: string) {
        const tick = this.ticks.get(timerID);
        if (!tick) {
            return;
        }
        tick.onStoped?.();
        this.ticks.delete(timerID);
    }

    private updateTicks() {
        const now = performance.now();
        const canUpdateTick = Array.from(this.ticks.values()).filter(tick => {
            return tick.isStarted && !tick.isPaused && !tick.isEnded;
        });
        canUpdateTick.forEach((tick) => {
            // 用当前时间计算剩余时间
            const elapsed = now - tick.startAt;
            const remaining = Math.max(0, tick.duration - elapsed);
            tick.remainingTime.value = remaining;
            if (remaining <= 0) {
                tick.onTickEnd();
                tick.isEnded = true; // 遍历时最好不要删除元素，这里先标记
            }
        })
        // 删除结束的定时器
        this.ticks.forEach((tick, id) => {
            if (tick.isEnded) {
                this.ticks.delete(id);
            }
        })
        requestAnimationFrame(() => this.updateTicks());
    }
}

export const getTick = (option: ITickOptions): TickController => {
    const tickManager = TickManager.getInstance();
    const timerID = tickManager.createTick({
        autoStart: true,
        ...option
    });
    const tick = tickManager.getTick(timerID);
    const start = () => {
        tickManager.startTick(timerID);
    }
    const pause = () => {
        tickManager.pauseTick(timerID);
    }
    const resume = () => {
        tickManager.resumeTick(timerID);
    }
    const stop = () => {
        tickManager.stopTick(timerID);
    }
    
    return {
        pause,
        resume,
        stop,
        start,
        remaining: tick.remainingTime
    }
}