<template>
    <div>
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="card p-5 s-bg animate flip">
                    <img src="../assets/s-logo.png" class="rounded mx-auto d-block form-logo"/>
                    <h2 class="text-primary">Register</h2>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group form-group animate pop delay-1">
                            <label for="name">Name</label>
                            <input type="text" v-model="user.name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !user.name }" />
                            <div v-show="submitted && !user.name" class="invalid-feedback">Name is required</div>
                        </div>
                        <div class="form-group form-group animate pop delay-2">
                            <label for="email">Email</label>
                            <input type="email" v-model="user.email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !user.email }" />
                            <div v-show="submitted && !user.email" class="invalid-feedback">Email is required</div>
                        </div>
                        <div class="form-group form-group animate pop delay-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" v-model="user.password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !user.password }" />
                            <div v-show="submitted && !user.password" class="invalid-feedback">Password is required</div>
                        </div>
                        <div class="form-group form-group animate pop delay-4">
                            <button class="btn s-button" :disabled="status.registering">Register</button>
                            <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            <router-link to="/login" class="btn btn-link">Cancel</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            if (this.user.email && this.user.password && this.user.name) {
                this.register(this.user);
            }
         
        }
    }
};
</script>