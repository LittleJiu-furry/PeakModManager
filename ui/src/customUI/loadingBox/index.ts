import { createVNode, render } from "vue";
import { getPutcontainer, getRamdomString } from "../../utils/common";
import LoadingBox from "./loadingBox.vue"

interface LoadingBoxesValue {
    hasLoadingBox?: boolean; // 是否已经创建了loadingBox组件了，如果没有，就创建一个，如果有了，就不创建了，直接显示
    container?: HTMLDivElement; // 这个是loadingBox组件的容器，销毁组件的时候需要用到
    vnode?: ReturnType<typeof createVNode>; // 这个是loadingBox组件的vnode，销毁组件的时候需要用到
}

class _Context {
    private static instance: _Context;
    private loadingBoxes: Map<string, LoadingBoxesValue> = new Map();
    private constructor() { }
    public static getInstance(): _Context {
        if (!this.instance) {
            this.instance = new _Context();
        }
        return this.instance;
    }

    // 创建一个loadingBox
    public createLoadingBox(): string {
        const id = getRamdomString(10);
        this.loadingBoxes.set(id, {});
        return id;
    }

    public show(id: string) {
        let loadingBox = this.loadingBoxes.get(id);
        if (!loadingBox) return;
        if (loadingBox.hasLoadingBox) return; // 已经有一个loadingBox
        if (!loadingBox.container) {
            // 补充创建容器
            const container = document.createElement('div');
            container.classList.add('custom-ui');
            container.classList.add(getRamdomString(8));
            getPutcontainer().appendChild(container);
            loadingBox.container = container;
        }
        const vnode = createVNode(LoadingBox, {
            'onAfter:close': () => {
                // 组件关闭后的回调，销毁组件
                render(null, loadingBox.container!);
                loadingBox.vnode = undefined;
                // 不再需要容器了，需要删除
                loadingBox.container!.remove();
                loadingBox.container = undefined;
                loadingBox.hasLoadingBox = false;
            }
        })
        render(vnode, loadingBox.container);
        loadingBox.vnode = vnode;
        loadingBox.hasLoadingBox = true;
    }

    public hide(id: string) {
        const loadingBox = this.loadingBoxes.get(id);
        if (!loadingBox) return;
        if (!loadingBox.hasLoadingBox) return;
        loadingBox.vnode?.component?.exposed?.closeLoading(); // 调用组件暴露的方法来关闭loadingBox组件
    }

    public changeText(id: string, text: string) {
        const loadingBox = this.loadingBoxes.get(id);
        if (!loadingBox) return;
        if (!loadingBox.hasLoadingBox) return;
        loadingBox.vnode?.component?.exposed?.changeText(text); // 调用组件暴露的方法来改变loadingBox组件的文本
    }
}

export const CustomLoadingBox = () => {
    const context = _Context.getInstance();
    const id = context.createLoadingBox();
    const show = () => {
        context.show(id);
    }
    const hide = () => {
        context.hide(id);
    }
    const changeText = (text: string) => {
        context.changeText(id, text);
    }

    return {
        show,
        hide,
        changeText
    }
}