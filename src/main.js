/**
 * App Entry File
 */
import 'babel-polyfill';
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Vue2Dragula } from 'vue2-dragula'
import VueQuillEditor from 'vue-quill-editor'
import wysiwyg from 'vue-wysiwyg'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import AmAngularGauge from 'amcharts3/amcharts/gauge'
import Nprogress from 'nprogress'
import VueI18n from 'vue-i18n'
import VueTour from 'vue-tour'
import fullscreen from 'vue-fullscreen'
import InstantSearch from 'vue-instantsearch'
import VueVideoPlayer from 'vue-video-player';
import Croppa from 'vue-croppa';
import { VueReCaptcha } from 'vue-recaptcha-v3'

// For more options see below
Vue.use(VueReCaptcha, { siteKey: '6LdL9L8UAAAAAKWoc1fxTMoI01sJrw1u4pQCK_Zm' })

// global components
import GlobalComponents from './globalComponents'

// app.vue
import App from './App'

// router
import router from './router'

// themes
import primaryTheme from './themes/primaryTheme';

// store
import { store } from './store/store';

// include script file
import './lib/VuelyScript'

// include all css files
import './lib/VuelyCss'

// messages
import messages from './lang';

//charting
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import VueHighcharts from 'vue-highcharts'
import loadStock from 'highcharts/modules/stock.js'
import stockTheme from './stocktheme'

loadStock(Highcharts)
highchartsMore(Highcharts)
Highcharts.theme = stockTheme
Highcharts.setOptions(Highcharts.theme)
Vue.use(VueHighcharts, {Highcharts})

// navigation guards before each
router.beforeEach((to, from, next) => {
	Nprogress.start()
	// verify user has valid auth token otherwise reroute to login page
	if (to.path !== '/confirm-email' && to.path !== '/login' && to.path !== '/sign-up' && to.path !== '/landing' &&
		(!localStorage.getItem('token') || !localStorage.getItem('uid'))) {
			next('/landing')
			Nprogress.done()
	} 
	else {
		next() // make sure to always call next()!
	}
})

// navigation guard after each
router.afterEach((to, from) => {
	Nprogress.done()
	setTimeout(() => {
		const contentWrapper = document.querySelector(".v-content__wrap");
		if (contentWrapper !== null) {
			contentWrapper.scrollTop = 0;
		}
		const boxedLayout = document.querySelector('.app-boxed-layout .app-content');
		if (boxedLayout !== null) {
			boxedLayout.scrollTop = 0;
		}
		const miniLayout = document.querySelector('.app-mini-layout .app-content');
		if (miniLayout !== null) {
			miniLayout.scrollTop = 0;
		}
	}, 200);
})



// plugins
Vue.use(Vuetify, {
  theme: {
    primary: '#727891',
    secondary: '#29B6F6',
		anyColor: '#0000'
	}
});
Vue.use(InstantSearch);
Vue.use(VueI18n)
Vue.use(AmCharts)
Vue.use(AmSerial)
Vue.use(VueTour)
Vue.use(AmAngularGauge)
Vue.use(Vue2Dragula)
Vue.use(VueQuillEditor)
Vue.use(VueResource)
Vue.use(wysiwyg, {})
Vue.use(VueBreadcrumbs)
Vue.use(Notifications, { velocity })
Vue.use(fullscreen);
Vue.use(GlobalComponents);
Vue.use(VueVideoPlayer);
Vue.use(Croppa);

// Create VueI18n instance with options
const i18n = new VueI18n({
	locale: store.getters.selectedLocale.locale, // set locale
	messages, // set locale messages
})

/* eslint-disable no-new */
new Vue({
	store,
	i18n,
	router,
	render: h => h(App),
	components: { App }
}).$mount('#app')
