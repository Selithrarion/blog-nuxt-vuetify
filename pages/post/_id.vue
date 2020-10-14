<template>
	<div class="post">
		<v-card class="mx-auto">
			<v-card-title>
				<nuxt-link to="/" class="pr-2">
					<v-icon>mdi-arrow-left</v-icon>
				</nuxt-link>
				{{post.name}}
				<span class="app-post-detail__views">
					<v-icon small color="#bebebe">mdi-eye</v-icon>
						<span class="app-post-detail__views-text">{{ formateViews(post.views) }}</span>
				</span>
			</v-card-title>
			<v-card-subtitle>{{ new Date(post.date).toLocaleString() }}</v-card-subtitle>
			<v-img
				:src="post.imageUrl"
			></v-img>
			<v-card-text class="pt-6">
				<vue-markdown>{{post.text}}</vue-markdown>
			</v-card-text>
		</v-card>

		<v-card class="mt-4">
			<v-card-title>Комментарии:</v-card-title>
			<AppCommentAdd :postId="post._id" @create="onCreateComment"></AppCommentAdd>
			<v-card-text v-if="true">
				<AppComment
					v-for="comment in post.comments"
					:key="comment._id"
					:comment="comment"
				></AppComment>
			</v-card-text>
			<v-card-text v-else class="text-center">
				Никто не оставил комментариев :(
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import AppComment from '@/components/AppComment.vue';
import AppCommentAdd from '@/components/AppCommentAdd.vue';

export default {
	validate({ params }) {
		return !!params.id;
	},
	head() {
		return {
			title: `${this.post.name} | ${process.env.appName}`,
		}
	},
	components: { AppComment, AppCommentAdd },
	async asyncData({store, params}) {
		const post = await store.dispatch('post/FETCH_BY_ID', params.id)
		await store.dispatch('post/ADD_VIEW', post)
		return {post}
	},
	data() {
		return {
			justify: [
				'start',
				'center',
				'end',
				'space-around',
				'space-between',
			],
		};
	},
	computed: {},
	methods: {
		onCreateComment(comment) {
			this.post.comments.unshift(comment)
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
.app-post-detail__views {
	margin-left: auto;
	color: #bebebe;
}
.app-post-detail__views-text {
	font-size: .9rem;
	font-weight: normal;
}
</style>
