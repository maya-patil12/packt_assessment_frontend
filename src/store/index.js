import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state: {
    apiUrl: "http://localhost:8000/api/",
    assetUrl: "http://localhost:8000/images/",
    admin:null,
  },
  mutations: {
    setAdminData(state,adminData){
      state.admin=adminData;
      localStorage.setItem('admin', JSON.stringify(adminData));
      localStorage.setItem('admin_id', adminData.user.id);
    },
    clearAdminData () {
      localStorage.removeItem('admin')
      localStorage.removeItem('admin_id')
      location.reload()
    },
  },
  actions: {
      //========== Get Data ==========
      get(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.apiUrl + payload.uri)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },

    //========= Create data ==========
      post(context, payload) {
        return new Promise((resolve, reject) => {
          console.log(payload);
          axios
            .post(this.state.apiUrl + payload.uri, payload.data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(function (response) {
              console.log("added", payload.data);
              resolve(response);
            })
            .catch(function (error) {
              console.log(error);
              reject(error);
            });
        });
      },
       //========= Update Data ============
      patch(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(this.state.apiUrl + payload.uri, payload.data)
          .then(function (response) {
            console.log("patch", payload.data);
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        });
      },
      
      async delete(context, payload) {
        return new Promise((resolve, reject) => {
          axios
            .delete(this.state.apiUrl + payload.uri)
            .then(function (response) {
              resolve(response);
            })
            .catch(function (error) {
              reject(error);
            });
        });
      },
      admin_login ({ commit }, credentials) {
        return axios
          .post(this.state.apiUrl+'login', credentials)
          .then(({ data }) => {
          
          commit('setAdminData', data)
        })
      },
      logout ({ commit }) {
        commit('clearAdminData')
      },
  },
  modules: {
  }
})
