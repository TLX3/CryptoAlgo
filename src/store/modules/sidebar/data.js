// Sidebar Routers
export const menus = {
	'message.core': [
		{
			action: 'zmdi-view-dashboard',
			title: 'message.dashboard',
			active: true,
			items: [
				{ action: 'zmdi-time-restore', title: 'message.tradehistory', path: '/dashboard/tradeHistory', exact: true },
				{ action: 'zmdi-trending-up', title: 'message.stats', path: '/dashboard/stats', exact: true },
				{ action: 'zmdi-chart', title: 'message.charts', path: '/dashboard/web-analytics', exact: true },
				{ action: 'zmdi-check-all', title: 'message.backtesting', path: '/dashboard/backtesting', exact: true },
				{ action: 'zmdi-store', title: 'message.marketplace', path: '/dashboard/marketplace', exact: true },
				{ action: 'zmdi-settings', title: 'message.config', path: '/dashboard/wizard', exact: true }
			]
		}
	],
	'message.support': [
		{
			action: 'zmdi-book',
			title: 'message.documentation',
			active: false,
			items: null,
			path: '/documentation'
		}
	],
}
