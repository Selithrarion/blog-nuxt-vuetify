<template>
	<div>
		<h1>Аналитика постов</h1>
		<AppAnalyticsChart 
			title="Просмотры"
			:labels="views.labels"
			:data="views.data"
		/>
		<AppAnalyticsChart 
			class="mt-4"
			title="Комметарии"
			:labels="comments.labels"
			:data="comments.data"
		/>
	</div>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	head: {
		title: `Аналитика | ${process.env.appName}`,
	},
	async asyncData({store}) {
		const {views, comments} = await store.dispatch('post/GET_ANALYTICS')
		return {views, comments}
	},
};
</script>

<style></style>
