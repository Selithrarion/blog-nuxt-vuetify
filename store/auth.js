import Cookie from 'cookie';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const state = () => ({
	token: null,
});
const mutations = {
	SET_TOKEN(state, token) {
		state.token = token;
	},
	CLEAR_TOKEN(state) {
		state.token = null;
	},
};
const actions = {
	async LOGIN({ commit, dispatch }, formData) {
		try {
			const { token } = await this.$axios.$post(
				'/api/auth/admin/login',
				formData
			);
			dispatch('SET_TOKEN', token);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	LOGOUT({ commit }) {
		this.$axios.setToken(false);
		Cookies.remove('jwt-token');
		commit('CLEAR_TOKEN');
	},
	SET_TOKEN({ commit }, token) {
		this.$axios.setToken(token, 'Bearer');
		Cookies.set('jwt-token', token);
		commit('SET_TOKEN', token);
	},
	async CREATE_USER({ commit }, formData) {
		try {
			await this.$axios.$post('/api/auth/admin/create', formData);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	AUTO_LOGIN({ dispatch }) {
		const cookieStr = process.browser
			? document.cookie
			: this.app.context.req.headers.cookie;

		const cookies = Cookie.parse(cookieStr || '') || {};
		const token = cookies['jwt-token'];
		if (isJWTValid(token)) {
			dispatch('SET_TOKEN', token);
		} else {
			dispatch('LOGOUT');
		}
	},
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
};

function isJWTValid(token) {
	if (!token) {
		return false;
	}
	const jwtData = jwtDecode(token) || {};
	const exp = jwtData.exp || 0;

	const time = Date.now() / 1000;
	// console.log(time) to do;
	return time < exp;
}
