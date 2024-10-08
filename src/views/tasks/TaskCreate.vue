<template>

  <div class="task-create">
    <SideBar/>
    <div class="content p-4">
      <TaskCreateComponent />
    </div>
  </div>
</template>

<script>
import TaskCreateComponent from "../../components/tasks/create/TaskCreateComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    TaskCreateComponent,
    SideBar,
  },
};
</script>
