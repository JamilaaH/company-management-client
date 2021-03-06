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
    tva:null,
    messages:null,
    step: null,
    userEntreprise : null,
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
      state.userEntreprise = null

    },
    setMessage(state, value) {
      state.messages = value
    },
    setStep(state, value) {
      state.step = value
    }, 
    trueEntreprise (state) {
      state.userEntreprise = true
    },
    falseEntreprise (state) {
      state.userEntreprise = false
    }
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
  
  //récuperer l'entreprise après connexion et voir si elle existe ou non
  getEntreprise: function ( {commit, state}) {
    axios.get('http://127.0.0.1:8000/api/entreprise', {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
        if (response.data.valid == false) {
          commit('falseEntreprise')
        } else if (response.data.valid == true){
          commit('trueEntreprise')
          commit('setEntreprise', response.data.data);
          console.log(state.user)         
        }
      }) 
      .catch(error => console.log(error))
  },
  //modifier mon entreprise (hors données TVA)
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
        commit('setStep', 'non valide') // le stepper ne passe pas à l'étape suivante
      } else if(response.data.valid == true) {
        commit('setStep', "valide") //etape valide
        commit('trueEntreprise') // entreprise existe via le TVA
        commit('setEntreprise', response.data) // on récupére les données
        console.log(response.data);
        
      }
    } )
    .catch(error => console.log(error))
  }, 
  //enregistrer l'entreprise avant d'aller au dashboard
  registerEntreprise: function ({commit, state}, value) {
    axios.post('http://127.0.0.1:8000/api/entreprise/store', value, {
      headers: {
      Authorization: "Bearer " + state.token
      }}).then((response)=> {
        commit('trueEntreprise'); // envoie dans la db
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
  // Valider la tâche faite 
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
  },
  //récupérer les messages
  getMessages: function({state, commit}) {
    axios.get('http://127.0.0.1:8000/api/messages',  {
      headers: {
      Authorization: "Bearer " + state.token
      }
    }).then((response) => {
      console.log('response');
      commit('setMessage', response.data.messages)
    })
    .catch(error => console.log(error))
    
    
  },
  //envoie de message
  sendMessage: function({state, dispatch}, value) {
    axios.post('http://127.0.0.1:8000/api/messages/store', value, {
      headers: {
      Authorization: "Bearer " + state.token
      }
      }).then((response) => {
          dispatch('getMessages');
          console.log(response.data.message);
      }) 
      .catch(error => console.log(error))
  },
  
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
