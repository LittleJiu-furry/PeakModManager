<template>
   <div class="settings-wrapper">
        <Aside :items="settingItems" />
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

const settingItems: AsideItem[] = [
    { id: 1, name: "管理器设置", icon: "manager-setting", url: "/settings/manager" },
    { id: 2, name: "Mod设置", icon:"mod-setting", url: "/settings/mod" },
]


</script>

<style lang="less" scoped>
    @keyframes slide-in {
    from {
        transform: translateX(-30px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
.settings-wrapper {
    width: 100%;
    height: 100%;
    display: flex;

    .main {
        height: 100%;
        flex: 1;
    }    

}
</style>