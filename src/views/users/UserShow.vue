<template>
  <div class="user-show">
    <SideBar/>
    <div class="content p-4">
      <UserShowComponent />
    </div>
    
  </div>
</template>

<script>
import UserShowComponent from "../../components/users/show/UserShowComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    UserShowComponent,
    SideBar
  },
};
</script>