<template>
	<v-card class="app-comment mb-2">
		<v-card-title class="app-comment__title">
			{{comment.name}}
			<span class="app-comment__date">
				{{ new Date(comment.date).toLocaleString() }}
			</span>
		</v-card-title>
		<v-card-text class="app-comment__text">
			{{comment.text}}
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: 'AppComment',
	props: {
		comment: {
			type: Object,
			required: true,
			default() {
				return {}
			}
		}
	},
	data() {
		return {};
	},
	computed: {},
	methods: {},
};
</script>

<style scoped>
.app-comment__title {
	font-size: 1rem;
}
.app-comment__date {
	font-size: 0.75rem;
	font-weight: normal;
	margin-left: auto;
}
</style>
