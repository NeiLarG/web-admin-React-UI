export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token.accessToken) {
        return { 'Authorization': 'Bearer ' + user.token.accessToken };
    } else {
        return {};
    }
}
