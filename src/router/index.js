import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Book from '../views/admin/Book.vue'
import Login from '../views/admin/Login.vue'
import ViewProduct from '../views/user/ViewProduct.vue'
import Product from '../views/user/Product.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/product',
    name:'Book',
    component:Book
  },
  {
    path:'/viewproduct',
    name:'ViewProduct',
    component:ViewProduct,
    props: true
  },
  {
    path:'/productinfo/:id',
    name:'Product',
    component:Product,
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
