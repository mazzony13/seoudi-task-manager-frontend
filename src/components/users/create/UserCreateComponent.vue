<template>
  
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Add User</h6>
      </div>
      <div class="card-body">
        <div class="row d-flex justify-content-center align-items-center">
            <div v-if="createdUserError" class="alert alert-danger">{{createdUserError}}</div>
        </div>
        <!-- <form v-on:submit.prevent="onSaveUser" :validation-schema="schema"> -->
        <VeeForm
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <!-- <Form @submit="onSaveUser" :validation-schema="schema"> -->
          <div class="form-group row my-1">
            <div class="col-6">
              <label>Name:</label>
              <Field
                id="name"
                v-model="userData.name"
                name="name"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="name"
                class="text-capitalize text-danger"
              />
            </div>

            <div class="col-6">
              <label>Email:</label>
              <Field
                id="email"
                v-model="userData.email"
                name="email"
                type="text"
                class="form-control"
              />
              <ErrorMessage
                name="email"
                class="text-capitalize text-danger"
              />
            </div>
  
          </div>
          <div class="form-group row my-1">
            <div class="col-6">  
                <label>Role:</label>
                <Field name="role" as="select" v-model="userData.role" class="form-control">
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
                v-model="userData.password"
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
          <div class="form-group">
            <router-link
              to="/users"
              class="btn btn-secondary mr-2"
            >
              Cancel
            </router-link>
            <input
              v-if="!isUserCreating"
              type="submit"
              class="btn s-button mx-2 my-2"
              value="Add User"
            >
            <button
              v-if="isUserCreating"
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


  setup() {
    // Define a validation schema
    const schema = yup.object({
      name: yup.string().required().min(5),
      email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format").required(),
      password: yup.string().required().min(5),
      role:yup.string().required(),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      userData: {},
    };
  },

  computed: { 
    ...mapGetters(["isUserCreating","createdUserData","createdUserError","isUserLoading" ]) ,
    ...mapState('account', ['status','user'])
  },
  mounted() {
    let usr = JSON.parse(localStorage.getItem('user'));
    if(usr.role !='super-admin')
    {
      this.$router.push({ name: "home" });
    }
  },

  watch: {
    createdUserData: function () {
      if (this.createdUserData !== null && !this.isUserCreating) {
        this.$swal.fire({
          text: "Success, User has been added.",
          icon: "success",
          position: "center",
          timer: 1000,
        });

        this.$router.push({ name: "ListUser" });
      }
    },
  },

  methods: {
    ...mapActions(["storeUser"]),

    onSubmit() {
      const { name, email,password, role } = this.userData;
      this.storeUser({
        name: name,
        email: email,
        password: password,
        role:role
      });
    },
  },
};
</script>
