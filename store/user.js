import slug from 'slug';
import UserAPI from '~/plugins/api/user';

export const state = () => ({
  usersCache: {},
  users: [],
});

export const getters = {
  getUser: state => id => state.usersCache[id],
  users: state => state.users,
};

export const mutations = {
  SET_USER(state, user) {
    state.usersCache[user._id] = user;
  },
  REFRESH_USERS(state) {
    state.users = Object.values(state.usersCache);
  },
};

export const actions = {
  async save({ commit }, user) {
    if (!user.name) {
      return;
    }
    if (!user._id) {
      user._id = slug(user.name).toLowerCase();
    }
    const userExists = (await UserAPI.fetchOne(user._id)).data;
    if (!userExists) {
      user = (await UserAPI.create(user)).data;
    } else {
      (await UserAPI.update(user)).data;
    }
    commit('SET_USER', user);
    commit('REFRESH_USERS');
  },

  async fetchAll({ commit }) {
    const users = (await UserAPI.fetchAll()).data;
    for (const user of users) {
      commit('SET_USER', user);
    }
    commit('REFRESH_USERS');
  },
};
