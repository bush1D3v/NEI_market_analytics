<script lang="ts" setup>
import { ref } from "vue";
import generateContent from "@/services/Gemini";
import socket from "@/server/Socket";

const prompt = ref("");
const content = ref("");

async function generateContentHandler() {
    try {
        await generateContent(prompt.value);
    } catch (error) {
        console.error(error);
    }
};

socket.on("content", (data) => {
    content.value += data.text;
});
</script>

<template>
    <div>
        <h1>Generative AI</h1>
        <input class="text-black" v-model="prompt" placeholder="Digite seu prompt" />
        <button @click="generateContentHandler()" id="generateContent">Gerar Conteúdo</button>
        <div id="content">{{ content }}</div>
    </div>
</template>
