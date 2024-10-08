<template>
 
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.role }}</td>
      <td>
        <div class="d-flex">
          <router-link
            :to="{ path: '/users/'+user.uuid }"
            class="btn s-button mr-2"
            title="Show User"
          >
            <i class="fa fa-eye" />
          </router-link>

          <router-link
            :to="{ path: '/users/edit/'+user.uuid }"
            class="btn s-button mr-2"
            title="Edit User"
          >
            <i class="fa fa-pencil" />
          </router-link>
          <button
            class="btn btn-danger mx-2"
            title="Delete User"
            @click="deleteUserModal(user.uuid)"
          >
            <i class="fa fa-trash" />
          </button>
        </div>
      </td>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserDetail",
  props: {
    user: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
      default: 0,
    },
  },


  computed: { ...mapGetters(["isUserDeleting", "deletedUserData"]) },

  methods: {
    ...mapActions(["deleteUser", "fetchAllUsers"]),
    deleteUserModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the user ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deleteUser(id);
            this.fetchAllUsers({
              page: 1,
              search: '',
              assigned_to:'',
              status:''
            });
            this.$swal.fire({
              text: "Success, User has been deleted.",
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
