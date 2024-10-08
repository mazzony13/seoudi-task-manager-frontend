<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-sm">
        <h4 class="text-left mb-2">All Users</h4>
      </div>
      <div class="col-sm">
        <input
          type="text"
          class="form-control"
          placeholder="Search Users..."
          @input="searchUsers"
          v-model="query.search"
        />
      </div>
    </div>
    <div class="">
      <div class="" v-if="!isUserLoading">
        <table class="table" v-if="usersPaginatedData !== null && usersPaginatedData.meta.total > 0">
          <thead class="thead-dark">
            <tr>
              <th >Name</th>
              <th >Email</th>
              <th >Role</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(item, index) in usersPaginatedData.data" :key="item.uuid">
                  <user-detail :index="index" :user="item" />      
            </tr>
          </tbody>
        </table>
        <div v-else>
          <p>No Users Found</p>
        </div>

       
      </div>

      <div v-if="isUserLoading" class="text-center mt-5 mb-5">
        Loading User...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
   

    <!-- Insert Pagination Part -->
    <div v-if="usersPaginatedData !== null && usersPaginatedData.meta.total > 0" class="vertical-center align-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="usersPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions,mapState } from "vuex";
import UserDetail from "../list/UserDetail.vue";
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
    UserDetail,
    VPagination,
    Field,
    VeeForm
  },
  computed: { 
    ...mapGetters(["userList", "usersPaginatedData","userStatuses" ,"isUserLoading"]) ,
    ...mapState({
            users: state => state.users.all,
        }),
    ...mapState('account', ['status','user'])    
  },

  methods: {
    ...mapActions(["fetchAllUsers","fetchUserStatus"]),
    ...mapActions('users',{
            getAllUsers: 'getAll',
        }),

    getResults() {
      this.fetchAllUsers(this.query);
    },

    searchUsers() {
      this.fetchAllUsers(this.query);
    },

    showDetails(user) {
    this.$bvModal.show("modal-details");
    this.modalData = user;
  },
  },

  mounted() {
    let usr = JSON.parse(localStorage.getItem('user'));
    if(usr.role !='super-admin')
    {
      this.$router.push({ name: "home" });
    }
  },
  created() {
    this.fetchAllUsers(this.query);
    this.getAllUsers();
    this.fetchUserStatus();
  },
};
</script>
