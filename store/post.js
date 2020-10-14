const state = () => {};
const mutations = {};
const actions = {
	async FETCH_POSTS_ADMIN({ commit }) {
		try {
			return await this.$axios.$get('/api/post/admin');
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	async REMOVE_POST_ADMIN({ commit }, id) {
		try {
			return await this.$axios.$delete(`/api/post/admin/${id}`);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	async UPDATE_POST_ADMIN({ commit }, { name, text, id }) {
		try {
			return await this.$axios.$put(`/api/post/admin/${id}`, {
				name,
				text,
				id,
			});
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	async CREATE_POST_ADMIN({ commit }, { name, text, image }) {
		try {
			const fd = new FormData();

			fd.append('name', name);
			fd.append('text', text);
			fd.append('image', image, image.name);

			return await this.$axios.$post('/api/post/admin', fd);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},

	async FETCH_POSTS({ commit }) {
		try {
			return await this.$axios.$get(
				'https://iv27u.sse.codesandbox.io/api/post'
			);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	async FETCH_BY_ID({ commit }, id) {
		try {
			return await this.$axios.$get(
				`https://iv27u.sse.codesandbox.io/api/post/${id}`
			);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
	async ADD_VIEW({ commit }, { _id, views }) {
		try {
			return await this.$axios.$put(
				`https://iv27u.sse.codesandbox.io/api/post/add/view/${_id}`,
				{ views }
			);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},

	async GET_ANALYTICS({ commit }) {
		try {
			return await this.$axios.$get(
				'https://iv27u.sse.codesandbox.io/api/post/admin/get/analytics'
			);
		} catch (error) {
			commit('SET_ERROR', error, { root: true });
			throw error;
		}
	},
};

export default {
	state,
	mutations,
	actions,
};
