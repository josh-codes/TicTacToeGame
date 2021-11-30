const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	darkMode: false,
	purge: [
		'./src/**/*.jsx',
		'./src/**/*.js',
	],
	theme: {
	  extend: {
		keyframes: {
			'drop': {
				'0%': { transform: 'translateY(500px) scale(0.50)', backdropFilter: 'blur(0px)' },
				'60%': { transform: 'translateY(0px) scale(1)', backdropFilter: 'blur(8px)' },
			},
			'wait': {
				'0%': { opacity: '0' },
				'40%': { opacity: '0' },
				'100%': { opacity: '1' },
			},
			'drop-out': {
				'0%': { transform: 'translateY(0px) scale(1)', backdropFilter: 'blur(8px)' },
				'30%': { transform: 'translateY(0px) scale(1)', backdropFilter: 'blur(8px)' },
				'100%': { transform: 'translateY(500px) scale(0.50)', backdropFilter: 'blur(0px)' },
			},
			'wait-out': {
				'0%': { opacity: '1' },
				'60%': { opacity: '0' },
				'100%': { opacity: '0' },
			},
			'size': {
				'0%': { transform: 'scale(1) rotate(10deg)' },
				'50%':  { transform:'scale(1.75) rotate(-10deg)' },
				'100%':  { transform:'scale(1) rotate(10deg)' },
			},
		},
		animation: {
			'drop': 'drop 1s ease-in-out',
			'wait': 'wait 1s ease-in-out',
			'drop-out': 'drop-out 1s ease-in-out',
			'wait-out': 'wait-out 1s ease-in-out',
			'size': 'size 1s ease-in-out infinite',
		},
		fontFamily: {
			'sans': ['outfit'],
		}
	  },
	},
	variants: {},
	plugins: [],
}