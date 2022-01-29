import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    token:null,
    task:null,
    entreprise : null,
    tva:null
  },
  mutations: {
    setUser(state, value) {
      state.user = value
    },
    setToken(state, value) {
      state.token = value
    },
    setTask(state, value) {
      state.task = value
    },
    setEntreprise(state, value) {
      state.entreprise = value
    },
    setTVA(state, value) {
      state.tva = value
    },
    clearToken(state) {
      state.user = null,
      state.token= null
    },
  },
  actions: {

  //login
  login: function ( {commit, dispatch}, value) {
    // console.log(value);
    axios
    .post('http://127.0.0.1:8000/api/login', value)
    .then((res) => {
        commit('setToken', res.data.token);
        // state.token = res.data.data.token;
        console.log(res.data);
        dispatch('getUser');
        })
    .catch(error => console.log(error))
  },
  // récupérer les infos de l'utilisateur connecté
  async getUser({state, commit, dispatch}) {
    // console.log(state.token)
    await axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
          commit('setUser', response.data);
          dispatch('getEntreprise')
          // console.log(state.user)
      }) 
      .catch(error => console.log(error))
  },

  //register 
  register: function({commit, dispatch}, value) {
    axios
    .post('http://127.0.0.1:8000/api/register', value)
    .then((res) => {
        commit('setToken', res.data.token);
        // state.token = res.data.data.token;
        console.log(res.data);
        dispatch('getUser');
        })
    .catch(error => console.log(error))


  },

  //déconnexion
  logout: function ( {commit, state}) {
    axios
    .post('http://127.0.0.1:8000/api/logout', {}, {
      headers: {
        Authorization: "Bearer " + state.token
        }  
    })
    .then((res) => {
        commit('clearToken');
        // state.token = res.data.data.token;
        console.log(res.data);
        })
    .catch(error => console.log(error))
  },
  
  getEntreprise: function ( {commit, state}) {
    axios.get('http://127.0.0.1:8000/api/entreprise', {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
          commit('setEntreprise', response.data.data);
          console.log(state.user)
      }) 
      .catch(error => console.log(error))
  },
  editEntreprise: function ( {commit, state}, value) {
    axios.put('http://127.0.0.1:8000/api/entreprise/update', value, {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
          commit('setEntreprise', response.data.data);
          // console.log(state.user)
      }) 
      .catch(error => console.log(error))
  },

  //récupérer entreprise via TVA
  getTVAEntreprise: function ({commit}, value) {
    axios.get('https://controleerbtwnummer.eu/api/validate/BE0'+value+'.json')
    .then((response) => {
      if (response.data.valid == false) {
        console.log("pas d'entreprise")
      } else {
        commit('setTVA', response.data.vatNumber)
        commit('setEntreprise', response.data)
        console.log(response.data);
        // console.log(response.data.vatNumber)
        // console.log(response.data)
        
      }
    } )
    .catch(error => console.log(error))
  }, 
  //enregistrer l'entreprise avant d'aller au dashboard
  registerEntreprise: function ({state}, value) {
    axios.post('http://127.0.0.1:8000/api/storeentreprise', value, {
      headers: {
      Authorization: "Bearer " + state.token
      }}).then((response)=> {
        console.log(response);
      })
      .catch(error=>console.log(error))
  },
  //récuperer les taches de l'entreprise
  getTask: function ( {commit, state}) {
    axios.get('http://127.0.0.1:8000/api/task', {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
          commit('setTask', response.data.taches);
          console.log(state.task)
      }) 
      .catch(error => console.log(error))
  },
  updateTask: function({state, commit}, value) {
    axios.put('http://127.0.0.1:8000/api/task/'+value, {}, {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
          commit('setTask', response.data.taches);
          console.log('mis a jour');
      }) 
      .catch(error => console.log(error))

  }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
