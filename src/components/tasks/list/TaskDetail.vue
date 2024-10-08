<template>
      <td>{{ task.title }}</td>
      <td>{{ task.creator.name  }}</td>
      <td>{{ task.assignee.name  }}</td>
      <td><span :class="`badge badge-${task.status_class}`">{{ task.status }}</span></td>
      <td>
        <div class="d-flex">
          <router-link
            :to="{ path: '/tasks/'+task.uuid }"
            class="btn s-button mr-2"
            title="Show Task"
          >
            <i class="fa fa-eye" />
          </router-link>

          <router-link
            :to="{ path: '/tasks/edit/'+task.uuid }"
            class="btn s-button mr-2"
            title="Edit Task"
            v-if="user && user.role=='super-admin'"
          >
            <i class="fa fa-pencil" />
          </router-link>
          <button
            class="btn btn-danger mx-2"
            title="Delete Task"
            @click="deleteTaskModal(task.uuid)"
            v-if="user && user.role=='super-admin'"
          >
            <i class="fa fa-trash" />
          </button>
        </div>
      </td>

</template>

<script>
import { mapGetters, mapActions,mapState } from "vuex";

export default {
  name: "TaskDetail",
  props: {
    task: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
      default: 0,
    },
  },


  computed: { 
    ...mapGetters(["isDeleting", "deletedData"]) ,
  ...mapState('account', ['status','user'])
  },

  methods: {
    ...mapActions(["deleteTask", "fetchAllTasks"]),
    deleteTaskModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the task ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deleteTask(id);
            this.fetchAllTasks({
              page: 1,
              search: '',
              assigned_to:'',
              status:''
            });
            this.$swal.fire({
              text: "Success, Task has been deleted.",
              icon: "success",
              position: 'center',
              timer: 1000,
            });
          }
        });
    },

  },
};
</script>
