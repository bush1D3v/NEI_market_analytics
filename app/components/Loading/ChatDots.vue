<template>
    <div class="loading-dots">
        <div class="dot" v-for="n in 3" :key="n" :class="'dot-' + n"></div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.loading-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.dot {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    border-radius: 50%;
    background-color: var(--text-foreground);
    animation: blink 1.4s infinite both;
}

.dot-1 {
    animation-delay: -0.32s;
}

.dot-2 {
    animation-delay: -0.16s;
}

@keyframes blink {

    0%,
    80%,
    100% {
        opacity: 0;
    }

    40% {
        opacity: 1;
    }
}
</style>
