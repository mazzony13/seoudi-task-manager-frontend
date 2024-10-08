<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Edit User</h6>
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-center align-items-center">
            <div v-if="updatedUserError" class="alert alert-danger">{{updatedUserError}}</div>
        </div>
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
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
          <div v-if="user !== null && !isUserLoading">
            <div class="form-group row">
              <div class="col-6 my-1">
                <label>Name:</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  :value="user.name"
                  @input="updateUserInputAction"
                />
                <ErrorMessage
                  name="name"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-6 my-1">
                <label>Email:</label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  class="form-control"
                  :value="user.email"
                  @input="updateUserInputAction"
                />
                <ErrorMessage
                  name="name"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-6" >  
                <label>Role:</label>
                <Field name="role" as="select" v-model="user.role" class="form-control">
                  <option value="super-admin">Super Admin</option>
                  <option value="user">User</option>
                </Field>
                <ErrorMessage
                  name="role"
                  class="text-capitalize text-danger"
                />
              </div>
              <div class="col-6">
              <label>Password:</label>
              <Field
                id="password"
                name="password"
                type="password"
                class="form-control"
              />
              <ErrorMessage
                name="password"
                class="text-capitalize text-danger"
              />
            </div>
          
            </div>
  
            <div class="form-group my-3">
              <router-link
                to="/users"
                class="btn btn-secondary mr-2"
              >
                Cancel
              </router-link>
              <input
                v-if="!isUserUpdating"
                type="submit"
                class="btn s-button mx-2"
                value="Save Update"
              >
              <button
                v-if="isUserUpdating"
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
      name: yup.string().required().min(5),
      email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format").required(),
      password: yup.string().min(5),
      role:yup.string().required(),
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
    ...mapGetters(["isUserUpdating", "updatedUserData","user", "isUserLoading","updatedUserError"]),     
  },

  watch: {
    updatedUserData: function () {
      if (this.updatedUserData !== null && !this.isUserUpdating) {
        
        this.$swal.fire({
          text: "Success, User has been updated successfully !",
          icon: "success",
          position: "center",
          timer: 1000,
        });

        this.$router.push({ name: "ListUser" });
      }
    },
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailUser(this.id);
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
    ]),
    ...mapActions('users',{
        getAllUsers: 'getAll',
      }),
      
    onSubmit() {
      const { name,email,password ,role } = this.user;
      this.updateUser({
        uuid: this.id,
        name: name,
        email: email,
        password: password,
        role: role ?  role :  this.user.role ,
      });
    },
    updateUserInputAction(e) {
      this.updateUserInput(e);
    },
  },
};
</script>
