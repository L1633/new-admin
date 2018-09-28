import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router);
// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'));
}
if (sessionStorage.getItem('c_id')) {
  store.commit('set_c_id', sessionStorage.getItem('c_id'));
}

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login'),
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register'),
    },
    {
      path: '/authentication',
      name: 'Authentication',
      component: () => import('@/pages/Authentication'),
      meta: {
        requireAuth: true
      }
    },
  
    {
      path: '/institutionForm',
      name: 'InstitutionForm',
      component: () => import('@/pages/InstitutionForm'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/institutionFin',
      name: 'InstitutionFin',
      component: () => import('@/pages/InstitutionFin'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('@/pages/layout/Layout'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '',
          component: () => import('@/pages/dashboard/index.vue'),
        },
        {
          path: 'course',
          component: () => import('@/pages/course/myCourse.vue'),
        },
        {
          path: 'addcourse',
          component: () => import('@/pages/addCourse.vue'),
        },
        {
          path: 'institution',
          component: () => import('@/pages/myInstitution.vue'),
        },
        {
          path: 'topic',
          component: () => import('@/pages/myTopic.vue'),
        },
       
      ]
    },

  ]
})


router.beforeEach((to, from, next) => {
  //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
})

export default router;