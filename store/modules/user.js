const userInfoString = localStorage.getItem('userInfo')
const userInfo = JSON.parse(userInfoString || '{}')
export const state = {
  userId: userInfo.userId || '',
  userName: userInfo.userName || '', dengluemail: userInfo.email || '',
  real_name: userInfo.real_name || '',
  avatar: userInfo.avatar || '',
  token: userInfo.token || '',
  unlook_message_count: userInfo.unlook_message_count || '',
  isAdmin: userInfo.isAdmin || false
}

export const getters = {
  getAvatar(state) {
    return state.avatar
  },
  changeAvatar(state, avatar) {
    state.avatar = avatar
  },
  getUserName(state) {
    return state.userName
  },
  getToken(state) {
    return state.token
  },
  getUserId(state) {
    return state.userId
  },
  getUnlook_message_count(state) {
    return state.unlook_message_count
  },
  clear(state) {
    state.userId = null
    state.userName = null
    state.avatar = null
    state.email = null
    state.real_name = null
    state.token = null
    state.isAdmin = null
    state.unlook_message_count = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
}
