<template>
    <div class="custom-alert-container">
        <TransitionGroup name="list" tag="div" class="alertContainer">
            <div class="alertBox" v-for="alert in showAlert" :key="alert.id" @mouseover="() => {
                // @ts-ignore
                pauseTimer(alert)
            }" @mouseleave="() => {
                // @ts-ignore
                resumeTimer(alert)
            }">
                <div class="alertContent">
                    <div class="icon" :class="[alert.type]">
                        <span class="iconfont">
                            <i :class="[`alert-${alert.type}`]"></i>
                        </span>
                    </div>
                    <div class="message">{{ alert.msg }}</div>
                </div>
                <div class="closeBtn" @click="closeAlert(alert.id)">
                    <span class="iconfont">
                        <i class="close"></i>
                    </span>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { getRamdomString, getTick } from '../../utils/common';

interface Alert extends AlertOptions {
    id: string;
    tick: TickController | null; // 有些提示不需要定时器
}

const defaultOptions: Required<AlertOptions> = {
    msg: '',
    type: 'info',
    duration: 3000,
    closeable: true,
    hoverPause: true,
    onClose: () => { }
}
const alerts = reactive<Alert[]>([])
const showAlert = computed(() => {
    // 返回alerts数组的反向
    return [...alerts].reverse()
})
const emit = defineEmits<{
    (e: 'alert:allClosed'): void;
}>()

const pauseTimer = (alert: Alert) => {
    if (alert.tick) {
        alert.tick.pause()
    }
}

const resumeTimer = (alert: Alert) => {
    if (alert.tick) {
        alert.tick.resume()
    }
}

const addAlert = (alertOptions: AlertOptions) => {
    // 生成配置
    const options: Required<AlertOptions> = { ...defaultOptions, ...alertOptions }
    const id = `alert-${getRamdomString(8)}`
    let alert: Alert = {
        id: id,
        tick: null,
        ...options
    }
    // 生成提示id
    alert.id = id
    // 创建计时器
    if (options.duration <= 0) {
        // 不需要定时器，要求手动关闭
        alert.closeable = true
    } else {
        const tick: TickController = getTick({
            duration: options.duration,
            autoStart: true,
            onTickEnd: () => {
                closeAlert(id)
            },
        })
        alert.tick = tick
    }
    // 添加提示
    // @ts-ignore
    alerts.push(alert)
    return id
}

const closeAlert = (id: string) => {
    const index = alerts.findIndex(alert => alert.id === id)
    if (index !== -1) {
        const alert = alerts[index]
        if (!alert) {
            return
        }
        // 先停止计时器
        if (alert.tick) {
            alert.tick.stop()
        }
        // 执行关闭回调
        alert.onClose && alert.onClose()
        // 移除提示
        alerts.splice(index, 1)
    }
}

const getAlertCount = () => {
    return alerts.length
}
watch(alerts, (newVal) => {
    if (newVal.length <= 0) {
        emit('alert:allClosed')
    }
})


defineExpose<AlertExposed>({
    addAlert,
    closeAlert,
    getAlertCount
})

</script>

<style lang="less" scoped>
@keyframes RightEnter {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}


.custom-alert-container {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    max-width: calc(15em + 50px);
    height: 100%;
    overflow: hidden;
    z-index: ~"calc(infinity * 1)";
    padding: 10px 7px 0 0;
    box-sizing: border-box;
    pointer-events: all;


    .alertContainer {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 7px;

        .alertBox {
            box-sizing: border-box;
            padding: 3px 5px;
            display: flex;
            align-items: center;

            background-color: #fff;
            border-radius: 3px;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
            animation: RightEnter 0.2s ease-out;

            .alertContent {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 7px;
                align-items: center;

                .icon {
                    font-size: 16px;
                    height: 20px;
                    aspect-ratio: 1 / 1;

                    &.success {
                        color: var(--successColor);
                    }

                    &.error {
                        color: var(--errorColor);
                    }

                    &.info {
                        color: var(--infoColor);
                    }

                }
            }

        }
    }
}

.list-enter-active,
.list-leave-active {
    transition: all 0.3s;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>