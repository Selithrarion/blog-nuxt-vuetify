export const mutations = {};
export const actions = {
	async CREATE_COMMENT({ commit }, formData) {
		try {
			return await this.$axios.$post('/api/comment', formData);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
};
