import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayout from '../layouts/FrontLayout.vue'
import FrontHomeView from '../views/front/FrontHomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: FrontHomeView,
          meta: {
            title: 'BCcoffee',
            login: false,
            admin: false
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/front/RegisterView.vue'),
          meta: {
            title: 'BCcoffee | 登入及註冊',
            login: false,
            admin: false
          }
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../views/front/AccountView.vue'),
          meta: {
            title: 'BCcoffee | 會員專區',
            login: true,
            admin: false
          }
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/front/NewsView.vue'),
          meta: {
            title: 'BCcoffee | 最新消息',
            login: false,
            admin: false
          }
        },
        {
          path: 'news/:id',
          name: 'newsInfo',
          component: () => import('../views/front/NewsInfoView.vue'),
          meta: {
            title: 'BCcoffee | 消息詳細資訊',
            login: false,
            admin: false
          }
        },
        {
          path: 'qa',
          name: 'qa',
          component: () => import('../views/front/QaView.vue'),
          meta: {
            title: 'BCcoffee | 常見問題',
            login: false,
            admin: false
          }
        },
        {
          path: 'contant',
          name: 'contant',
          component: () => import('../views/front/ContantView.vue'),
          meta: {
            title: 'BCcoffee | 聯絡我們',
            login: false,
            admin: false
          }
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/front/ProductsView.vue'),
          meta: {
            title: 'BCcoffee | 外送訂餐',
            login: false,
            admin: false
          }
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/front/OrderCheckOutView.vue'),
          meta: {
            title: 'BCcoffee | 結帳',
            login: true,
            admin: false
          }
        },
        {
          path: 'aboutus',
          name: 'aboutus',
          component: () => import('../views/front/AboutUsView.vue'),
          meta: {
            title: 'BCcoffee | 關於我們',
            login: false,
            admin: false
          }
        },
        {
          path: 'introduce',
          name: 'introduce',
          component: () => import('../views/front/ProductsIntroduceView.vue'),
          meta: {
            title: 'BCcoffee | 關於我們',
            login: false,
            admin: false
          }
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-home',
          component: () => import('../views/admin/HomeView.vue'),
          meta: {
            title: 'BCcoffee | 管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/ProductsView.vue'),
          meta: {
            title: 'BCcoffee | 商品管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'news',
          name: 'admin-news',
          component: () => import('../views/admin/NewsView.vue'),
          meta: {
            title: 'BCcoffee | 消息管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'code',
          name: 'admin-code',
          component: () => import('../views/admin/CodeView.vue'),
          meta: {
            title: 'BCcoffee | 折扣碼管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'qa',
          name: 'admin-qa',
          component: () => import('../views/admin/QaView.vue'),
          meta: {
            title: 'BCcoffee | 問題管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/OrdersView.vue'),
          meta: {
            title: 'BCcoffee | 訂單管理',
            login: true,
            admin: true
          }
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersView.vue'),
          meta: {
            title: 'BCcoffee | 會員管理',
            login: true,
            admin: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundView,
      meta: {
        title: 'BCcoffee | 404'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'all',
      redirect: '/404'
    }

  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

router.beforeEach(async(to, from, next) => {
  const user = useUserStore()
  if (user.isLogin && (to.path === '/register')) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/register')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
