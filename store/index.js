const state = () => ({
	error: null,
});
const mutations = {
	SET_ERROR(state, error) {
		state.error = error;
	},
	CLEAR_ERROR(state) {
		state.error = null;
	},
};
const actions = {
	nuxtServerInit({ dispatch }) {
		dispatch('auth/AUTO_LOGIN');
	},
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
};
