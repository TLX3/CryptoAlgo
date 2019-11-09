import Vue from 'vue'
import Router from 'vue-router'

//routes
import defaultRoutes from './default';

// landing page
const Landing = () => import('Views/landing/Landing');

// session components
const SignUpOne = () => import('Views/session/SignUpOne');
const LoginOne = () => import('Views/session/LoginOne');
const LockScreen = () => import('Views/session/LockScreen');
const ForgotPassword = () => import('Views/session/ForgotPassword');
const ResetPassword = () => import('Views/session/ResetPassword');
const ConfirmEmail = () => import('Views/session/ConfirmEmail')

Vue.use(Router)

export default new Router({
	routes: [
		defaultRoutes,
		{
			path: '/landing',
			component: Landing
		},
		{
			path: '/sign-up',
			component: SignUpOne,
			meta: {
				title: 'message.signUp',
				breadcrumb: 'Session / Sign Up'
			}
		},
		{
			path: '/login',
			component: LoginOne,
			meta: {
				title: 'message.login',
				breadcrumb: 'Session / Login'
			}
		},
		{
			path: '/lock-screen',
			component: LockScreen,
			meta: {
				title: 'Lock Screen',
				breadcrumb: 'Session / Lock Screen'
			}
		},
		{
			path: '/forgot-password',
			component: ForgotPassword,
			meta: {
				title: 'message.forgotPassword',
				breadcrumb: 'Session / Forgot Password'
			}
		},
		{
			path: '/reset-password',
			component: ResetPassword
		},
		{
			path: '/confirm-email',
			component: ConfirmEmail
		}
	]
})
