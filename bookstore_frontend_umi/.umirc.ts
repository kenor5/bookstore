import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home' },
    { path: '/login', component: '@/pages/login' },
    { path: '/bookDetail', component: '@/pages/bookDetail' },
    { path: '/cart', component: '@/pages/cart' },
    { path: '/order', component: '@/pages/order' },
    { path: '/profile', component: '@/pages/profile' },
    { path: '/admin', component: '@/pages/admin' },
    { path: '/admin/manageBook', component: '@/pages/admin/manageBook' },
    { path: '/admin/manageOrder', component: '@/pages/admin/manageOrder' },
    { path: '/admin/manageUser', component: '@/pages/admin/manageUser' },
    { path: '/admin/statistics', component: '@/pages/admin/statistics' },
    { path: '/admin/newBook', component: '@/pages/admin/newBook' },
    { path: '/admin/statistics', component: '@/pages/admin/statistics' },

  ],
  fastRefresh: {},
});

