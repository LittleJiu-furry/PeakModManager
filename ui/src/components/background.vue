<template>
    <div class="app-background-frame">
        <header class="head pywebview-drag-region">
            <div class="content">
                <slot name="head-left"></slot>
            </div>
            <div class="content">
                <slot name="head-center"></slot>
            </div>
            <div class="content tools">
                <span class="iconfont" @mousedown.stop @click="minimize">
                    <i class="minimize"></i>
                </span>
                <span class="iconfont" @mousedown.stop @click="close">
                    <i class="close"></i>
                </span>
            </div>
        </header>
        <main class="main">
            <slot name="main"></slot>
            <div class="ui-layer">
                <div id="custom-container"></div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import PyAPI from '../py.api';

const minimize = () => {
    PyAPI.minimize();
}

const close = () => {
    PyAPI.close();
}


</script>

<style lang="less" scoped>
.app-background-frame {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .head {
        width: 100%;
        height: 50px;
        padding: 5px 20px;
        box-sizing: border-box;
        background-color: var(--headBackgroundColor);
        color: var(--headFontColor);
        font-size: 18px;
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        align-items: center;
        justify-items: center;

        .content {
            width: 100%;
            height: 100%;
        }


        .tools {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;
            z-index: 10;

            .iconfont {
                padding: 5px;
                border-radius: 50%;
                transition: background-color 0.3s;

                &:hover {
                    background-color: var(--headElementHoverColor);
                }
            }


        }

    }


    .main {
        width: 100%;
        height: calc(100% - 50px);
        position: relative;
    }
}

.ui-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

#custom-container {
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: none;
}
</style>