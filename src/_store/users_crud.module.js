import axios from 'axios';
import { authHeader } from '../_helpers';
const state = () => ({
  users: [],
  userStatuses:null,
  usersPaginatedData: null,
  user: null,
  isUserLoading: false,
  isUserCreating: false,
  createdUserData: null,
  isUserUpdating: false,
  updatedUserData: null,
  isUserDeleting: false,
  deletedUserData: null,
})

const getters = {
  userList: state => state.users,
  usersPaginatedData: state => state.usersPaginatedData,
  user: state => state.user,
  userStatuses: state => state.userStatuses,
  isUserLoading: state => state.isUserLoading,
  isUserCreating: state => state.isUserCreating,
  isUserUpdating: state => state.isUserUpdating,
  createdUserData: state => state.createdUserData,
  createdUserError: state => state.createdUserError,
  updatedUserData: state => state.updatedUserData,
  updatedUserError: state => state.updatedUserError,
  isUserDeleting: state => state.isUserDeleting,
  deletedUserData: state => state.deletedUserData
};

// actions
const actions = {
  async fetchAllUsers({ commit }, query = null) {
    let page = 1;
    let search = '';
    let url = `${import.meta.env.VITE_API_URL}users?page=${page}`;
    if(query !== null){
      page = query?.page || 1;
      search = query?.search || '';
    }
    commit('setUserIsLoading', true);
    
    url = `${import.meta.env.VITE_API_URL}users?search=${search}&page=${page}`;

    await axios.get(url,{
        headers : authHeader()
    })
      .then(res => {
        const users = res.data.data.data;
        const pagination = {
          total: res.data.data.meta.total,  
          per_page: res.data.data.meta.per_page, 
          current_page: res.data.data.meta.current_page, 
          total_pages: res.data.data.meta.last_page 
        }
        res.data.data.pagination = pagination;
        commit('setUsersPaginated', res.data.data);
        commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsLoading', false);
      });
  },

  async fetchDetailUser({ commit }, uuid) {
    commit('setUserIsLoading', true);
    await axios.get(`${import.meta.env.VITE_API_URL}users/${uuid}`,{
        headers : authHeader()
    })
      .then(res => {
        commit('setUserDetail', res.data.data);
        commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsLoading', false);
      });
  },

  async storeUser({ dispatch,commit }, user) {
    commit('setUserIsCreating', true);
    commit('saveNewUser', []);
    await axios.post(`${import.meta.env.VITE_API_URL}users`, user ,{
        headers : authHeader()
    })
      .then(res => {
        commit('saveNewUser', res.data.data);
        commit('newUserError', null); 
        commit('setUserIsCreating', false);
      }).catch(err => {
        commit('newUserError', err.response.data.message ? err.response.data.message : err);        
        commit('setUserIsCreating', false);
      });
  },

  async updateUser({ commit }, user) {
    commit('setUserIsUpdating', true);
    commit('saveUpdatedUser', []);
    commit('updatedUserError', null); 
    await axios.post(`${import.meta.env.VITE_API_URL}users/${user.uuid}?_method=PUT`, user,{
        headers : authHeader()
    })
      .then(res => {
        commit('saveUpdatedUser', res.data.data);
        commit('setUserIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsUpdating', false);
        commit('updatedUserError', err.response.data.message ? err.response.data.message : err); 
      });
  },


  async deleteUser({ commit }, uuid) {
    commit('setUserIsDeleting', true);
    await axios.delete(`${import.meta.env.VITE_API_URL}users/${uuid}`,{
        headers : authHeader()
    })
      .then(res => {
        commit('setDeleteUser', res.data.data.id);
        commit('setUserIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsDeleting', false);
      });
  },

  updateUserInput({ commit }, e) {
    commit('setUserDetailInput', e);
  },

 
  async fetchUserStatus({ commit }) {
    commit('setUserIsLoading', true);
    let url = `${import.meta.env.VITE_API_URL}list-status`;
    await axios.get(url,{
        headers : authHeader()
    })
      .then(res => {
        commit('setStatuses', res.data);
        commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsLoading', false);
      });
  },


}

// mutations
const mutations = {
  setUsers: (state, users) => {
    state.users = users
  },

  setStatuses: (state, userStatuses) => {
    state.userStatuses = userStatuses
  },

  setUsersPaginated: (state, usersPaginatedData) => {
    state.usersPaginatedData = usersPaginatedData
  },

  setUserDetail: (state, user) => {
    state.user = user
  },

  setDeleteUser: (state, id) => {
    state.usersPaginatedData.data.filter(x => x.id !== id);
  },

  setUserDetailInput: (state, e) => {
    let user = state.user;
    user[e.target.name] = e.target.value;
    state.user = user
  },

  saveNewUser: (state, user) => {
    state.users.unshift(user)
    state.createdUserData = user;
  },
  newUserError: (state, error) => {
    state.createdUserError = error;
  },
  

  saveUpdatedUser: (state, user) => {
    state.users.unshift(user)
    state.updatedUserData = user;
  },

  updatedUserError: (state, error) => {
    state.updatedUserError = error;
  },

  setUserIsLoading(state, isUserLoading) {
    state.isUserLoading = isUserLoading
  },

  setStatusIsLoading(state, isUserLoading) {
    state.isUserLoading = isUserLoading
  },

  setUserIsCreating(state, isUserCreating) {
    state.isUserCreating = isUserCreating
  },

  setUserIsUpdating(state, isUserUpdating) {
    state.isUserUpdating = isUserUpdating
  },

  setUserIsDeleting(state, isUserDeleting) {
    state.isUserDeleting = isUserDeleting
  },

}

export const users_crud ={
 // namespaced: true,
  state,
  getters,
  actions,
  mutations
}