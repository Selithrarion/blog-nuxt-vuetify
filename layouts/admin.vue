<template>
	<v-app>
		<v-app-bar app flat></v-app-bar>
		<v-navigation-drawer app permanent>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="title"> Панель админа </v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list nav>
				<v-list-item
					v-for="item in items"
					:key="item.title"
					link
					@click="$router.push(item.index)"
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main app transition="fade-transition">
			<v-container>
				<v-row>
					<v-col>
						<nuxt></nuxt>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					title: 'Аналитика',
					icon: 'mdi-view-dashboard',
					index: '/admin',
				},
				{
					title: 'Создать',
					icon: 'mdi-pencil',
					index: '/admin/create',
				},
				{
					title: 'Посты',
					icon: 'mdi-format-list-bulleted',
					index: '/admin/list',
				},
				{
					title: 'Пользователи',
					icon: 'mdi-account-supervisor',
					index: '/admin/users',
				},
				{
					title: 'Выйти',
					icon: 'mdi-logout',
					index: '/admin/logout',
				},
			],
			snackbarErrorMessage: '',
			snackbarError: false,
		};
	},
	computed: {
		error() {
			return this.$store.state.error;
		},
	},
	watch: {
		error(value) {
			this.snackbarErrorMessage = value.response.data.message;
			this.snackbarError = true;
		},
	}
};
</script>
