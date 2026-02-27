<template>
    <Background>
        <template #head-left>
            <div class="return-nav">
                <div class="icon" @click="nav_back">
                    <span class="iconfont">
                        <i class="return"></i>
                    </span>
                </div>
                <span class="text">选择配置</span>
            </div>
        </template>
        <template #main>
            <div class="select-profile-wrapper">
                <Aside :items="profileItems" />
                <main class="main">
                    <Card>
                        <div class="content">
                            <div class="searchBox">
                                <div class="icon">
                                    <span class="iconfont">
                                        <i class="search"></i>
                                    </span>
                                </div>
                                <input class="search-input" type="search" placeholder="搜索配置文件" v-model="inputValue">
                            </div>
                            <button class="btn">新建配置</button>
                            <button class="btn">删除配置</button>
                        </div>
                    </Card>
                    <Transition name="fade" mode="out-in">
                        <Card v-if="showSearchResult">
                            <div class="list-wrapper"></div>
                            <div class="tip-wrapper">
                                <span>尚无配置文件</span>
                            </div>
                        </Card>
                        <Card v-else-if="!inSearching">
                            <div class="list-wrapper"></div>
                            <div class="tip-wrapper">
                                <span>尚无配置文件</span>
                            </div>
                        </Card>
                    </Transition>
                </main>
            </div>
        </template>
    </Background>
</template>

<script setup lang="ts">
import { CustomAlert } from '../customUI/alert';
import { CustomLoadingBox } from '../customUI/loadingBox';
import _ from 'lodash'

const isLoading = ref(false);
const inputValue = ref("");
const inSearching = computed(() => inputValue.value.trim() !== "");
const showSearchResult = ref(false);


const loadingBox = CustomLoadingBox();
const import_profile = () => {
    CustomAlert.info({
        msg: "功能尚未完成，敬请期待！",
    })
}

const router = useRouter();
const profileItems: AsideItem[] = [
    { id: 1, name: "配置列表", icon: "files" },
    { id: 2, name: "导入配置", icon: "import",  action: () => import_profile() }
]

const nav_back = () => {
    router.back();
}

const searchProfiles = _.debounce(() => {
    showSearchResult.value = true;
}, 300)

watch(inputValue, (newVal) => {
    if (newVal.trim() === "") {
        searchProfiles.cancel(); // 取消未执行的搜索
        showSearchResult.value = false;
    } else {
        searchProfiles();
    }
})

watch(isLoading, (newVal) => {
    if (newVal) {
        loadingBox.show();
    } else {
        loadingBox.hide();
    }
})

</script>

<style lang="less" scoped>
@keyframes left-slide-in {
    from {
        transform: translateX(-15px);
        opacity: 0.5;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.return-nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    animation: left-slide-in 0.25s ease-out;

    .icon {
        height: 20px;
        aspect-ratio: 1 / 1;
        font-size: 18px;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.2s ease-out;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: var(--headElementHoverColor);
        }
    }

    .text {
        font-size: 16px;
        color: var(--headFontColor);
        height: fit-content;

    }

}

.select-profile-wrapper {
    width: 100%;
    height: 100%;
    display: flex;

    .main {
        height: 100%;
        flex: 1;
    }

    .content {
        display: flex;
        height: 30px;
        gap: 5px;
        
        .searchBox {
            height: 100%;
            border-radius: 3px;
            border: 1px solid gray;
            padding: 3px;
            box-sizing: border-box;
            display: flex;
            gap: 5px;
            flex: 1;
            transition: all 0.2s ease-out;

            &:hover,
            &:has(.search-input:focus) {
                border-color: var(--cardElementHoverFontColor);
            }

            .search-input {
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
            }

        }

        .btn {
            box-sizing: border-box;
            background-color: transparent;
            border-radius: 3px;
            border: 1px solid gray;
            transition: all 0.2s ease-out;

            &:hover {
                background-color: var(--cardElementHoverBackgroundColor);
                color: var(--cardElementHoverFontColor);
                border-color: var(--cardElementHoverFontColor);
            }

        }
    }
}

.fade-leave-active {
    transition: opacity 0.3s ease-out;
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

</style>