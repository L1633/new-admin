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
if (sessionStorage.getItem('pid')) {
  store.commit('set_pid', sessionStorage.getItem('pid'));
}
if (sessionStorage.getItem('hashId')) {
  store.commit('set_hashId', sessionStorage.getItem('hashId'));
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
        requireAuth: false
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
          path: 'info/:type',
          props: true,          
          component: () => import('@/pages/infoBox.vue'),
        },
        {
          path: 'wallet',
          component: () => import('@/pages/myWallet.vue'),
        },
        {
          path: 'course',
          component: () => import('@/pages/course/myCourse.vue'),
        },
        {
          path: 'courseDetail/:id',
          props:true,
          component: () => import('@/pages/course/courseDetail.vue'),
        },
        {
          path: 'editCourse/:id',
          props: true,
          component: () => import('@/pages/course/editCourse.vue'),
        },
        {
          path: 'addcourse',
          component: () => import('@/pages/course/addCourse.vue'),
        },
        {
          path: 'institution',
          component: () => import('@/pages/institution/myInstitutionLayout.vue'),
          children: [
            {
              path: '',
              component: () => import('@/pages/institution/myInstitution.vue'),
            },
            {
              path: 'staff',
              component: () => import('@/pages/institution/myStaff.vue'),
            },
            {
              path: 'student',
              component: () => import('@/pages/institution/myStudent.vue'),
            }
          ]
        },
        {
          path: 'topic',
          component: () => import('@/pages/topic/myTopicLayout.vue'),
          children:[
            {
              path: '',
              component: () => import('@/pages/topic/myTopic.vue'),
            },
            {
              path: 'releaseTopic',
              component: () => import('@/pages/topic/releaseTopic.vue'), 
            }
          ]
        },
        {
          path: 'editTopic/:id',
          props:true,
          component: () => import('@/pages/topic/editTopic.vue'),
        },
        {
          path: 'attention',
          component: () => import('@/pages/myAttention.vue'), 
        },
        // {
        //   path: 'order',
        //   component: () => import('@/pages/myOrder.vue'),
        // },
        {
          path: 'userCenter',
          component: () => import('@/pages/userCenter.vue'), 
        },
        {
          path: 'editUserInfo',
          component: () => import('@/pages/editUserInfo.vue'),
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