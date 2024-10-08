import { createStore } from 'vuex'

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { tasks } from './tasks.module';
import { users_crud } from './users_crud.module';

export const store = createStore({
    modules: {
        alert,
        account,
        users,
        tasks,
        users_crud
    }
});