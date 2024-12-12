<script lang="ts" setup>
import generateContent, {type GenerateContentProps} from "@/services/Gemini";
import socket from "@/server/Socket";
import Button from "@/components/ui/button/Button.vue";
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
import LoadingDots from "./Loading/ChatDots.vue";
import LikeImage from "@/assets/images/like.png";
import DislikeImage from "@/assets/images/dislike.png";
import useToastNotification from "@/notification/toast";
import {v4 as uuidv4} from "uuid";
import {ref, nextTick} from "vue";
import {
	Bot,
	User,
	BotMessageSquare,
	Send,
	RefreshCw,
	Copy,
	ThumbsDown,
	ThumbsUp,
} from "lucide-vue-next";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

interface Message {
	text: string;
	sender: "ai" | "user";
	refs: string[];
	first?: boolean;
	isLiked?: boolean;
	isDisliked?: boolean;
}

const defaultMessage: Message = {
	text: "👋 Hi! I am NEI Market AI, ask me anything about NEI Market Analytics!",
	sender: "ai",
	refs: [],
	first: true,
};

const prompt = ref("");
const messages = ref<Message[]>([defaultMessage]);
const loading = ref(false);
const error = ref(false);
const sessionId = ref(uuidv4());
const isOpen = ref(false);

let aiMessage = "";

function copyToClipboard(text: string) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			useToastNotification("Text copied to clipboard");
		})
		.catch((_e) => {
			useToastNotification("Error copying text to clipboard");
		});
}

function toggleLike(message: Message) {
	message.isLiked = !message.isLiked;
	if (message.isLiked) {
		message.isDisliked = false;
	}
}

function toggleDislike(message: Message) {
	message.isDisliked = !message.isDisliked;
	if (message.isDisliked) {
		message.isLiked = false;
	}
}

function refresh() {
	sessionId.value = uuidv4();
	aiMessage = "";
	messages.value = [defaultMessage];
	useToastNotification("Chat refreshed");
}

async function sendMessage(resendMessage?: boolean) {
	loading.value = true;

	const lastUserMessage = [...messages.value]
		.reverse()
		.find((message) => message.sender === "user");

	const userMessage = resendMessage ? (lastUserMessage?.text as string) : prompt.value;
	if (userMessage.trim() === "" && !resendMessage) return;

	const lastBotMessage = [...messages.value].reverse().find((message) => message.sender === "ai");

	if (resendMessage) {
		messages.value.pop();
	} else {
		messages.value.push({text: userMessage, sender: "user", refs: []});
		nextTick(() => {
			const messagesContainer = document.querySelector(".chat-messages");
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		});
	}
	prompt.value = "";

	try {
		const data: GenerateContentProps = {
			prompt: userMessage,
			sessionId: sessionId.value,
			lastUserMessage: lastUserMessage?.text,
			lastBotMessage: lastBotMessage?.text,
			likeOrDislikePreviousMessage: lastBotMessage?.isLiked
				? true
				: lastBotMessage?.isDisliked
					? false
					: undefined,
		};
		await generateContent(data);
	} catch (error) {
		console.error(error);
	}
}

function adjustTextareaHeight(event: Event) {
	const textarea = event.target as HTMLTextAreaElement;
	textarea.style.height = "auto";
	textarea.style.height = `${textarea.scrollHeight}px`;
}

socket.on("content", (data) => {
	// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
	if (data.sessionId == sessionId.value) {
		aiMessage += data.text;
		if (
			messages.value.length > 0 &&
			messages.value[messages.value.length - 1].sender === "ai"
		) {
			messages.value[messages.value.length - 1].text = aiMessage;
		} else {
			messages.value.push({text: aiMessage, sender: "ai", refs: data.refs});
		}
		loading.value = false;
	}
});

socket.on("content_end", (requestSessionId) => {
	// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
	if (requestSessionId == sessionId.value) {
		aiMessage = "";
		nextTick(() => {
			const messagesContainer = document.querySelector(".chat-messages");
			if (messagesContainer) {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}
		});
	}
});

socket.on("error", (data) => {
	// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
	if (data.sessionId == sessionId.value) {
		error.value = true;
		loading.value = false;
		console.error(data.error);
	}
});
</script>

