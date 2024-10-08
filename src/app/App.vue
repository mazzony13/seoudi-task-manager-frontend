<template>
   
   <section>  
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        </div>
    </div>
            <router-view></router-view>
   </section> 
    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        }),
        ...mapState('account', ['status','user'])
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    },

    mounted() {
        if(this.user)
        {
            if(this.user.role =='super-admin')
            {
                window.Echo.channel('user-notification').listen('AdminNotification',(e) => {
                toast.success(e.msg, {
                    autoClose: 10000,
                });
                })
            }else if(this.user.role =='user')
            {
                window.Echo.channel(this.user.uuid).listen('UserNotification',(e) => {
                console.log(1);
                toast.success(e.msg, {
                    autoClose: 10000,
                });
                })
            }
        }
     
  
  }

};
</script>