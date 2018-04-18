import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

 const getAuthHeader = () => {
   return { headers: {'Authorization': localStorage.getItem('token')}};
}
export default new Vuex.Store({
  state: {
    user: {},
    age: '',
    //loggedIn: false,
    token: '',
    loginError: '',
    registerError: '',
    //profileInfo: {},
    post_feed: [],
    dummy_inc: [],
  },
  getters: {
    user: state => state.user,
    age: state => state.age,
    //loggedIn: state => state.loggedIn,
    getToken: state => state.token,
    loggedIn: state => {
      if (state.token === '')
       return false;
      return true;
    },
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    post_feed: state => state.post_feed,
    //dummy_inc: state => state.dummy_inc,
    //profileInfo: state => state.profileInfo,

  },
  mutations: {
    setUser (state, user) {
      state.user = user;
      //console.log(this.state.user);
    },
    // setLogin (state, status) {
    //   state.loggedIn = status;
    // },
    setToken (state, token) {
      state.token = token;
      if (token === '')
	     localStorage.removeItem('token');
      else
	     localStorage.setItem('token', token)
    },
    setAge (state, age){
      state.age = age;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, post_feed) {
      state.post_feed = post_feed;
    },
    setFeed2 (state){
      state.post_feed = state.post_feed;
    }
  },
  actions: {
    // Initialize //
    initialize(context) {
      let token = localStorage.getItem('token');
        if(token) {
       // see if we can use the token to get my user account
       axios.get("/api/me",getAuthHeader()).then(response => {
         context.commit('setToken',token);
         context.commit('setUser',response.data.user);
       }).catch(err => {
         // remove token and user from state
         localStorage.removeItem('token');
         context.commit('setUser',{});
         context.commit('setToken','');
       });
      }
    },
    // Registration, Login //
    register(context,user) {

      axios.post("/api/users",user).then(response => {
      	context.commit('setUser', response.data.user);
      	//context.commit('setLogin',true);
        context.commit('setToken',response.data.token);
      	context.commit('setRegisterError',"");
      	context.commit('setLoginError',"");
      }).catch(error => {
      	context.commit('setLoginError',"");
      	//context.commit('setLogin',false);
        context.commit('setUser',{});
        context.commit('setToken','');
      	if (error.response) {
      	  if (error.response.status === 403)
      	    context.commit('setRegisterError',"That email address already has an account.");
      	  else if (error.response.status === 409)
      	    context.commit('setRegisterError',"That user name is already taken.");
      	  return;
      	}
      	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },

    login(context,user) {
      console.log("s");
      axios.post("/api/login",user).then(response => {
      	context.commit('setUser', response.data.user);
      	//context.commit('setLogin',true);
        context.commit('setToken',response.data.token);
      	context.commit('setRegisterError',"");
      	context.commit('setLoginError',"");
        context.commit('setAge', response.data.age);
      }).catch(error => {
        context.commit('setUser',{});
        context.commit('setToken','');
      	context.commit('setRegisterError',"");
      	if (error.response) {
      	  if (error.response.status === 403 || error.response.status === 400)
      	    context.commit('setLoginError',"Invalid login.");
      	    context.commit('setRegisterError',"");
      	  return;
      	}
      	context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setToken','');
      //context.commit('setLogin',false);
    },
    profileInfo(context, user) {
      axios.get("/api/users/" + context.state.user.id).then(response => {
        context.commit('setUser', response.data.users);
      }).catch(err => {
        console.log("getProfileInfo failed:",err);
      });
    },
    addPost(context,post) {
      axios.post("/api/users/" + context.state.user.user_id + "/posts",post).then(response => {
      	return context.dispatch('getPosts');
      }).catch(err => {
      	console.log("addPost failed:",err);
      });
    },

    // dummyFun(context){
    //   console.log("in dummyfun");
    //   return axios.get('/api/dummy').then(response => {
    //     context.commit('setDummy',response.data.dummy_inc)
    //   }).catch(err => {
    //     console.log("dummyFun failed: ", err);
    //   });
    // },

    getPosts(context){
      console.log("Am i in the store getPosts?");
      return axios.get('/api/posts').then(response => {

        context.commit('setFeed',response.data.posts);
      }).catch(err => {
        console.log("getFeed Failed: ", err);
      });
    },

  }
});
