export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access_token) {
        return { 
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer ' + user.access_token 
        };
    } else {
        return {};
    }
}