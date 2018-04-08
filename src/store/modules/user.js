import { login, logout, superLogout, getInfo, superLogin, getSuperInfo } from '@/api/login'
import { getToken, setToken, removeToken, setName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          setName(data.name)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 超级登录
    SuperLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        superLogin(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          setName(data.name)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          //  commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取超级用户信息
    GetSuperInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSuperInfo(state.token).then(response => {
          const data = response.data
          //  commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          //  commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 超级登出
    SuperLogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        superLogout(state.token).then(() => {
          commit('SET_TOKEN', '')
          //  commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
