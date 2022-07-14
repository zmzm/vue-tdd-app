import api from '@/service/api';

export default {
  SEARCH_USER({ commit }, { username }) {
    return new Promise((resolve, reject) => {
      try {
        api.searchUser(username).then((data) => {
          commit('SET_USER', data);
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
