<template>
  <div class="task-show">
    <SideBar/>
    <div class="content p-4">
      <TaskShowComponent />
    </div>
    
  </div>
</template>

<script>
import TaskShowComponent from "./../../components/tasks/show/TaskShowComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    TaskShowComponent,
    SideBar
  },
};
</script>