<template>
	<v-card elevation="3" class="mx-auto my-12 app-post">
		<v-card-title class="app-post__title">
			{{post.name}}
			<span class="app-post__views">
				<v-icon small color="#bebebe">mdi-eye</v-icon>
				<span class="app-post__views-text">{{ formateViews(post.views) }}</span>
			</span>
		</v-card-title>
		<v-card-subtitle class="app-post__data">{{new Date(post.date).toLocaleString()}}</v-card-subtitle>
		<v-img
			:src=post.imageUrl
			class="app-post__img"
			height="200"
		></v-img>
		<v-card-actions class="app-post__action">
			<v-btn text @click="openPost">Открыть</v-btn>
			<span class="app-post__comments">
				<v-icon small color="#bebebe">mdi-message</v-icon>
				<span class="app-post__comments-value">{{ post.comments.length }}</span>
			</span>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'AppPost',
	props: {
		post: {
			default() {
				return {}
			},
			type: Object,
			required: true
		}
	},
	methods: {
		openPost() {
			this.$router.push('/post/' + this.post._id);
		},
		formateViews() {
      if (this.post.views <= 100) {
        return '< 100'
       } else if (this.post.views > 100 && this.post.views <= 1000) {
        return '< 1000'
       } else {
         return Math.round(this.post.views / 10) * 10
			 }
		}
	},
};
</script>

<style scoped>
.app-post__views {
	margin-left: auto;
	color: #bebebe;
}
.app-post__views-text {
	font-size: .9rem;
	font-weight: normal;
}
.app-post__comments {
	margin-left: auto;
	padding-right: 0.5rem;
	color: #bebebe;
}
</style>
