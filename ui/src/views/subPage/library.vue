<template>
    <div class="library-wrapper">
        <Card>
            <div class="searchContent">
                <div class="searchBox">
                   <div class="icon">
                        <span class="iconfont">
                            <i class="search"></i>
                        </span>
                    </div>
                    <input class="search-input" type="search" placeholder="搜索模组">
                </div>
                <button class="search-btn">
                    <span>搜索</span>
                </button>
            </div>
        </Card>
        <Card>

        </Card>
    </div>
</template>

<script setup lang="ts">
import { CustomLoadingBox } from '../../utils/ui';
import useStoreStore from '../../stores/store.store';

const storeStore = useStoreStore();
const isLoaded = computed(() => storeStore.isLoaded)
const storeLoadingBox = CustomLoadingBox()
storeLoadingBox.changeText("正在加载商店数据...")

watch(isLoaded, (newVal) => {
    console.log("isLoaded:", newVal);
    
})

const active = async () => {
    if (isLoaded.value) {
        return;
    };
    storeLoadingBox.show();
    await storeStore.loadStore()
    storeLoadingBox.hide()
}

onMounted(() => {
    active()
})

onActivated(() => {
    active()
})

</script>

<style lang="less" scoped>
.library-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .searchContent {
        display: flex;
        width: 100%;
        height: 30px;
        align-items: center;
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

        .typeSelect {
            height: 100%;
            width: 100px;
        }

    }





}
</style>