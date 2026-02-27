import Alert from './alert.vue';
import { createVNode, render } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import { getPutcontainer, getRamdomString } from '../../utils/common';

class AlertManager {
    private static instance: AlertManager | null = null;
    private selfComponent: ComponentInternalInstance | null = null;
    private container: HTMLDivElement | null = null;
    private constructor() {
        // 将组件挂载
        this.container = document.createElement('div');
        this.container.classList.add('custom-ui');
        this.container.classList.add(getRamdomString(10));
        getPutcontainer().appendChild(this.container);
        const vnode = createVNode(Alert, {
            'onAlert:allClosed': this.destroy.bind(this)
        });
        render(vnode, this.container);
        this.selfComponent = vnode.component;
    }

    private destroy() {
        if (!this.selfComponent) return;
        const exposed = this.selfComponent.exposed as AlertExposed;
        if (!exposed) {
            // console.error('Alert component instance has no exposed methods');
            // 不该发生的情况，理论上不应该发生，但如果发生了，就直接销毁组件，不再调用暴露的方法了
            this.selfComponent = null;
            if (this.container) {
                render(null, this.container);
                this.container.remove();
                this.container = null;
            }
            AlertManager.instance = null; // 移除自身实例的引用，以用来允许重新创建
            return;
        }
        setTimeout(() => {
            if (exposed.getAlertCount() <= 0) {
                // 销毁组件
                this.selfComponent = null;
                if (this.container) {
                    render(null, this.container);
                    this.container.remove();
                    this.container = null;
                }
                AlertManager.instance = null; // 移除自身实例的引用，以用来允许重新创建
            }
        }, 1000);

    }

    public static getInstance(): AlertManager {
        if (!AlertManager.instance) {
            AlertManager.instance = new AlertManager();
        }
        return AlertManager.instance;
    }

    public addAlert(options: AlertOptions) {
        if (this.selfComponent) {
            return this.selfComponent.exposed?.addAlert(options);
        }
        return null;
    }

    public closeAlert(id: string) {
        if (this.selfComponent) {
            this.selfComponent.exposed?.closeAlert(id);
        }
    }
}

const CustomAlertFn = (options: AlertOptions) => {
    const manager = AlertManager.getInstance(); 
    const id = manager.addAlert(options);
    const close = () => {
        if (id) {
            manager.closeAlert(id);
        }
    }

    onScopeDispose(() => {
        close();
    })

    onDeactivated(() => {
        close();
    })

    return {
        close: close
    }
}

const CustomAlertHelpers = {
    success: (options: Omit<AlertOptions, 'type'>) => {
        return CustomAlertFn({
            ...options,
            type: 'success'
        })
    },

    error: (options: Omit<AlertOptions, 'type'>) => {
        return CustomAlertFn({
            ...options,
            type: 'error'
        })
    },

    info: (options: Omit<AlertOptions, 'type'>) => {
        return CustomAlertFn({
            ...options,
            type: 'info'
        })
    }
}

export const CustomAlert = Object.assign(CustomAlertFn, CustomAlertHelpers);
