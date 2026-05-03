/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['"Nunito Variable"', 'system-ui', 'sans-serif'],
			},
		}
	},
	plugins: [],
};
