<template>
  <div class="user-edit">
    <SideBar/>
    <div class="content p-4">
      <UserEditComponent />
    </div>
  </div>
</template>

<script>
import UserEditComponent from "./../../components/users/edit/UserEditComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    UserEditComponent,
    SideBar,
  },
};
</script>