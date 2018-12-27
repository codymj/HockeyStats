import Vue from 'vue';
import Router from 'vue-router';

import Index from './components/Index.vue';
import GamePage from './components/GamePage.vue';
import TeamPage from './components/TeamPage.vue';
import PlayerPage from './components/PlayerPage.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Index },
        { path: '/game/:id', component: GamePage, props: true },
        { path: '/:team', component: TeamPage, props: true },
        { path: '/player/:id', component: PlayerPage, props: true }
    ]
});
