export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.LJqtmglT.js",app:"_app/immutable/entry/app.BNJFtyUP.js",imports:["_app/immutable/entry/start.LJqtmglT.js","_app/immutable/chunks/Do4SMvbH.js","_app/immutable/chunks/MRf_Qtqk.js","_app/immutable/chunks/Bhm-Y5IH.js","_app/immutable/entry/app.BNJFtyUP.js","_app/immutable/chunks/MRf_Qtqk.js","_app/immutable/chunks/DAkr65wy.js","_app/immutable/chunks/D4lM3iSB.js","_app/immutable/chunks/CfJ7ezW9.js","_app/immutable/chunks/Wll1AcyY.js","_app/immutable/chunks/Bhm-Y5IH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/letter/[letter]",
				pattern: /^\/letter\/([^/]+?)\/?$/,
				params: [{"name":"letter","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
