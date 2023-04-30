/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom': '4px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2em'
            },
            h2: {
              marginTop: '1em'
            },
            code: {
              margin: 'auto 0.5em',
              padding: '0.1em',
              borderRadius: '4px',
              border: '2px solid #d1d1d1',
              backgroundColor: '#dddddd',
              color: 'black',
            },
            ul: {
              paddingLeft: '1em'
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
