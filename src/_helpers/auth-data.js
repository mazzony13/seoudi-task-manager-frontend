let user = JSON.parse(localStorage.getItem('user'));
let data = {}
if (user && user.access_token) {
    data =  { 
        role:user.role,
        name:user.name
    };
} 

export const authData = data;