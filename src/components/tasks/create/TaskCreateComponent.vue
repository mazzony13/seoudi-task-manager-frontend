<template>
  
  <div class="container">
    <div class="card" v-if="user && user.role=='super-admin'">
      <div class="card-header">
        <h6>Add Task</h6>
      </div>
      <div class="card-body">
        <!-- <form v-on:submit.prevent="onSaveTask" :validation-schema="schema"> -->
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <!-- <Form @submit="onSaveTask" :validation-schema="schema"> -->
          <div class="form-group row my-1">
            <div class="col-6">
              <label>Title:</label>
              <Field
                id="title"
                v-model="task.title"
                name="title"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="title"
                class="text-capitalize text-danger"
              />
            </div>
            <div class="col-6" v-if="users.items">  
              <label>Assigned To:</label>
              <Field name="assigned" as="select" v-model="task.assigned" class="form-control">
                <option value="" disabled>Select User to assign task</option>
                <option v-for="user in users.items.data.data" :key="user.uuid"  :value="user.uuid" >{{ user.name }}</option>
              </Field>
              <ErrorMessage
                name="assigned"
                class="text-capitalize text-danger"
              />
            </div>
            <div class="col-6" v-if="taskStatuses !== null">  
                <label>Status:</label>
                <Field name="status" as="select" v-model="task.status" class="form-control">
                  <option value="" disabled>Task Status</option>
                  <option v-for="([key, value]) in Object.entries(taskStatuses)" :key="key"  :value="key">{{ value }}</option>
                </Field>
                <ErrorMessage
                  name="status"
                  class="text-capitalize text-danger"
                />
              </div>
          </div>
          <div class="form-group row my-1">
            <div class="col-12">
              <label>Task Details:</label>
              <Field
                v-model="task.description"
                name="description"
                as="textarea"
                class="form-control"
              />
              <ErrorMessage
                name="description"
                class="text-capitalize text-danger"
              />
            </div>
          </div>
          <div class="form-group">
            <router-link
              to="/tasks"
              class="btn btn-secondary mr-2"
            >
              Cancel
            </router-link>
            <input
              v-if="!isCreating"
              type="submit"
              class="btn s-button mx-2 my-2"
              value="Add Task"
            >
            <button
              v-if="isCreating"
              class="btn s-button mx-2 my-2"
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
        </VeeForm>
      </div>
    </div>
    <div class="card p-5" v-else>
      <p>You are not authorized to access this page</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters ,mapState } from "vuex";
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";


export default {
  components: {
    Field,
    VeeForm,
    ErrorMessage,
  },

  created () {
        this.getAllUsers();
        this.fetchTaskStatus();
    },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      assigned: yup.string().required(),
      description: yup.string().required().min(5),
      status:yup.string().required(),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      task: {},
    };
  },

  computed: { 
    ...mapGetters(["isCreating","createdData","taskStatuses","isLoading" ]) ,
    ...mapState({
            users: state => state.users.all,
        }),
    ...mapState('account', ['status','user'])

  },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Success, Task has been added.",
          icon: "success",
          timer: 1000,
        });

        this.$router.push({ name: "home" });
      }
    },
  },

  methods: {
    ...mapActions(["storeTask","fetchTaskStatus"]),
    ...mapActions('users',{
            getAllUsers: 'getAll',
        }),
    onSubmit() {
      const { title, assigned,status, description } = this.task;
      this.storeTask({
        title: title,
        assigned_to: assigned,
        description: description,
        status:status
      });
    },
  },
};
</script>
