<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-sm">
        <h4 class="text-left mb-2">All Tasks</h4>
      </div>
      <div class="col-sm">
        <input
          type="text"
          class="form-control"
          placeholder="Search Tasks..."
          @input="searchTasks"
          v-model="query.search"
        />
      </div>
      <div class="col-sm" v-if="users.items && user && user.role=='super-admin' ">
        <Field name="assigned" as="select" v-model="query.assigned_to" class="form-control" @change="searchTasks">
                <option value="">Search by assigned users</option>
                <option v-for="user in users.items.data.data" :key="user.uuid"  :value="user.uuid" >{{ user.name }}</option>
              </Field>
      </div>
      <div class="col-sm" v-if="taskStatuses !== null">
        <Field name="assigned" as="select" v-model="query.status" class="form-control" @change="searchTasks">
            <option value="">Task Status</option>
            <option v-for="([key, value]) in Object.entries(taskStatuses)" :key="key"  :value="key">{{ value }}</option>
        </Field>
      </div>
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <table class="table table-responsive-sm" v-if="tasksPaginatedData !== null && tasksPaginatedData.meta.total > 0">
          <thead class="thead-dark">
            <tr>
              <th >Title</th>
              <th >Assigned By</th>
              <th >Assigned To</th>
              <th >Status</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(item, index) in tasksPaginatedData.data" :key="item.uuid">
                  <task-detail :index="index" :task="item" />      
            </tr>
          </tbody>
        </table>
    
        <div v-else>
          <p>No Tasks Found</p>
        </div>
      </div>

      <div v-if="isLoading" class="text-center mt-5 mb-5">
        Loading Task...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
    <div v-if="tasksPaginatedData !== null && tasksPaginatedData.meta.total > 0" class="vertical-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="tasksPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions,mapState } from "vuex";
import TaskDetail from "../list/TaskDetail.vue";
import VPagination from "@hennge/vue3-pagination";
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";


export default {
  data() {
    return {
      query: {
        page: 1,
        search: "",
        assigned_to:'',
        status:''
      },
    };
  },
  components: {
    TaskDetail,
    VPagination,
    Field,
    VeeForm
  },
  computed: { 
    ...mapGetters(["taskList", "tasksPaginatedData","taskStatuses" ,"isLoading"]) ,
    ...mapState({
            account: state => state.user,
            users: state => state.users.all,
        }),
      ...mapState('account', ['status','user'])
  },

  methods: {
    ...mapActions(["fetchAllTasks","fetchTaskStatus"]),
    ...mapActions('users',{
            getAllUsers: 'getAll',
        }),

    getResults() {
      this.fetchAllTasks(this.query);
    },

    searchTasks() {
      this.fetchAllTasks(this.query);
    },

  },

  created() {
    this.fetchAllTasks(this.query);
    this.getAllUsers();
    this.fetchTaskStatus();
  },

  
};
</script>
