const getAccessToken = () => {
  return localStorage.getItem("accessToken") || ""
}

const saveAccessToken = (token) => {
  return localStorage.setItem("accessToken", token)
}

export {
  getAccessToken,
  saveAccessToken
}