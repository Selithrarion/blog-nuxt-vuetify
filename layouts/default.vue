<template>
	<v-app>
		<v-app-bar app flat>
			<v-tabs centered>
				<v-tab>
					Главная
				</v-tab>
				<v-tab>
					Что-то ещё
				</v-tab>
				<v-tab>
					О нас
				</v-tab>
				<v-tab>
					Помощь
				</v-tab>
				<v-tab @click="$router.push('/admin/login')">
					Панель админа
				</v-tab>
			</v-tabs>
		</v-app-bar>

		<v-main app>
			<v-container>
				<v-row>
					<v-col cols="12" sm="8" class="mx-auto">
							<nuxt></nuxt>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<style>
a {
	text-decoration: none;
}
.text-center {
	text-align: center;
}

</style>
