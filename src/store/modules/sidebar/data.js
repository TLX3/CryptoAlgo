// Sidebar Routers
export const menus = {
	'message.core': [
		{
			action: 'zmdi-view-dashboard',
			title: 'message.dashboard',
			active: true,
			items: [
				{ action: 'zmdi-time-restore', title: 'message.tradehistory', path: '/dashboard/tradeHistory', exact: true },
				{ action: 'zmdi-time-restore', title:'message.mybots', path: '/dashboard/myBots', exact: true},
				{ action: 'zmdi-time-restore', title:'message.exchanges', path: '/dashboard/exchanges', exact: true},
				{ action: 'zmdi-settings', title: 'message.config', path: '/dashboard/wizard', exact: true },
				{ action: 'zmdi-trending-up', title: 'Algorithm Designer', path: '/dashboard/stats', exact: true },
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
