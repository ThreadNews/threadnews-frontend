export function store_user(user, access_token = false) {
  if (access_token) {
    sessionStorage.setItem("access_token", user["access_token"]);
  }
  sessionStorage.setItem("user_name", user["user_name"]);
  sessionStorage.setItem("first_name", user["first_name"]);
  sessionStorage.setItem("last_name", user["last_name"]);
  sessionStorage.setItem("interests", JSON.stringify(user["interests"]));
  sessionStorage.setItem("profile_pic", user["profile_pic"]);
  sessionStorage.setItem("following", JSON.stringify(user["following"]));
  sessionStorage.setItem("followers", JSON.stringify(user["followers"]));
  sessionStorage.setItem("following_count", user["following_count"]);
  sessionStorage.setItem("followers_count", user["followers_count"]);
  sessionStorage.setItem(
    "suggested_follows",
    JSON.stringify(user["suggested_follows"])
  );
}

export function get_user() {
  let user = {
    username: sessionStorage.getItem("username"),
    first_name: sessionStorage.getItem("first_name"),
    last_name: sessionStorage.getItem("last_name"),
    interests: JSON.parse(sessionStorage.getItem("interests")),
    profile_pic: sessionStorage.getItem("profile_pic"),
    following: JSON.parse(sessionStorage.getItem("following")),
    followers: JSON.parse(sessionStorage.getItem("followers")),
    following_count: sessionStorage.getItem("following_count"),
    followers_count: sessionStorage.getItem("followers_count"),
    suggested_follows: JSON.parse(sessionStorage.getItem("suggested_follows")),
  };
  return user;
}

export function get_user_id(){
    return sessionStorage.getItem("user_id");
}

export function get_interests() {
  return JSON.parse(sessionStorage.getItem("interests"));
}
