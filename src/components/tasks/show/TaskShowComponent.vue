<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Show Task</h6>
      </div>
      <div class="card-body">
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

        <div class="row" v-if="task !== null && !isLoading">
          <div class="col-6 my-1">
            <p><b>Title: </b> {{ task.title }}</p>
          </div>
          <div class="col-6 my-1">
            <p><b>Assigned by: </b> {{ task.creator.name }}</p>
          </div>
          <div class="col-12 my-1">
            <p><b>description: </b> {{ task.description }}</p>
          </div>
        </div>

        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          
          <div v-if="task !== null && !isLoading">
            <div class="form-group row">
              <div class="col-6" v-if="taskStatuses !== null">  
                <label><b>Status :</b></label>
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
            <div class="form-group my-3">
              <router-link
                to="/tasks"
                class="btn btn-secondary mr-2"
              >
                Back
              </router-link>
              <input
                v-if="!isUpdating"
                type="submit"
                class="btn s-button mx-2"
                value="Update Status"
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
  },

  watch: {
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.$swal.fire({
          text: "Success, Task Status has been updated successfully !",
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
      // return false;
      this.updateTask({
        uuid: this.id,
        title: this.task.title,
        assigned_to: this.task.assignee.uuid,
        description: this.task.description,
        status: statusSelect ?  statusSelect :  this.task.status_id ,
      });
    },
    updateTaskInputAction(e) {
      this.updateTaskInput(e);
    },
  },
};
</script>
