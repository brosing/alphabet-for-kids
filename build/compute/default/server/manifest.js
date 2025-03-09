const manifest = (() => {
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
		client: {start:"_app/immutable/entry/start.jMbtWfWf.js",app:"_app/immutable/entry/app.DxCN5RZV.js",imports:["_app/immutable/entry/start.jMbtWfWf.js","_app/immutable/chunks/DSOOwl9C.js","_app/immutable/chunks/MRf_Qtqk.js","_app/immutable/chunks/Bhm-Y5IH.js","_app/immutable/entry/app.DxCN5RZV.js","_app/immutable/chunks/MRf_Qtqk.js","_app/immutable/chunks/DAkr65wy.js","_app/immutable/chunks/D4lM3iSB.js","_app/immutable/chunks/CfJ7ezW9.js","_app/immutable/chunks/Wll1AcyY.js","_app/immutable/chunks/Bhm-Y5IH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-9ff52821.js')),
			__memo(() => import('./chunks/1-85417e64.js')),
			__memo(() => import('./chunks/2-ad9b047c.js')),
			__memo(() => import('./chunks/3-e376cd9f.js'))
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

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
