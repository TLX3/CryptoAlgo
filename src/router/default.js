import Full from 'Container/Full'

// dashboard components
const TradingHistory = () => import('Views/tradeHistory/TradingHistory');
const Stats = () => import('Views/dashboard/Stats');
const Marketplace = () => import('Views/dashboard/Marketplace');
const MyBots = () => import('Views/bots/MyBots');
const Management = () => import('Views/exchanges/Management')
// users views
const UserProfile = () => import('Views/users/UserProfile');
const UsersList = () => import('Views/users/UsersList');

const Wizard = () => import('Views/wizard/Wizard');

export default {
   path: '/',
   component: Full,
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
        path: '/dashboard/myBots',
        component: MyBots,
        meta: {
          requiresAuth: true,
          title: 'message.mybots',
          breadcrumb: 'My Bots'
        }
      },
      {
        path: '/dashboard/exchanges',
        component: Management,
        meta: {
          requiresAuth: true,
          title: 'message.exchanges',
          breadcrumb: 'My Exchanges'
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
