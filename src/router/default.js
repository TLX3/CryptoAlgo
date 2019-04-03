import HorizontalLayout from 'Container/HorizontalLayout'

// dashboard components
const TradingHistory = () => import('Views/tradeHistory/TradingHistory');
const WebAnalytics = () => import('Views/dashboard/WebAnalytics');
const Stats = () => import('Views/dashboard/Stats');
const Backtesting = () => import('Views/dashboard/Backtesting');
const Marketplace = () => import('Views/dashboard/Marketplace');

// users views
const UserProfile = () => import('Views/users/UserProfile');
const UsersList = () => import('Views/users/UsersList');

const Wizard = () => import('Views/wizard/Wizard');

export default {
   path: '/',
   component: HorizontalLayout,
   redirect: '/dashboard/tradeHistory',
   children: [
      {
         path: '/dashboard/tradeHistory',
         component: TradingHistory,
         meta: {
            requiresAuth: true,
            title: 'message.tradehistory',
            breadcrumb: 'Trade History'
         }
      },
      {
         path: '/dashboard/web-analytics',
         component: WebAnalytics,
         meta: {
            requiresAuth: true,
            title: 'message.charts',
         }
      },
      {
        path: '/dashboard/stats',
        component: Stats,
        meta: {
           requiresAuth: true,
           title: 'message.stats',
           breadcrumb: 'Stats'
        }
     },
     {
        path: '/dashboard/backtesting',
        component: Backtesting,
        meta: {
           requiresAuth: true,
           title: 'message.backtesting',
           breadcrumb: 'Backtesting'
        }
     },
     {
        path: '/dashboard/marketplace',
        component: Marketplace,
        meta: {
           requiresAuth: true,
           title: 'message.marketplace',
           breadcrumb: 'Marketplace'
        }
     },
     {
      path: '/dashboard/wizard',
      component: Wizard,
      meta: {
         requiresAuth: true,
         title: 'message.config',
         breadcrumb: 'Config'
      }
    },
    // users
    {
      path: '/users/user-profile',
      component: UserProfile,
      meta: {
          requiresAuth: true,
          title: 'message.userProfile',
          breadcrumb: 'Users / User Profile'
      }
    },
    {
      path: '/users/users-list',
      component: UsersList,
      meta: {
          requiresAuth: true,
          title: 'message.usersList',
          breadcrumb: 'Users / Users List'
      }
    },
   ]
}
