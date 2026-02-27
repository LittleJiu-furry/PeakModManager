<template>
    <div class="custom-loading-container">
        <Transition name="fade_out" @after-leave="onAfterLeave">
            <div class="loadingBox" v-if="showLoading">
                <div class="icon-wrapper">
                    <span class="iconfont">
                         <i class="loading"></i>
                    </span>
                </div>
                <div class="text">
                    {{ text }}
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const showLoading = ref(false);
const text = ref("Loading...")

const emit = defineEmits<{
    (e: 'after:close'): void;
}>();

const closeLoading = () => {
    showLoading.value = false;
}

const onAfterLeave = () => {
    emit('after:close');
}

const changeText = (newText: string) => {
    text.value = newText;
}

defineExpose({
    closeLoading,
    changeText
})

onMounted(() => {
    showLoading.value = true;
})

</script>

<style lang="less" scoped>
@keyframes zoom-in {
    from {
        transform: scale(0.8);
    }
    to {
        transform: scale(1);
    }
}

@keyframes shine {
    0%, 100% {
        box-shadow: 0 0 0 var(--loadingBoxFontColor);
    }
    50% {
        box-shadow: 0 0 5px var(--loadingBoxFontColor),
            0 0 10px var(--loadingBoxFontColor),
            0 0 15px var(--loadingBoxFontColor);
    }
}

.custom-loading-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: zoom-in 0.25s cubic-bezier(0.5, 1.5, 0.5, 1.5);

    .loadingBox {
        background-color: var(--loadingBoxBackgroundColor);
        border-radius: 5px;
        width: 150px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: shine 1.5s infinite cubic-bezier(0, 0.5, 1, 0.5);

        .icon-wrapper {
            width: 120px;
            aspect-ratio: 1 / 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont {
                width: unset;
                height: 100%;
                aspect-ratio: 1 / 1;
                color: var(--loadingBoxFontColor);
            }
        }

        .text {
            font-size: 16px;
            color: var(--loadingBoxFontColor);
            text-align: center;
        }

    }

}


.fade_out-leave-active {
    transition: all 0.25s ease-out;
}

.fade_out-leave-from {
    opacity: 1;
    transform: scale(1);
}

.fade_out-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>