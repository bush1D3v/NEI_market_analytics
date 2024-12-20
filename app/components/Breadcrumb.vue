<script lang="ts" setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import RouterLink from "@/tags/RouterLink.vue";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
	const paths = route.path.split("/").filter((path) => path);
	const breadcrumbArray = paths.map((path, index) => {
		const to = `/${paths.slice(0, index + 1).join("/")}`;
		const routeMatch = router.resolve(to);
		return {
			text: routeMatch.name || path,
			to,
		};
	});
	return [{text: "Home", to: "/"}, ...breadcrumbArray];
});
</script>

<template>
    <Breadcrumb class="pl-4 lg:pb-4">
        <BreadcrumbList>
            <BreadcrumbItem v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                <BreadcrumbLink v-if="index < breadcrumbs.length - 1">
                    <RouterLink :to="breadcrumb.to">{{ breadcrumb.text }}</RouterLink>
                </BreadcrumbLink>
                <BreadcrumbPage v-else>{{ breadcrumb.text }}</BreadcrumbPage>
                <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
</template>
