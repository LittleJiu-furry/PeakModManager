<template>
    <div class="card-wrapper">
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
@keyframes rotateFadeIn {
    from {
        opacity: 0;
        transform: rotateX(30deg) translateY(10px);
    }
    to {
        opacity: 1;
        transform: rotateX(0deg) translateY(0);
    }
}

.card-wrapper {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 20px;
    margin: 20px 0; // 上下两个卡片之间利用margin的塌陷来实现

    .content {
        width: 100%;
        height: auto;
        padding: 10px 15px;
        box-sizing: border-box;
        background-color: var(--cardBackgroundColor);
        border-radius: 5px;
        border: 1px solid transparent;
        transition: border-color 0.2s ease-out;
        animation: rotateFadeIn 0.3s ease-out;

        &:hover {
            border-color: var(--cardHoverBorderColor);
        }
    }


}
</style>