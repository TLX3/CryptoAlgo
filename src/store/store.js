import Vue from 'vue'
import Vuex from 'vuex'

// modules
import auth from './modules/auth';
import chat from './modules/chat';
import settings from './modules/settings';
import mail from './modules/mail';
import sidebar from './modules/sidebar';
import wizard from './modules/wizard';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        chat,
        settings,
        mail,
        sidebar,
        wizard
    }
})
