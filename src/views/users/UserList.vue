<template>
  <div class="user-list">
    <SideBar/>
    <div class="content p-4">
      <div class="">
          <div class="row">
              <div class="col-md-12">
                  <router-link
                      to="/users/create"
                      class="btn s-button p-2 dashboard-widget float-end"
                  >
                      Create New User <i class="fa fa-plus-circle" />
                  </router-link>
              </div>
          </div>
      </div>
      <UserListComponent />
    </div>
  </div>
</template>

<script>
import UserListComponent from "./../../components/users/list/UserListComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    UserListComponent,
    SideBar,
  },
};
</script>
