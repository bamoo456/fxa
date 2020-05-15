module.exports = {
  purge: {
    content: ['./src/**/*.tsx', './public/index.html'],
    whitelist: [],
  },
  theme: {
    screens: {
      mobileLandscape: '480px',
      tablet: { raw: '(min-width: 768px) and (min-height: 480px)' },
      desktop: '1024px',
      desktopXl: '1441px',
    },
    colors: {
      black: '#000',
      white: '#fff',
      link: {
        default: '#0060df',
        hover: '#0250bb',
        visited: '#b833e1',
        'hover-visited': '#952bb9',
      },
      mozilla: {
        'neon-blue': '#00ffff',
        'lemon-yellow': '#fff44f',
        'warm-red': '#ff4f5e',
        'neon-green': '#54ffbd',
        'dark-purple': '#6e008b',
        'dark-green': '#005e5e',
        'dark-blue': '#00458b',
        'dark-gray': '#959595',
        'light-gray': '#e7e5e2',
      },
      green: {
        50: '#e3fff3',
        100: '#d1ffee',
        200: '#b3ffe3',
        300: '#88ffd1',
        400: '#54ffbd',
        500: '#3fe1b0',
        600: '#2ac3a2',
        700: '#008787',
        800: '#005e5e',
        900: '#08403f',
      },
      blue: {
        50: '#aaf2ff',
        100: '#80ebff',
        200: '#00ddff',
        300: '#00b3f4',
        400: '#0090ed',
        500: '#0060df',
        600: '#0250bb',
        700: '#054096',
        800: '#073072',
        900: '#09204d',
      },
      violet: {
        50: '#e7dfff',
        100: '#d9bfff',
        200: '#cb9eff',
        300: '#c689ff',
        400: '#ab71ff',
        500: '#9059ff',
        600: '#7542e5',
        700: '#592acb',
        800: '#45278d',
        900: '#321c64',
      },
      purple: {
        50: '#f7e2ff',
        100: '#f6b8ff',
        200: '#f68fff',
        300: '#f770ff',
        400: '#d74cf0',
        500: '#b833e1',
        600: '#952bb9',
        700: '#722291',
        800: '#4e1a69',
        900: '#2b1141',
      },
      pink: {
        50: '#ffdef0',
        100: '#ffb4db',
        200: '#ff8ac5',
        300: '#ff6bba',
        400: '#ff4aa2',
        500: '#ff298a',
        600: '#e31587',
        700: '#c60084',
        800: '#7f145b',
        900: '#50134b',
      },
      red: {
        50: '#ffdfe7',
        100: '#ffbdc5',
        200: '#ff9aa2',
        300: '#ff848b',
        400: '#ff6a75',
        500: '#ff4f5e',
        600: '#e22850',
        700: '#c50042',
        800: '#810220',
        900: '#440306',
      },
      orange: {
        50: '#fff4de',
        100: '#ffd5b2',
        200: '#ffb587',
        300: '#ffa266',
        400: '#ff8a50',
        500: '#ff7139',
        600: '#e25920',
        700: '#cc3d00',
        800: '#9e280b',
        900: '#7c1504',
      },
      yellow: {
        50: '#ffffcc',
        100: '#ffff98',
        200: '#ffea80',
        300: '#ffd567',
        400: '#ffbd4f',
        500: '#ffa436',
        600: '#e27f2e',
        700: '#c45a27',
        800: '#a7341f',
        900: '#960e18',
      },
      'light-gray': {
        50: '#ffffff',
        100: '#f9f9fb',
        200: '#f0f0f4',
        300: '#e0e0e6',
        400: '#cfcfd8',
        500: '#bfbfc9',
        600: '#afafba',
        700: '#9f9fad',
        800: '#8f8f9e',
        900: '#80808f',
      },
      'dark-gray': {
        50: '#5b5b66',
        100: '#52525e',
        200: '#4a4a55',
        300: '#42414d',
        400: '#3a3944',
        500: '#32313c',
        600: '#2b2a33',
        700: '#23222b',
        800: '#1c1b22',
        900: '#15141a',
      },
      'marketing-gray': {
        100: '#f9f9fa',
        200: '#ededf0',
        300: '#cdcdd4',
        400: '#b1b1bc',
        500: '#9595a2',
        600: '#7a7a8b',
        700: '#5e5e72',
        800: '#42425a',
        900: '#1f2033',
        990: '#20123a',
      },
      ink: {
        50: '#393473',
        100: '#342f6d',
        200: '#312a64',
        300: '#2e255d',
        400: '#2b2156',
        500: '#291d4f',
        600: '#271948',
        700: '#241541',
        800: '#20123a',
        900: '#1d1133',
      },
    },
  },
  variants: {},
  plugins: [],
};
