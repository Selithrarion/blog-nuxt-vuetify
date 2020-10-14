<template>
	<div class="page">
		<h2 class="text-center">My simple SSR Blog with Nuxt.js</h2>
		<AppPost v-for="post of posts" :key="post._id" :post="post" />
	</div>
</template>

<script>
import AppPost from '@/components/AppPost';

export default {
	head: {
		title: `Главная | ${process.env.appName}`,
	},
	components: {
		AppPost,
	},
	async asyncData({store}) {
		const posts = await store.dispatch('post/FETCH_POSTS')
		return {posts}
	},

};
</script>
