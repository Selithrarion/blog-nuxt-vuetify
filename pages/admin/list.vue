<template>
	<v-data-table
		:headers="headers"
		:items="posts"
		sort-by="date"
		class="elevation-1"
		:footer-props="footerProps"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Посты</v-toolbar-title>
				<v-spacer></v-spacer>
			</v-toolbar>
		</template>

		<template v-slot:item.date="{ item }">
			<span>
				<v-icon small>mdi-calendar-range</v-icon>
				<span>{{ formatDate(item.date) }}</span>
			</span>
		</template>
		<template v-slot:item.views="{ item }">
			<span>
				<v-icon small>mdi-eye</v-icon>
				{{ item.views }}
			</span>
		</template>
		<template v-slot:item.comments="{ item }">
			<span>
				<v-icon small>mdi-comment</v-icon>
				{{ item.comments.length }}
			</span>
		</template>
		<template v-slot:item.actions="{ item }">
			<v-dialog
				v-model="dialogEditPost"
				max-width="700px"
				:retain-focus="false"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						icon
						v-bind="attrs"
						v-on="on"
						@click="editItem(item._id)"
					>
						<v-icon class="mr-2"> mdi-pencil </v-icon>
					</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">Редактировать пост</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="editItemName"
										label="Название поста"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-textarea
										v-model="editItemContent"
										no-resize
										label="Содержание поста"
									></v-textarea>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="blue darken-1"
							text
							@click="closeDialogEdit"
						>
							Отмена
						</v-btn>
						<v-btn
							color="blue darken-1"
							text
							:loading="loading"
							:disabled="loading"
							@click="saveDialogEdit"
						>
							Сохранить
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog
				v-model="dialogDeletePost"
				max-width="500px"
				:retain-focus="false"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						icon
						v-bind="attrs"
						v-on="on"
						@click="deleteItem(item._id)"
					>
						<v-icon> mdi-delete </v-icon>
					</v-btn>
				</template>
				<v-card>
					<v-card-title class="headline"
						>Ты уверен, что хочешь удалить это?</v-card-title
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="closeDelete()"
							>Ой, нет!</v-btn
						>
						<v-btn
							color="blue darken-1"
							text
							@click="deleteItemConfirm()"
							><span class="red--text">Удалить</span></v-btn
						>
						<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</template>
	</v-data-table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	layout: 'admin',
	middleware: ['admin-auth'],

	head: {
		title: `Все посты | ${process.env.appName}`,
	},

	async asyncData({ store }) {
		const posts = await store.dispatch('post/FETCH_POSTS_ADMIN');
		return { posts };
	},

	data() {
		return {
			posts: [],
			dialogEditPost: false,
			dialogDeletePost: false,
			footerProps: {
				'items-per-page-text': 'Строк на страницу',
				'items-per-page-all-text': 'Все',
			},
			headers: [
				{
					text: 'Название',
					align: 'start',
					sortable: false,
					value: 'name',
				},
				{
					text: 'Дата',
					value: 'date',
				},
				{
					text: 'Просмотры',
					value: 'views',
				},
				{
					text: 'Комментарии',
					value: 'comments',
				},
				{ text: 'Действия', value: 'actions', sortable: false },
			],
			editItemIndex: 0,
			editItemId: '',
			editItemName: '',
			editItemContent: '',
			loading: false,
		};
	},
	methods: {
		...mapActions({
			removePost: 'post/REMOVE_POST_ADMIN',
			updatePost: 'post/UPDATE_POST_ADMIN',
		}),
		editItem(id) {
			this.editItemId = id;
			this.editItemIndex = this.posts.findIndex((x) => x._id === id);
			this.editItemName = this.posts[this.editItemIndex].name;
			this.editItemContent = this.posts[this.editItemIndex].text;
			this.dialogEditPost = true;
		},
		closeDialogEdit() {
			this.dialogEditPost = false;
		},
		async saveDialogEdit() {
			this.posts[this.editItemIndex].name = this.editItemName;
			this.posts[this.editItemIndex].text = this.editItemContent;
			this.loading = true;

			try {
				const formData = {
					name: this.editItemName,
					text: this.editItemContent,
					id: this.editItemId
				};
				await this.updatePost(formData);
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
			this.dialogEditPost = false;
		},
		deleteItem(id) {
			this.editItemId = id;
			this.editItemIndex = this.posts.findIndex((x) => x._id === id);
			this.dialogDeletePost = true;
		},
		async deleteItemConfirm() {
			try {
				await this.removePost(this.editItemId);
				this.posts = this.posts.filter(
					(p) => p._id !== this.editItemId
				);
				this.dialogDeletePost = false;
			} catch (error) {}
		},
		closeDelete() {
			this.dialogDeletePost = false;
		},

		formatDate(date) {
			return new Date(date).toLocaleString()
		}
	},
};
</script>

<style></style>
