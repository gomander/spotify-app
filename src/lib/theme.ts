import type { Theme } from '@skeletonlabs/skeleton/themes'

export default {
  "name": "theme",
  "properties": {
    "--type-scale-factor": "1.067",
    "--type-scale-1": "calc(0.75rem * var(--type-scale-factor))",
    "--type-scale-2": "calc(0.875rem * var(--type-scale-factor))",
    "--type-scale-3": "calc(1rem * var(--type-scale-factor))",
    "--type-scale-4": "calc(1.125rem * var(--type-scale-factor))",
    "--type-scale-5": "calc(1.25rem * var(--type-scale-factor))",
    "--type-scale-6": "calc(1.5rem * var(--type-scale-factor))",
    "--type-scale-7": "calc(1.875rem * var(--type-scale-factor))",
    "--type-scale-8": "calc(2.25rem * var(--type-scale-factor))",
    "--type-scale-9": "calc(3rem * var(--type-scale-factor))",
    "--type-scale-10": "calc(3.75rem * var(--type-scale-factor))",
    "--type-scale-11": "calc(4.5rem * var(--type-scale-factor))",
    "--type-scale-12": "calc(6rem * var(--type-scale-factor))",
    "--type-scale-13": "calc(8rem * var(--type-scale-factor))",
    "--base-font-color": "var(--color-surface-950)",
    "--base-font-color-dark": "var(--color-surface-50)",
    "--base-font-family": "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
    "--base-font-size": "inherit",
    "--base-line-height": "inherit",
    "--base-font-weight": "normal",
    "--base-font-style": "normal",
    "--base-letter-spacing": "0em",
    "--heading-font-color": "inherit",
    "--heading-font-color-dark": "inherit",
    "--heading-font-family": "inherit",
    "--heading-font-weight": "bold",
    "--heading-font-style": "normal",
    "--heading-letter-spacing": "inherit",
    "--anchor-font-color": "var(--color-primary-500)",
    "--anchor-font-color-dark": "var(--color-primary-500)",
    "--anchor-font-family": "inherit",
    "--anchor-font-size": "inherit",
    "--anchor-line-height": "inherit",
    "--anchor-font-weight": "inherit",
    "--anchor-font-style": "inherit",
    "--anchor-letter-spacing": "inherit",
    "--anchor-text-decoration": "none",
    "--anchor-text-decoration-hover": "underline",
    "--anchor-text-decoration-active": "none",
    "--anchor-text-decoration-focus": "none",
    "--space-scale-factor": "1",
    "--radii-default": "9999px",
    "--radii-container": "24px",
    "--border-width-default": "2px",
    "--divide-width-default": "1px",
    "--outline-width-default": "1px",
    "--ring-width-default": "2px",
    "--body-background-color": "var(--color-surface-50)",
    "--body-background-color-dark": "var(--color-surface-950)",
    "--color-primary-50": "235 255 223",
    "--color-primary-100": "209 247 198",
    "--color-primary-200": "182 238 174",
    "--color-primary-300": "156 230 149",
    "--color-primary-400": "129 221 125",
    "--color-primary-500": "103 213 100",
    "--color-primary-600": "82 189 80",
    "--color-primary-700": "62 165 60",
    "--color-primary-800": "41 140 40",
    "--color-primary-900": "21 116 20",
    "--color-primary-950": "0 92 0",
    "--color-primary-contrast-dark": "var(--color-primary-950)",
    "--color-primary-contrast-light": "var(--color-primary-50)",
    "--color-primary-contrast-50": "var(--color-primary-950)",
    "--color-primary-contrast-100": "var(--color-primary-950)",
    "--color-primary-contrast-200": "var(--color-primary-950)",
    "--color-primary-contrast-300": "var(--color-primary-950)",
    "--color-primary-contrast-400": "var(--color-primary-950)",
    "--color-primary-contrast-500": "var(--color-surface-950)",
    "--color-primary-contrast-600": "var(--color-surface-950)",
    "--color-primary-contrast-700": "var(--color-surface-950)",
    "--color-primary-contrast-800": "var(--color-surface-950)",
    "--color-primary-contrast-900": "var(--color-primary-50)",
    "--color-primary-contrast-950": "var(--color-primary-50)",
    "--color-secondary-50": "250 180 255",
    "--color-secondary-100": "224 156 240",
    "--color-secondary-200": "198 132 226",
    "--color-secondary-300": "173 109 211",
    "--color-secondary-400": "147 85 197",
    "--color-secondary-500": "121 61 182",
    "--color-secondary-600": "99 49 159",
    "--color-secondary-700": "78 37 136",
    "--color-secondary-800": "56 24 112",
    "--color-secondary-900": "35 12 89",
    "--color-secondary-950": "26 9 66",
    "--color-secondary-contrast-dark": "var(--color-secondary-950)",
    "--color-secondary-contrast-light": "var(--color-secondary-50)",
    "--color-secondary-contrast-50": "var(--color-secondary-contrast-dark)",
    "--color-secondary-contrast-100": "var(--color-secondary-contrast-dark)",
    "--color-secondary-contrast-200": "var(--color-secondary-contrast-dark)",
    "--color-secondary-contrast-300": "var(--color-secondary-contrast-dark)",
    "--color-secondary-contrast-400": "255 255 255",
    "--color-secondary-contrast-500": "255 255 255",
    "--color-secondary-contrast-600": "var(--color-secondary-contrast-light)",
    "--color-secondary-contrast-700": "var(--color-secondary-contrast-light)",
    "--color-secondary-contrast-800": "var(--color-secondary-contrast-light)",
    "--color-secondary-contrast-900": "var(--color-secondary-contrast-light)",
    "--color-secondary-contrast-950": "var(--color-secondary-contrast-light)",
    "--color-tertiary-50": "255 176 251",
    "--color-tertiary-100": "251 145 226",
    "--color-tertiary-200": "247 114 202",
    "--color-tertiary-300": "242 83 177",
    "--color-tertiary-400": "238 52 153",
    "--color-tertiary-500": "234 21 128",
    "--color-tertiary-600": "206 17 108",
    "--color-tertiary-700": "179 13 87",
    "--color-tertiary-800": "151 8 67",
    "--color-tertiary-900": "124 4 46",
    "--color-tertiary-950": "96 0 26",
    "--color-tertiary-contrast-dark": "var(--color-tertiary-950)",
    "--color-tertiary-contrast-light": "var(--color-tertiary-50)",
    "--color-tertiary-contrast-50": "var(--color-tertiary-contrast-dark)",
    "--color-tertiary-contrast-100": "var(--color-tertiary-contrast-dark)",
    "--color-tertiary-contrast-200": "var(--color-tertiary-contrast-dark)",
    "--color-tertiary-contrast-300": "12 12 12",
    "--color-tertiary-contrast-400": "12 12 12",
    "--color-tertiary-contrast-500": "0 0 0",
    "--color-tertiary-contrast-600": "255 255 255",
    "--color-tertiary-contrast-700": "255 255 255",
    "--color-tertiary-contrast-800": "var(--color-tertiary-contrast-light)",
    "--color-tertiary-contrast-900": "var(--color-tertiary-contrast-light)",
    "--color-tertiary-contrast-950": "var(--color-tertiary-contrast-light)",
    "--color-success-50": "221 255 255",
    "--color-success-100": "193 249 242",
    "--color-success-200": "166 242 229",
    "--color-success-300": "138 236 217",
    "--color-success-400": "111 229 204",
    "--color-success-500": "83 223 191",
    "--color-success-600": "66 199 168",
    "--color-success-700": "50 174 145",
    "--color-success-800": "33 150 122",
    "--color-success-900": "17 125 99",
    "--color-success-950": "0 101 76",
    "--color-success-contrast-dark": "var(--color-success-950)",
    "--color-success-contrast-light": "var(--color-success-50)",
    "--color-success-contrast-50": "var(--color-success-contrast-dark)",
    "--color-success-contrast-100": "var(--color-success-contrast-dark)",
    "--color-success-contrast-200": "var(--color-success-contrast-dark)",
    "--color-success-contrast-300": "var(--color-success-contrast-dark)",
    "--color-success-contrast-400": "var(--color-success-contrast-dark)",
    "--color-success-contrast-500": "var(--color-success-contrast-dark)",
    "--color-success-contrast-600": "var(--color-success-contrast-light)",
    "--color-success-contrast-700": "var(--color-success-contrast-light)",
    "--color-success-contrast-800": "var(--color-success-contrast-light)",
    "--color-success-contrast-900": "var(--color-success-contrast-light)",
    "--color-success-contrast-950": "var(--color-success-contrast-light)",
    "--color-warning-50": "255 255 207",
    "--color-warning-100": "252 240 183",
    "--color-warning-200": "249 226 158",
    "--color-warning-300": "246 211 134",
    "--color-warning-400": "243 197 109",
    "--color-warning-500": "240 182 85",
    "--color-warning-600": "214 159 68",
    "--color-warning-700": "188 137 51",
    "--color-warning-800": "161 114 34",
    "--color-warning-900": "135 92 17",
    "--color-warning-950": "109 69 0",
    "--color-warning-contrast-dark": "var(--color-warning-950)",
    "--color-warning-contrast-light": "var(--color-warning-50)",
    "--color-warning-contrast-50": "var(--color-warning-contrast-dark)",
    "--color-warning-contrast-100": "var(--color-warning-contrast-dark)",
    "--color-warning-contrast-200": "var(--color-warning-contrast-dark)",
    "--color-warning-contrast-300": "var(--color-warning-contrast-dark)",
    "--color-warning-contrast-400": "var(--color-warning-contrast-dark)",
    "--color-warning-contrast-500": "var(--color-warning-contrast-dark)",
    "--color-warning-contrast-600": "0 0 0",
    "--color-warning-contrast-700": "0 0 0",
    "--color-warning-contrast-800": "0 0 0",
    "--color-warning-contrast-900": "var(--color-warning-contrast-light)",
    "--color-warning-contrast-950": "var(--color-warning-contrast-light)",
    "--color-error-50": "255 172 138",
    "--color-error-100": "250 142 116",
    "--color-error-200": "246 112 93",
    "--color-error-300": "241 83 71",
    "--color-error-400": "237 53 48",
    "--color-error-500": "232 23 26",
    "--color-error-600": "204 18 21",
    "--color-error-700": "176 14 16",
    "--color-error-800": "149 9 10",
    "--color-error-900": "121 5 5",
    "--color-error-950": "93 0 0",
    "--color-error-contrast-dark": "var(--color-error-950)",
    "--color-error-contrast-light": "var(--color-error-50)",
    "--color-error-contrast-50": "var(--color-error-contrast-dark)",
    "--color-error-contrast-100": "var(--color-error-contrast-dark)",
    "--color-error-contrast-200": "var(--color-error-contrast-dark)",
    "--color-error-contrast-300": "0 0 0",
    "--color-error-contrast-400": "0 0 0",
    "--color-error-contrast-500": "255 255 255",
    "--color-error-contrast-600": "255 255 255",
    "--color-error-contrast-700": "255 255 255",
    "--color-error-contrast-800": "var(--color-error-contrast-light)",
    "--color-error-contrast-900": "var(--color-error-contrast-light)",
    "--color-error-contrast-950": "var(--color-error-contrast-light)",
    "--color-surface-50": "214 228 214",
    "--color-surface-100": "190 204 190",
    "--color-surface-200": "167 180 167",
    "--color-surface-300": "143 156 143",
    "--color-surface-400": "120 132 120",
    "--color-surface-500": "96 108 96",
    "--color-surface-600": "77 87 77",
    "--color-surface-700": "58 66 58",
    "--color-surface-800": "38 45 38",
    "--color-surface-900": "19 24 19",
    "--color-surface-950": "0 3 0",
    "--color-surface-contrast-dark": "var(--color-surface-950)",
    "--color-surface-contrast-light": "var(--color-surface-50)",
    "--color-surface-contrast-50": "var(--color-surface-contrast-dark)",
    "--color-surface-contrast-100": "var(--color-surface-contrast-dark)",
    "--color-surface-contrast-200": "var(--color-surface-contrast-dark)",
    "--color-surface-contrast-300": "var(--color-surface-contrast-dark)",
    "--color-surface-contrast-400": "var(--color-surface-contrast-dark)",
    "--color-surface-contrast-500": "255 255 255",
    "--color-surface-contrast-600": "var(--color-surface-contrast-light)",
    "--color-surface-contrast-700": "var(--color-surface-contrast-light)",
    "--color-surface-contrast-800": "var(--color-surface-contrast-light)",
    "--color-surface-contrast-900": "var(--color-surface-contrast-light)",
    "--color-surface-contrast-950": "var(--color-surface-contrast-light)"
  }
} satisfies Theme
