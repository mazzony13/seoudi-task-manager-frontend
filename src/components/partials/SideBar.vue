<template>

    <div class="sidebar">
      <p class="sb-logo">
        <img src="../../assets/s-logo-white.png" class="rounded mx-auto mt-2 d-block form-logo"/>
      </p>
      <router-link
        :to="{ path: '/tasks'}"
        title="Tasks"
        :class="[$route.matched.some(({ path }) => path.startsWith('/tasks'))  ? 'active' : '']"
      >
      Tasks
      </router-link>
      <router-link v-if="user && user.role=='super-admin' "
        :to="{ path: '/users'}"
        title="Users"
        :class="[$route.matched.some(({ path }) => path.startsWith('/users'))  ? 'active' : '']"
      >
      Users
      </router-link>
      <router-link
        :to="{ path: '/login'}"
        title="Logout"
      >
      Logout
      </router-link>
    </div>

</template>

<script>
import { mapState } from 'vuex'


export default {
  name: "SideBar",
  computed: {
       ...mapState('account', ['status','user'])
    },
    
  
}
</script>

