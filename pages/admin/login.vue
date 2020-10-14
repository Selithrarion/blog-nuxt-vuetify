<template>
	<div class="app-login">
		<h2 class="app-login__title text-center">Войти в панель админа</h2>

		<v-form
			v-model="valid"
			class="app-login__form mt-12"
			@submit.prevent="onSubmit"
		>
			<v-text-field
				v-model="login"
				class="app-login__login"
				placeholder="Логин"
				:rules="rulesLogin"
				required
			></v-text-field>
			<v-text-field
				v-model="password"
				class="app-login__password"
				placeholder="Пароль"
				:rules="rulesPassword"
				type="password"
				required
			></v-text-field>
			<v-row>
				<v-btn
					text
					type="submit"
					class="app-login__btn mt-2 ml-auto"
					:loading="loading"
					:disabled="!valid || loading"
				>
					Войти
				</v-btn>
			</v-row>
		</v-form>

		<v-snackbar
			v-model="snackbarLogin"
			class="app-login__snackbar"
			timeout="2000"
			color="info"
			elevation="4"
			multi-line
			outlined
			top
			light
			transition="slide-y-transition"
		>
			<span>Нужно войти в систему</span>
		</v-snackbar>
		<v-snackbar
			v-model="snackbarLogout"
			class="app-login__snackbar"
			timeout="2000"
			color="success"
			elevation="4"
			multi-line
			outlined
			top
			light
			transition="slide-y-transition"
		>
			<span>Вы вышли из системы</span>
		</v-snackbar>
		<v-snackbar
			v-model="snackbarSession"
			class="app-login__snackbar"
			timeout="2000"
			color="warning"
			elevation="4"
			multi-line
			outlined
			top
			light
			transition="slide-y-transition"
		>
			<span>Время сессии истекло. Пожалуйста войдите заново</span>
		</v-snackbar>

	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	layout: 'empty',
	head: {
		title: `Вход | ${process.env.appName}`,
	},
	data() {
		return {
			login: '',
			password: '',
			valid: false,
			loading: false,
			snackbarLogin: false,
			snackbarLogout: false,
			snackbarSession: false,
			rulesLogin: [(v) => !!v || 'Логин обязателен'],
			rulesPassword: [(v) => !!v || 'Пароль обязателен'],
		};
	},
	mounted() {
		const { message } = this.$route.query;
		switch (message) {
			case 'login':
				this.snackbarLogin = true;
				break;
			case 'logout':
				this.snackbarLogout = true;
				break;
			case 'session':
				this.snackbarSession = true;
				break;
			default:
				break;
		}
	},
	methods: {
		...mapActions({ authLogin: 'auth/LOGIN' }),
		async onSubmit() {
			if (this.valid) {
				this.loading = true;

				try {
					const formData = {
						login: this.login,
						password: this.password,
					};

					await this.authLogin(formData);
					this.$router.push('/admin');
				} catch (error) {
					this.loading = false;
				}
			}
		},
	},
};
</script>

<style scoped></style>
