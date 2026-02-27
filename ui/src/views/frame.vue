<template>
    <Background>
        <template #head-left>
            <div class="appIcon">
                <span @mousedown.stop>Mod管理器</span>
            </div>
        </template>
        <template #head-center>
            <div class="tab-wrapper">
                <div v-for="item in headItems" :key="item.id" class="item"
                    :class="{ active: activeHeadItem?.id === item.id }" @click="changePage(item.url)"
                    @mousedown.stop>
                    <span class="iconfont">
                        <i :class="item.icon"></i>
                    </span>
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </template>
        <template #main>
            <RouterView #default="{ Component, route }">
                <KeepAlive>
                    <component :is="Component" :key="route.matched[1]?.name" />
                </KeepAlive>
            </RouterView>
        </template>
    </Background>
</template>

<script setup lang="ts">

interface HeadItem {
    id: number;
    name: string;
    icon: string;
    url: string;
}

const headItems: HeadItem[] = [
    { id: 1, name: "启动", icon: "launch", url: "/launch" },
    { id: 2, name: "商店", icon: "store", url: "/store" },
    { id: 3, name: "设置", icon: "setting", url: "/settings" },
    { id: 4, name: "更多", icon: "more", url: "/more" }
] as const

const getFirtstPath = (path: string) => {
    const paths = path.split("/")
    return `/${paths[1]}`
}
const router = useRouter()
const route = useRoute()
const activeHeadItem = computed(() => {
    const firstPath = getFirtstPath(route.path)
    return headItems.find(item => item.url === firstPath) || headItems[0]
})

const changePage = (url: string) => {
    console.log(url);
    router.push(url)
}



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

.appIcon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    animation: left-slide-in 0.25s ease-out;
}

.tab-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 20px;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    .item {
        border-radius: ~"calc(infinity * 1px)";
        padding: 3px 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
        transition: all 0.3s;
        .icon {
            aspect-ratio: 1 / 1;
            height: 20px;
        }
        
        &:hover {
            background-color: var(--headElementHoverColor);
        }
        &.active {
            background-color: var(--headElementActiveBackgroundColor);
            color: var(--headElementActiveColor);
        }
    }
}
</style>