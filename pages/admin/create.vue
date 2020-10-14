<template>
	<div class="app-create">
		<h2 class="app-create__title mb-2">Создание поста</h2>

		<v-divider></v-divider>

		<v-form
			v-model="valid"
			class="app-create__form mt-6"
			@submit.prevent="onSubmit"
		>
			<v-text-field
				v-model="name"
				outlined
				dense
				counter="100"
				:rules="rulesName"
				placeholder="Название"
				required
			></v-text-field>
			<v-textarea
				v-model="text"
				outlined
				:rules="rulesText"
				placeholder="Текст в формате .md или .html"
				required
				auto-grow
				rows="6"
			></v-textarea>
			<v-file-input
				v-model="image"
				class="mb-8"
				truncate-length="15"
				:rules="rulesImage"
				label="Картинка поста"
				show-size
			></v-file-input>

			<div>
				<v-dialog v-model="dialogPreview" width="800">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							tile
							color="info"
							v-bind="attrs"
							v-on="on"
							@click="openDialogPreview"
						>
							Предпросмотр
						</v-btn>
					</template>

					<v-card>
						<v-card-title class="headline">
							Предпросмотр текста
						</v-card-title>

						<v-spacer></v-spacer>

						<v-card-text>
							<div :key="text">
								<vue-markdown>{{ text }}</vue-markdown>
							</div>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="primary"
								text
								@click="dialogPreview = false"
							>
								Закрыть
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>

			<v-btn
				class="mt-2"
				text
				type="submit"
				:loading="loading"
				:disabled="!valid || loading"
			>
				Создать пост
			</v-btn>
		</v-form>
		<v-snackbar
			v-model="snackbarSuccess"
			color="success"
			timeout="2000"
			elevation="4"
			multi-line
			outlined
			top
			light
			transition="slide-y-transition"
		>
			<span>Пост успешно создан!</span>
		</v-snackbar>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	head: {
		title: `Новый пост | ${process.env.appName}`,
	},
	data() {
		return {
			name: '',
			text: '',
			image: null,
			valid: false,
			loading: false,
			snackbarSuccess: false,
			dialogPreview: false,
			rulesName: 
			[(v) => !!v || 'Название обязательно',
			(v) => this.name.length <= 100 || 'Слишком длинный заголовок'],
			rulesText: [(v) => !!v || 'Пустой пост?'],
			rulesImage: [(v) => !!v || 'Нужна картинка'],
		};
	},
	methods: {
		...mapActions({
			createPost: 'post/CREATE_POST_ADMIN',
		}),

		async onSubmit() {
			if (this.valid) {
				this.loading = true;

				try {
					const formData = {
						name: this.name,
						text: this.text,
						image: this.image,
					};

					await this.createPost(formData);
					this.name = '';
					this.text = '';
					this.image = null;
					this.snackbarSuccess = true;
				} catch (error) {
					this.loading = false;
				} finally {
					this.loading = false;
				}
			}
		},
		openDialogPreview() {
			this.dialogPreview = !this.dialogPreview;
		},
	},
};
</script>

<style scoped>
.app-create__form {
	max-width: 800px;
}
</style>
