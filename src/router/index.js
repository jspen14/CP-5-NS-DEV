import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Profile from '@/components/Profile'
import Newsfeed from '@/components/Newsfeed'
import SignUp from '@/components/signUp'
import Login from'@/components/Login'
import Update from '@/components/Update'
Vue.use(Router)

export default new Router({
  routes: [
	{
	    path: '/',
	    name: 'HomePage',
	    component: HomePage
	},
	{
	    path: '/profile',
	    name: 'Profile',
	    component: Profile
	},
	{
		path: '/Newsfeed',
		name: 'Newsfeed',
		component: Newsfeed
	},
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Update',
    name: 'Update',
    component: Update,
  },
  ]
})
