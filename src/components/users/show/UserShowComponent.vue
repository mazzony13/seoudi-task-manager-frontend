<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Show User</h6>
      </div>
      <div class="card-body">
        <div v-if="isUserLoading">
            <div class="text-center">
              <div
                class="spinner-border text-primary"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <br>
              Loading User Details
            </div>
        </div>

        <div class="row" v-if="user !== null && !isUserLoading">
          <div class="col-12 my-1">
            <p><b>Name: </b> {{ user.name }}</p>
          </div>
          <div class="col-12 my-1">
            <p><b>Email : </b> {{ user.email }}</p>
          </div>
      
        </div>
            <div class="form-group my-3">
              <router-link
                to="/users"
                class="btn btn-secondary mr-2"
              >
                Back
              </router-link>
              
            </div>
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
    ...mapGetters(["isUserUpdating", "updatedUserData","userStatuses","user", "isUserLoading"]),
    ...mapState({
            users: state => state.users.all,
        }),       
  },

  watch: {
    updatedUserData: function () {
      if (this.updatedUserData !== null && !this.isUserUpdating) {
        this.$swal.fire({
          text: "Success, User Status has been updated successfully !",
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
    this.fetchDetailUser(this.id);
    this.getAllUsers();
    this.fetchUserStatus();
  },

  mounted() {
    let usr = JSON.parse(localStorage.getItem('user'));
    if(usr.role !='super-admin')
    {
      this.$router.push({ name: "home" });
    }
  },

  methods: {
    ...mapActions([
      "updateUser",
      "updateUserInput",
      "fetchDetailUser",
      "fetchUserStatus"
    ]),
    ...mapActions('users',{
        getAllUsers: 'getAll',
      }),
      
    onSubmit() {
      const { title,assigned,statusSelect ,description } = this.user;
      // return false;
      this.updateUser({
        uuid: this.id,
        title: this.user.title,
        assigned_to: this.user.assignee.uuid,
        description: this.user.description,
        status: statusSelect ?  statusSelect :  this.user.status_id ,
      });
    },
    updateUserInputAction(e) {
      this.updateUserInput(e);
    },
  },
};
</script>
