import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo:JSON.parse(sessionStorage.getItem("userinfo"))
  },
  mutations: {
    SET_TOKEN:(state,token)=>{
        state.token=token
        localStorage.setItem("token",token)
    },
    SET_USERINFO:(state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userinfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO:(state)=>{
      state.token=''
      state.userInfo={}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userinfo",JSON.stringify(''))
    }

  },
  getters:{
    getUser:state=>{
      return  state.userInfo
    }
  },
  actions: {

  },
  modules: {
  }
})
