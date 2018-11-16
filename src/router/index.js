import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TenderingList from '@/components/TenderingList'
import TenderingDetial from '@/components/TenderingDetial'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tendering-list',
      name: 'TenderingList',
      component: TenderingList
    },
    {
      path: '/tendering-detial',
      name: 'TenderingDetial',
      component: TenderingDetial
    }
  ]
})
