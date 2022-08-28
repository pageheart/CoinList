import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/coinListTable.vue'
import Mark from '../components/coinMarkMain.vue'

Vue.use(VueRouter);

const router = new VueRouter({
	mode:'history', //해쉬값 제거 방식
    routes: [{
        path: '/', 
        redirect: '/home' 
    }, {
        path: '/home',
        component: Main
    }, {
        path: '/mark',
        component: Mark
    }]
});

export default router;