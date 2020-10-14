<template>
	<v-app>
		<v-main app transition="fade-transition">
			<v-container>
				<v-row>
					<v-col cols="12" sm="4" class="mx-auto">
						<v-snackbar
							v-model="snackbarError"
							color="error"
							timeout="3000"
							elevation="4"
							multi-line
							top
							light
							transition="slide-y-transition"
						>
							<span class="white--text">{{
								snackbarErrorMessage
							}}</span>
						</v-snackbar>
						<nuxt class="pa-4"></nuxt>
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
	},
};
</script>

<style scoped></style>
