import HorizontalLayout from 'Container/HorizontalLayout'

// dashboard components
const TradeHistory = () => import('Views/dashboard/TradeHistory');
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
         component: TradeHistory,
         meta: {
            requiresAuth: true,
            title: 'Trade History',
            breadcrumb: 'Trade History'
         }
      },
      {
         path: '/dashboard/web-analytics',
         component: WebAnalytics,
         meta: {
            requiresAuth: true,
            title: 'Charts',
         }
      },
      {
        path: '/dashboard/stats',
        component: Stats,
        meta: {
           requiresAuth: true,
           title: 'Stats',
           breadcrumb: 'Stats'
        }
     },
     {
        path: '/dashboard/backtesting',
        component: Backtesting,
        meta: {
           requiresAuth: true,
           title: 'Backtesting',
           breadcrumb: 'Backtesting'
        }
     },
     {
        path: '/dashboard/marketplace',
        component: Marketplace,
        meta: {
           requiresAuth: true,
           title: 'Marketplace',
           breadcrumb: 'Marketplace'
        }
     },
     {
      path: '/dashboard/wizard',
      component: Wizard,
      meta: {
         requiresAuth: true,
         title: 'Config',
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
