import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/skeleton/plugin'
import theme from './src/lib/theme'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [skeleton({ themes: [theme] })]
} satisfies Config
