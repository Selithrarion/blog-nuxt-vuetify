// import colors from 'vuetify/es5/util/colors';

export default {
	target: 'server',
	head: {
		titleTemplate: '%s - ' + process.env.npm_package_name,
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: [],
	plugins: ['@/plugins/vue-markdown', '@/plugins/axios'],
	components: true,
	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify', '@nuxtjs/axios'],
	modules: ['@nuxt/http', '@nuxtjs/pwa'],
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			light: true,
			themes: {
				light: {
					primary: '#1976D2',
					secondary: '#424242',
					accent: '#82B1FF',
					error: '#FF5252',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FFC107',
				},
			},
		},
	},
	build: {},
	serverMiddleware: [
		{
			path: '/',
			handler: '~/api/index.js',
		},
	],
	pageTransition: 'fade-transition',
	env: {
		appName: 'Nuxt SSR Blog',
	},
};
