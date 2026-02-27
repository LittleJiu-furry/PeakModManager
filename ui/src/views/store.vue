<template>
    <div class="store-wrapper">
        <Aside :items="storeItems" />
        <div class="main">
            <RouterView #default="{ Component, route }">
                <KeepAlive>
                    <component :is="Component" :key="route.matched[2]?.name" />
                </KeepAlive>
            </RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">

const storeItems: AsideItem[] = [
    { id: 1, name: "Mod商店", icon: "mod-store", url: "/store/library" },
    { id: 2, name: "下载管理", icon:"download", url: "/store/download" },
]


</script>

<style lang="less" scoped>
.store-wrapper {
    width: 100%;
    height: 100%;
    display: flex;

    .main {
        flex: 1;
        height: 100%;
    }
}


</style>