<template>
    <Collapsible v-model:open="isOpen" class="fixed right-0 lg:right-14 bottom-32 lg:bottom-14 z-50">
        <CollapsibleTrigger as-child class="absolute right-4 lg:-right-10 -bottom-10">
            <Button variant="default" class="w-12 h-12 p-2 rounded-full">
                <BotMessageSquare :size="50" />
            </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <div class="chat-container  lg:w-[400px]">
                <header>
                    <div class="flex items-center gap-2">
                        <Image src="/logo-just-icon.png" alt="NEI Market AI Logo" class="brightness-[100]" width="40"
                            height="40" />
                        <h6>NEI Market AI</h6>
                    </div>
                    <button title="Recarregar chat" @click="refresh" :disabled="messages.length === 1 || loading"
                        class="disabled:opacity-50 hover:opacity-50 duration-150 ease-in-out">
                        <RefreshCw :size="20" :stroke-width="3" />
                    </button>
                </header>
                <ul class="chat-messages" ref="messagesContainer">
                    <li v-for="(message, index) in messages" :key="index">
                        <div :class="[ 'chat-message', message.sender ]" class="rounded-full relative">
                            <Bot v-if="message.sender === 'ai'" :class="[ 'chat-icon', message.sender ]" />
                            <User v-if="message.sender === 'user'" :class="[ 'chat-icon', message.sender ]" />
                            <span class="text-white">{{ message.text }}</span>
                        </div>
                        <div v-if="message.sender === 'ai' && !message.first"
                            class="chat-actions ml-7 -mt-1 flex gap-3">
                            <button title="Copiar" @click="copyToClipboard(message.text)">
                                <Copy :size="16" />
                            </button>
                            <button title="Like" @click="toggleLike(message)">
                                <ThumbsUp :size="16" v-if="!message.isLiked" />
                                <Image :src="LikeImage" alt="Like" width="16" height="16" class="dark:invert" v-else />
                            </button>
                            <button title="Dislike" @click="toggleDislike(message)">
                                <ThumbsDown :size="16" v-if="!message.isDisliked" />
                                <Image :src="DislikeImage" alt="Dislike" width="16" height="16" class="dark:invert"
                                    v-else />
                            </button>
                            <button v-if="index === messages.length - 1" title="Recarregar" @click="sendMessage(true)">
                                <RefreshCw :size="16" />
                            </button>
                        </div>
                    </li>
                    <LoadingDots v-if="loading && !error" />
                    <p v-if="error" class="text-negative">Erro ao gerar conteúdo, tente novamente mais tarde!</p>
                </ul>
                <div class="chat-input">
                    <textarea class="flex w-full" maxlength="1000" v-model="prompt" @input="adjustTextareaHeight"
                        @keyup.enter="sendMessage()" placeholder="Digite sua mensagem..." />
                    <Button title="NEI Market AI Chat"
                        class="p-2 absolute right-4 bottom-[10px] dark:hover:bg-black/25 hover:bg-slate-100"
                        variant="ghost" @click="() => { error = false, sendMessage() }"
                        :disabled="loading || prompt.trim() === ''">
                        <Send :size="20" color="var(--text)" :stroke-width="2.5" />
                    </Button>
                </div>
                <footer>
                    <p class="text-text text-sm">By chatting, you agree to our</p>
                    <RouterLink class="underline text-sm hover:opacity-50" to="/privacy-policy">privacy policy
                    </RouterLink>
                    .
                </footer>
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>

<style scoped lang="css">
.chat-container {
    height: 80dvh;
    margin: 0 auto;
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    background-color: var(--background);
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    background-color: var(--primary);
    color: #fff;
    text-align: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.chat-messages div {
    position: relative;
    display: flex;
    align-items: center;
}

.chat-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0px
}

.chat-messages div .chat-icon.ai {
    left: -25px;
}

.chat-messages div .chat-icon.user {
    right: -25px;
}

.chat-message {
    margin-bottom: 10px;
    padding: 8px 16px;
    width: 85%;
}

.chat-message.user {
    background-color: var(--secondary);
    margin-left: auto;
    margin-right: 20px;
    border-radius: 20px 20px 1px 20px;
}

.chat-message.ai {
    background-color: var(--primary);
    align-self: flex-start;
    margin-right: auto;
    margin-left: 20px;
    border-radius: 20px 20px 20px 1px;
}

.chat-actions svg,
.chat-actions div {
    cursor: pointer;
}

.chat-actions svg:hover,
.chat-actions div:hover {
    opacity: 50%;
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-input {
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 1px;
}

.chat-input textarea {
    color: var(--text);
    background: var(--secondary-darker);
    max-height: 200px;
    padding: 4px;
    padding-right: 60px;
    resize: none;
    box-shadow: 0 0.5px 0px var(--text), 0 -0.5px 0px var(--text);
}

.chat-input textarea:focus {
    outline: none;
    box-shadow: 0 0.5px 1px var(--text), 0 -0.5px 0px var(--text);
}

.chat-input textarea::placeholder {
    padding-top: 12px;
}

footer {
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 4px;
    gap: 4px;
}
</style>
