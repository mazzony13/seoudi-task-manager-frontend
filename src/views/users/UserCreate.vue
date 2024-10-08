<template>

  <div class="user-create">
    <SideBar/>
    <div class="content p-4">
      <UserCreateComponent />
    </div>
  </div>
</template>

<script>
import UserCreateComponent from "../../components/users/create/UserCreateComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    UserCreateComponent,
    SideBar,
  },
};
</script>
