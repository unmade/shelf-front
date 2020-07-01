export function getUser(state) {
    return state.user;
}


export function getUsername(state) {
    const user = getUser(state).user;
    return user && user.username;   
}
