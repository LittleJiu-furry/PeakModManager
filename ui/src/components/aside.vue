<template>
    <div class="aside">
        <div class="item" v-for="item in _items" :key="item.id" 
            :class="{ 'active': item.id == activeItem?.id }"
            @click="item.action(item)">
            <div class="icon">
                <span class="iconfont">
                    <i :class="item.icon"></i>
                </span>
            </div>
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    items: AsideItem[];
}>()


const activeItem = ref<Required<AsideItem>>()
const router = useRouter()
const _items = computed<Required<AsideItem>[]>(() => {
    return props.items.map((item) => {
        return {
            url: "",
            action: (i: Required<AsideItem>) => {
                activeItem.value = i;
            },
            ...item
        } as Required<AsideItem>
    })
})

watch(activeItem, (newVal) => {
    // 监听activeItem的变化，进行路由跳转
    if (!newVal) return;
    router.push(newVal.url)
})

const active = () => {    
    if (!activeItem.value) {
        activeItem.value = _items.value[0]
    }
    // 根据当前激活的选项卡再做一次跳转
    router.push(activeItem.value?.url as string)
}

onMounted(() => {
    activeItem.value = _items.value[0]
})

onActivated(() => {
    active()
})

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
.aside {
    width: 150px;
    height: 100%;
    background-color: var(--asideBackgroundColor);
    color: var(--asideFontColor);
    animation: slide-in 0.25s ease-out;
    padding: 10px 0 0;

    .item {
        display: flex;
        padding: 5px 10px;
        box-sizing: border-box;
        position: relative;
        gap: 5px;
        transition: all 0.3s ease;
        
        &::before {
            @height: 80%;
            content: "";
            width: 0px;
            height: @height;
            position: absolute;
            left: 0;
            top: calc((100% - @height) / 2);
            box-sizing: border-box;
            @radius: ~"calc(infinity * 1px)";
            border-top-right-radius: @radius;
            border-bottom-right-radius: @radius;
            transition: width 0.2s ease;
        }

        &.active {
            color: var(--asideActiveFontColor);

            &::before {
                background-color: var(--asideActiveFontColor);
                width: 5px;
            }
        }

        &:hover {
            background-color: var(--asideHoverBackgroundColor);
        }

    }
}
</style>