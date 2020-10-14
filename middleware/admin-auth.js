export default function ({ store, redirect }) {
	if (!store.state.auth.token) {
		redirect('/admin/login?message=login');
	}
}
