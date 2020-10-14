<template>
	<div class="app-users px-4">
		<h2 class="app-users__title">Создать пользователя</h2>
		<v-form
			v-model="valid"
			class="app-users__form mt-12"
			@submit.prevent="onSubmit"
		>
			<v-text-field
				v-model="login"
				class="app-users__login"
				placeholder="Логин"
				:rules="rulesLogin"
				required
			></v-text-field>
			<v-text-field
				v-model="password"
				class="app-users__password"
				placeholder="Пароль"
				:rules="rulesPassword"
				type="password"
				required
			></v-text-field>
			<v-row>
				<v-btn
					text
					type="submit"
					class="app-users__btn mt-2"
					:loading="loading"
					:disabled="loading || !valid"
				>
					Создать
				</v-btn>
			</v-row>
		</v-form>
		<v-snackbar
			v-model="snackbarCreateSuccess"
			class="app-users__snackbar"
			timeout="2000"
			color="success"
			elevation="4"
			multi-line
			outlined
			top
			light
			transition="slide-y-transition"
		>
			<span>Пользователь успешно создан</span>
		</v-snackbar>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	head: {
		title: `Создать пользователя | ${process.env.appName}`,
	},
	data() {
		return {
			login: '',
			password: '',
			valid: false,
			loading: false,
			rulesLogin: [(v) => !!v],
			rulesPassword: [(v) => !!v],
			snackbarCreateSuccess: false,
		};
	},
	methods: {
		...mapActions({
			createUser: 'auth/CREATE_USER',
		}),

		async onSubmit() {
			if (this.valid) {
				this.loading = true;
				try {
					const formData = {
						login: this.login,
						password: this.password,
					};
					await this.createUser(formData);
					this.snackbarCreateSuccess = true;
					this.login = '';
					this.password = '';
					this.loading = false;
					
				} catch (error) {
					this.loading = false;
				}
			}
		},
	},
};
</script>

<style scoped>
.app-users__form {
	width: 600px;
}
</style>
