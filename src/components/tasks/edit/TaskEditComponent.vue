<template>
  <div class="container">
    <div class="card"  v-if="user && user.role=='super-admin'">
      <div class="card-header">
        <h6>Edit Task</h6>
      </div>
      <div class="card-body">
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div v-if="isLoading">
            <div class="text-center">
              <div
                class="spinner-border text-primary"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <br>
              Loading Task Details
            </div>
          </div>
          <div v-if="task !== null && !isLoading">
            <div class="form-group row">
              <div class="col-6 my-1">
                <label>Title:</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  class="form-control"
                  :value="task.title"
                  @input="updateTaskInputAction"
                />
                <ErrorMessage
                  name="title"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-6" v-if="users.items">  
                <label>Assigned To:</label>
                <Field name="assigned" as="select" v-model="task.assignee.uuid" class="form-control" @change="updateTaskInputAction">
                  <option value="" disabled>Select User to assign task</option>
                  <option v-for="user in users.items.data.data" :key="user.uuid"  :value="user.uuid">{{ user.name }}</option>
                </Field>
                <ErrorMessage
                  name="assigned"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-6" v-if="taskStatuses !== null">  
                <label>Status:</label>
                <Field name="statusSelect" as="select" v-model="task.status_id" class="form-control" @change="updateTaskInputAction">
                  <option value="" disabled>Task Status</option>
                  <option v-for="([key, value]) in Object.entries(taskStatuses)" :key="key"  :value="key">{{ value }}</option>
                </Field>
                <ErrorMessage
                  name="assigned"
                  class="text-capitalize text-danger"
                />
              </div>
            </div>
            <div class="form-group row my-1">
              <div class="col-12">
                <label>Task Details:</label>
                <Field
                  name="description"
                  as="textarea"
                  class="form-control"
                  :value="task.description"
                  @input="updateTaskInputAction"
                />
                <ErrorMessage
                  name="description"
                  class="text-capitalize text-danger"
                />
              </div>
            </div>
            <div class="form-group my-3">
              <router-link
                to="/tasks"
                class="btn btn-secondary mr-2"
              >
                Cancel
              </router-link>
              <input
                v-if="!isUpdating"
                type="submit"
                class="btn s-button mx-2"
                value="Save Update"
              >
              <button
                v-if="isUpdating"
                class="btn s-button"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                Saving...
              </button>
            </div>
          </div>
        </VeeForm>
      </div>
    </div>
    <div class="card p-5" v-else>
      <p>You are not authorized to access this page</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters,mapState } from "vuex";
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Field,
    VeeForm,
    ErrorMessage,
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      assigned: yup.string().required(),
      description: yup.string().required().min(5),
      statusSelect:yup.string().required(),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      id: null,
    };
  },

  computed: {
    ...mapGetters(["isUpdating", "updatedData","taskStatuses","task", "isLoading"]),
    ...mapState({
            users: state => state.users.all,
        }),        
    ...mapState('account', ['status','user'])
  },

  watch: {
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        
        this.$swal.fire({
          text: "Success, Task has been updated successfully !",
          icon: "success",
          position: "center",
          timer: 1000,
        });

        this.$router.push({ name: "home" });
      }
    },
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailTask(this.id);
    this.getAllUsers();
    this.fetchTaskStatus();
  },

  methods: {
    ...mapActions([
      "updateTask",
      "updateTaskInput",
      "fetchDetailTask",
      "fetchTaskStatus"
    ]),
    ...mapActions('users',{
        getAllUsers: 'getAll',
      }),
      
    onSubmit() {
      const { title,assigned,statusSelect ,description } = this.task;
      this.updateTask({
        uuid: this.id,
        title: title,
        assigned_to: assigned ? assigned : this.task.assignee.uuid,
        description: description,
        status: statusSelect ?  statusSelect :  this.task.status_id ,
      });
    },
    updateTaskInputAction(e) {
      this.updateTaskInput(e);
    },
  },
};
</script>
