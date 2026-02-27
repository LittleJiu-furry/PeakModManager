<template>
    <RouterView #default="{ Component, route }">
        <KeepAlive>
            <component :is="Component" :key="route.matched[0]?.name" />
        </KeepAlive>
    </RouterView>
</template>

<script setup lang="ts">
import PyAPI from './py.api';
PyAPI.waitForPyWebViewReady()
</script>

<style lang="less" scoped>

</style>