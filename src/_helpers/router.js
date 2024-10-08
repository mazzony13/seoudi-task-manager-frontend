import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../home/HomePage.vue'
import LoginPage from '../login/LoginPage.vue'
import RegisterPage from '../register/RegisterPage.vue'
import CreateTask from '../views/tasks/TaskCreate.vue'
import EditTask from '../views/tasks/TaskEdit.vue'
import ShowTask from '../views/tasks/TaskShow.vue'

import CreateUser from '../views/users/UserCreate.vue'
import EditUser from '../views/users/UserEdit.vue'
import ShowUser from '../views/users/UserShow.vue'
import ListUser from '../views/users/UserList.vue'


export const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/tasks', component: HomePage , name:'home' },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/:catchAll(.*)', redirect: '/tasks' },
    {
        path: '/tasks/create',
        name: 'CreateTask',
        component: CreateTask
    },
    {
        path: '/tasks/edit/:id',
        name: 'TasktEdit',
        component: EditTask
    },
    {
        path: '/tasks/:id',
        name: 'TaskShow',
        component: ShowTask
    },
    {
        path: '/users',
        name: 'ListUser',
        component: ListUser
    },
    {
        path: '/users/create',
        name: 'CreateUser',
        component: CreateUser
    },
    {
        path: '/users/edit/:id',
        name: 'UsertEdit',
        component: EditUser
    },
    {
        path: '/users/:id',
        name: 'UserShow',
        component: ShowUser
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})