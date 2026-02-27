<template>
    <div class="launch-wrapper">
        <div class="aside">
            <div class="other-content">
                <div class="appIcon">
                    <span>Mod管理器</span>
                </div>
            </div>
            <div class="btns">
                <button class="button start mod">
                    <div class="title">启动Mod游戏</div>
                    <div class="description">配置文件: {{ nowProfile }}</div>
                </button>
                <button class="button start origin">启动原版游戏</button>
                <button class="button selectProfile" @click="router.push('/select-profile')">选择配置</button>
                <button class="button manageProfile" @click="nav_to_profile_manager">管理配置</button>
            </div>
        </div>
        <div class="others">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { CustomAlert } from '../customUI/alert';


const router = useRouter();
const nowProfile = ref("default");

const nav_to_profile_manager = () => {
    CustomAlert.info({
        msg: "功能尚未完成，敬请期待！",
    })
    // router.push(`/setting-profile/${nowProfile}`)
}


</script>

<style lang="less" scoped>
@keyframes slide-in {
    from {
        transform: translateX(-30px);
        opacity: 0.5;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.launch-wrapper {
    width: 100%;
    height: 100%;
    display: flex;

    .aside {
        height: 100%;
        width: 250px;
        background-color: var(--asideBackgroundColor);
        color: var(--asideFontColor);
        animation: slide-in 0.25s ease-out;
        box-sizing: border-box;
        padding: 10px 15px;
        box-shadow: 1px 0 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;

        .other-content {
            width: 100%;
            flex: 1;
        }

        .btns {
            width: 100%;
            height: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px 2px;


            .button {
                width: 100%;
                padding: 7px 10px;
                box-sizing: border-box;
                background-color: transparent;
                outline: none;
                border: 1px solid black;
                border-radius: 3px;
                transition: all 0.3s;

                &:hover {
                    background-color: var(--launchBtnsHoverBackgroundColor);
                    color: var(--launchBtnsHoverFontColor);
                    border-color: var(--launchBtnsHoverFontColor);
                }

                &.start {
                    grid-column: 1 / -1;

                    &.mod {
                        border-color: var(--launchBtnsHoverFontColor);
                        color: var(--launchBtnsHoverFontColor);

                        .description {
                            color: gray;
                            font-size: 10px;
                        }


                    }
                }


            }
        }
    }

}
</style>