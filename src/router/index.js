import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import AdminHome from '../views/admin/AdminHome'
import CreateBid from '../views/admin/CreateBid.vue'
import PersonalInfo from '../views/admin/PersonalInfo'
import ChangePassword from '../views/admin/ChangePassword'
import RegisterUser from '../views/admin/RegisterUser'
import AccountantHome from '../views/accountant/AccountantHome'
import CreateBidComponent from '../views/worker/CreateBid'
import HandleBidsComponent from '../views/admin/HandleBids'
import HandleUserBidsComponent from '../views/admin/HandleUserBids'
import Users from '../views/accountant/Users'
import Logs from '../views/admin/Logs'
import RequestItem from '../views/accountant/RequestItem'
import Accountants from '../views/admin/Accountants'
import AccountantPersonalInfo from '../views/accountant/PersonalInfo'
import AccountantChangePassword from '../views/accountant/ChangePassword'
import WorkerPersonalInfo from '../views/worker/PersonalInfo'
import WorkerChangePassword from '../views/worker/ChangePassword'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminHome,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //},
    role: 'admin'
  },
  {
    path: '/admin/personalInfo',
    name: '/admin/personalInfo',
    component: PersonalInfo,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //},
    role: 'admin'
  },
  {
    path: '/admin/changePassword',
    name: '/admin/changePassword',
    component: ChangePassword,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //},
    role: 'admin'
  },
  {
    path: '/admin/registerUser',
    name: '/admin/registerUser',
    component: RegisterUser,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //},
    role: 'admin'
  },
  {
    path: '/admin/bid/create',
    //name: 'admin',
    component: CreateBid,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/admin/bids/handle',
    //name: 'admin',
    component: HandleBidsComponent,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/admin/bids/user/handle',
    //name: 'admin',
    component: HandleUserBidsComponent,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/admin/accountants',
    //name: 'admin',
    component: Accountants,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/admin/logs',
    //name: 'admin',
    component: Logs,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/worker',
    name: 'worker',
    component: CreateBidComponent,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/accountant',
    //name: 'accountant',
    component: AccountantHome,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/accountant/bid/create',
    //name: 'accountant',
    component: CreateBidComponent,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/accountant/users',
    name: 'accountant',
    component: Users,
    //meta: {
      //requiresAuth: true // Add meta field to indicate protected route
    //}
  },
  {
    path: '/accountant/request/item/:id',
    name: 'Item',
    component: RequestItem
  },
  {
    path: '/accountant/personalInfo',
    //name: 'Item',
    component: AccountantPersonalInfo
  },
  {
    path: '/accountant/changePassword',
    //name: 'Item',
    component: AccountantChangePassword
  },
  {
    path: '/worker/personalInfo',
    //name: 'Item',
    component: WorkerPersonalInfo
  },
  {
    path: '/worker/changePassword',
    //name: 'Item',
    component: WorkerChangePassword
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //localStorage.removeItem('authResponseData')
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    const accountResponse = JSON.parse(localStorage.getItem('accountResponse'))

    if (token) {
      const role = to.path.split('/')[1]
      
      if (accountResponse['role'] == role) {
        // User is authenticated and authorized, proceed to the route
        next()
      } else {
        next(false)
      }
    } else {
      // User is not authenticated, redirect to login
      next('/')
    }
  } else {
    // Non-protected route, allow access
    next()
  }
});

export default router
