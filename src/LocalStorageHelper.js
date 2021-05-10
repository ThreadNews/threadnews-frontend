export function store_user(user,access_token=true){
    if (access_token){
        sessionStorage.setItem('access_token',user['access_token'])
    }
    sessionStorage.setItem('username', user['username'])
    sessionStorage.setItem('first_name', user['first_name'])
    sessionStorage.setItem('last_name', user['last_name'])
    sessionStorage.setItem('interests',JSON.stringify(user['interests']))
    sessionStorage.setItem('profile_pic', user['profile_pic'])
    sessionStorage.setItem('following', user['following'])
    sessionStorage.setItem('followers', user['followers'])
    sessionStorage.setItem('following_count', user['following_count'])
    sessionStorage.setItem('followers_count', user['followers_count'])
    sessionStorage.setItem('suggested_follows', JSON.stringify(user['suggested_follows']))

}


export function get_user(){
    let user = {
        
    username:sessionStorage.getItem('username'),
    first_name: sessionStorage.getItem('first_name' ),
    last_name: sessionStorage.getItem('last_name'),
    interests: JSON.parse(sessionStorage.getItem('interests')),
    profile_pic: sessionStorage.getItem('profile_pic'),
    following: sessionStorage.getItem('following'),
    followers: sessionStorage.getItem('followers'),
    following_count:sessionStorage.getItem('following_count'),
    followers_count :sessionStorage.getItem('followers_count'),
    suggested_follows: sessionStorage.getItem('suggested_follows'),
    }
    return user
}

