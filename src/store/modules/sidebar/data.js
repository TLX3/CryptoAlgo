// Sidebar Routers
export const menus = {
	'General': [
		{
			action: 'zmdi-view-dashboard',
			title: 'Dashboard',
			active: true,
			items: [
				{ action: 'zmdi-time-restore', title: 'Trade History', path: '/dashboard/tradeHistory', exact: true },
				{ action: 'zmdi-trending-up', title: 'Stats', path: '/dashboard/stats', exact: true },
				{ action: 'zmdi-chart', title: 'Charts', path: '/dashboard/web-analytics', exact: true },
				{ action: 'zmdi-check-all', title: 'Backtesting', path: '/dashboard/backtesting', exact: true },
				{ action: 'zmdi-store', title: 'Marketplace', path: '/dashboard/marketplace', exact: true },
				{ action: 'zmdi-settings', title: 'Config', path: '/dashboard/wizard', exact: true }
			]
		}
	],
	'Support': [
		{
			action: 'zmdi-book',
			title: 'Documentation',
			active: false,
			items: null,
			path: '/documentation'
		}
	],
}
