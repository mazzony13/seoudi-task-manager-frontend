import axios from 'axios';
import { authHeader } from '../_helpers';
const state = () => ({
  tasks: [],
  taskStatuses:null,
  tasksPaginatedData: null,
  task: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null,
})

const getters = {
  taskList: state => state.tasks,
  tasksPaginatedData: state => state.tasksPaginatedData,
  task: state => state.task,
  taskStatuses: state => state.taskStatuses,
  isLoading: state => state.isLoading,
  isCreating: state => state.isCreating,
  isUpdating: state => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,

  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData
};

// actions
const actions = {
  async fetchAllTasks({ commit }, query = null) {
    let page = 1;
    let search = '';
    let url = `${import.meta.env.VITE_API_URL}tasks?page=${page}`;
    if(query !== null){
      page = query?.page || 1;
      search = query?.search || '';
    }
    commit('setTaskIsLoading', true);
    
    url = `${import.meta.env.VITE_API_URL}tasks?search=${search}&page=${page}&assigned_to=${query.assigned_to??''}&status=${query.status??''}`;

    await axios.get(url,{
        headers : authHeader()
    })
      .then(res => {
        const tasks = res.data.data.data;
        const pagination = {
          total: res.data.data.meta.total,  
          per_page: res.data.data.meta.per_page, 
          current_page: res.data.data.meta.current_page, 
          total_pages: res.data.data.meta.last_page 
        }
        res.data.data.pagination = pagination;
        commit('setTasksPaginated', res.data.data);
        commit('setTaskIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTaskIsLoading', false);
      });
  },

  async fetchDetailTask({ commit }, uuid) {
    commit('setTaskIsLoading', true);
    await axios.get(`${import.meta.env.VITE_API_URL}tasks/${uuid}`,{
        headers : authHeader()
    })
      .then(res => {
        commit('setTaskDetail', res.data.data);
        commit('setTaskIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTaskIsLoading', false);
      });
  },

  async storeTask({ dispatch,commit }, task) {
    commit('setTaskIsCreating', true);
    commit('saveNewTask', []);
    await axios.post(`${import.meta.env.VITE_API_URL}tasks`, task ,{
        headers : authHeader()
    })
      .then(res => {
        commit('saveNewTask', res.data.data);
        commit('setTaskIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTaskIsCreating', false);
      });
  },

  async updateTask({ commit }, task) {
    commit('setTaskIsUpdating', true);
    commit('saveUpdatedTask', []);
    await axios.post(`${import.meta.env.VITE_API_URL}tasks/${task.uuid}?_method=PUT`, task,{
        headers : authHeader()
    })
      .then(res => {
        commit('saveUpdatedTask', res.data.data);
        commit('setTaskIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTaskIsUpdating', false);
      });
  },


  async deleteTask({ commit }, uuid) {
    commit('setTaskIsDeleting', true);
    await axios.delete(`${import.meta.env.VITE_API_URL}tasks/${uuid}`,{
        headers : authHeader()
    })
      .then(res => {
        commit('setDeleteTask', res.data.data.id);
        commit('setTaskIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTaskIsDeleting', false);
      });
  },

  updateTaskInput({ commit }, e) {
    commit('setTaskDetailInput', e);
  },

 
  async fetchTaskStatus({ commit }) {
    commit('setTaskIsLoading', true);
    let url = `${import.meta.env.VITE_API_URL}list-status`;
    await axios.get(url,{
        headers : authHeader()
    })
      .then(res => {
        commit('setStatuses', res.data);
        commit('setTaskIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setTaskIsLoading', false);
      });
  },


}

// mutations
const mutations = {
  setTasks: (state, tasks) => {
    state.tasks = tasks
  },

  setStatuses: (state, taskStatuses) => {
    state.taskStatuses = taskStatuses
  },

  setTasksPaginated: (state, tasksPaginatedData) => {
    state.tasksPaginatedData = tasksPaginatedData
  },

  setTaskDetail: (state, task) => {
    state.task = task
  },

  setDeleteTask: (state, id) => {
    state.tasksPaginatedData.data.filter(x => x.id !== id);
  },

  setTaskDetailInput: (state, e) => {
    let task = state.task;
    task[e.target.name] = e.target.value;
    state.task = task
  },

  saveNewTask: (state, task) => {
    state.tasks.unshift(task)
    state.createdData = task;
  },

  saveUpdatedTask: (state, task) => {
    state.tasks.unshift(task)
    state.updatedData = task;
  },

  setTaskIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setStatusIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setTaskIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setTaskIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setTaskIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

}

export const tasks ={
 // namespaced: true,
  state,
  getters,
  actions,
  mutations
}