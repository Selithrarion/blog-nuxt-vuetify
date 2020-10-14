<template>
	<div class="app-comment-add">
		<v-form
			v-model="valid"
			class="app-comment-add__form px-2 mb-6"
			@submit.prevent="onSubmit"
		>
			<v-text-field
				v-model="name"
				class="app-comment-add__name"
				placeholder="Твоё Имя"
				outlined
				dense
				counter="20"
				:rules="rulesName"
				required
			></v-text-field>
			<v-textarea
				v-model="text"
				class="app-comment-add__text"
				outlined
				placeholder="Твой Комментарий"
				:rules="rulesText"
				required
				auto-grow
				rows="3"
			></v-textarea>
			<v-btn
				text
				type="submit"
				class="app-comment-add__btn mb-4"
				:loading="loading"
				:disabled="!valid || loading"
			>
				Добавить
			</v-btn>
			<v-divider></v-divider>
		</v-form>
		<v-snackbar
			v-model="snackbarComment"
			class="app-comment-add__snackbar"
			color="success"
			timeout="2000"
			elevation="4"
			multi-line
			outlined
			top
			light
			transition="slide-y-transition"
		>
			<span>Комментарий успешно добавлен!</span>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	name: 'AppCommentAdd',
	components: {},
	props: {
		postId: {
			type: String,
			required: true,
			default: '',
		}
	},
	data() {
		return {
			name: '',
			text: '',
			valid: false,
			loading: false,
			snackbarComment: false,
			rulesName: [
				(v) => v.length <= 20 || 'Максимум 20 символов',
				(v) => !!v || 'Имя обязательно',
			],
			rulesText: [(v) => !!v || 'Это тоже обязательно'],
		};
	},
	computed: {},
	methods: {
		async onSubmit() {
			if (this.valid) {
				this.loading = true;

				const formData = {
					name: this.name,
					text: this.text,
					postId: this.postId,
				};
				
				try {
					const comment = await this.$store.dispatch('comment/CREATE_COMMENT', formData)					
					this.$emit('create', comment);
					this.snackbarComment = true;
					this.loading = false;
					this.name = '';
					this.text = '';
				} catch (error) {
					this.loading = false;
				}
			}
		},
	},
};
</script>

<style scoped>
.app-comment-add__comment {
	white-space: pre-line;
}
.app-comment-add__alert {
	position: fixed;
	bottom: 48px;
	left: 8px;
	z-index: 10;
}
</style>
