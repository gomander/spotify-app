import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/skeleton/plugin'
import { cerberus } from '@skeletonlabs/skeleton/themes'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [skeleton({ themes: [cerberus] })]
} satisfies Config
