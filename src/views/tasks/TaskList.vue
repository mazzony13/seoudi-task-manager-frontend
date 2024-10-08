<template>
  <div class="task-list">
    <SideBar/>
    <TaskListComponent />
  </div>
</template>

<script>
import TaskListComponent from "./../../components/tasks/list/TaskListComponent";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    TaskListComponent,
    SideBar,
  },
};
</script>
