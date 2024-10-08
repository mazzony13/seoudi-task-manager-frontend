<template>
  <div class="task-edit">
    <SideBar/>
    <div class="content p-4">
      <TaskEditComponent />
    </div>
  </div>
</template>

<script>
import TaskEditComponent from "./../../components/tasks/edit/TaskEditComponent.vue";
import SideBar from '../../components/partials/SideBar.vue'

export default {
  components: {
    TaskEditComponent,
    SideBar,
  },
};
</script>