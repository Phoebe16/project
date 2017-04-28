import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import VueResource from 'vue-resource';

import Goods from '../components/goods/goods';
import Ratings from '../components/ratings/ratings';
import Seller from '../components/seller/seller';

import '../common/stylus/index.styl';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  // 配置当v-link元素匹配的路径时需要添加到元素上的class，默认为router-link-active
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
});
