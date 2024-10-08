<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import Sidebar from '../components/partials/SideBar.vue'
</script>
<template>
    <div>
        <Sidebar />

<div class="content p-4">
        <div class="">
            <div class="row">
                <div class="col-md-12">
                    <router-link
                        to="/tasks/create"
                        class="btn s-button p-2 dashboard-widget float-end"
                        v-if="user && user.role=='super-admin'"
                    >
                        Create New Task <i class="fa fa-plus-circle" />
                    </router-link>
                </div>
            </div>
        </div>
        <div>
            <task-list-component />
        </div>
</div>



        <!-- <h1>Hi {{account.user.firstName}}!</h1> -->       
    </div>
</template>

<script>
import { mapState, mapActions,mapGetters } from 'vuex'
import TaskListComponent from "../components/tasks/list/TaskListComponent.vue";

export default {
    computed: {
        ...mapState({
            users: state => state.users.all,
        }),
        ...mapState('account', ['status','user']),
        ...mapGetters(["tasksPaginatedData"])
    },

    components: { TaskListComponent },
    
    created () {
        this.getAllUsers();
        this.fetchAllTasks(1);
    },
    methods: {
        ...mapActions('users',{
            getAllUsers: 'getAll',
            deleteUser: 'delete',
        }),
        ...mapActions(["fetchAllTasks"])
    },
    mounted() {
        if(this.user)
        {
            if(this.user.role =='super-admin')
            {
                window.Echo.channel('user-notification').listen('AdminNotification',(e) => {
                    this.fetchAllTasks(1);
                })
            }else if(this.user.role =='user')
            {
                window.Echo.channel(this.user.uuid).listen('UserNotification',(e) => {
                    this.fetchAllTasks(1);
                })
            }
        }
     
  
  }
};
</script>