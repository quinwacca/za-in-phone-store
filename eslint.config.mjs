import {FlatCompat} from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended'
    ],
    plugins: ['prettier', 'jsx-a11y', 'no-only-tests'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          bracketSameLime: false,
          bracketSpacing: false,
          endOfLine: 'auto',
          optionalChaining: true,
          printWidth: 120,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none',
          useTabs: false
        },
        {
          usePrettierrc: false
        }
      ],
      'prefer-const': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      'no-only-tests/no-only-tests': 'error',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn'
    }
  })
]

export default eslintConfig
