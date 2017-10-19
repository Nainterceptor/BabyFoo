import ScoreAPI from '~/plugins/api/score';

export const state = () => ({
  scores: [],
});

export const getters = {
  scores: state => state.scores,
};

export const mutations = {
  SET_SCORES(state, scores) {
    state.scores = scores;
  },
  ADD_SCORE(state, score) {
    state.scores.push(score);
  },
};

export const actions = {
  async create({ commit }, score) {
    score = (await ScoreAPI.create(score)).data;
    commit('ADD_SCORE', score);
  },

  async fetchAll({ commit }) {
    const scores = (await ScoreAPI.fetchAll()).data;
    commit('SET_SCORES', scores);
  },
};
