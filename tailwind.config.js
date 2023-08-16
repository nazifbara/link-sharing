/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			base: ['Instrument Sans', 'sans-serif']
		},
		container: {
			padding: '2rem',
			center: true
		},
		extend: {
			colors: {
				primary: {
					base: '#633CFF',
					hover: '#BEADFF',
					light: '#EFEBFF'
				},
				danger: '#FF3939',
				contrast: {
					base: '#737373',
					dark: '#333333'
				},
				border: '#D9D9D9',
				surface: '#FFFFFF',
				body: '#FAFAFA'
			},
			boxShadow: {
				base: '0 0 32px rgba(0, 0, 0, 0.1)'
			},
			dropShadow: {
				primary: '0 0 32px rgba(99, 60, 225, 0.25)'
			}
		}
	},
	plugins: []
};
