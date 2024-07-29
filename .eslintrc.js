module.exports = {
  // 이 ESLint 설정은 이 설정 파일이 있는 디렉토리를 기준으로 모든 하위 디렉토리와 파일에 적용된다.
  root: true,

  // 실행 환경을 정의. 여기서는 브라우저와 Node.js 환경에서 실행되는 코드를 대상으로 한다.
  env: {
    browser: true,
    node: true,
  },

  // TypeScript 코드를 분석하기 위한 파서
  parser: '@typescript-eslint/parser',

  // 파서에 전달되는 옵션들을 정의한다.
  parserOptions: {
    // ECMAScript 버전을 2020(ES11)으로 지정
    ecmaVersion: 2020,
    // 모듈 시스템을 사용하는 코드를 분석하도록 설정
    sourceType: 'module',
    // 타입 정보에 기반한 ESLint 규칙을 사용하기 위해 tsconfig.json 파일의 경로를 지정
    project: './tsconfig.json',
    // tsconfig.json 파일의 위치를 지정. __dirname은 현재 파일의 위치를 나타낸다.
    tsconfigRootDir: __dirname,
    // JSX 문법을 사용할 수 있도록 설정
    ecmaFeatures: {
      jsx: true,
    },
  },

  // ESLint에 추가적인 기능을 제공하는 플러그인들을 명시
  plugins: ['@typescript-eslint', 'prettier'],

  extends: [
    'eslint:recommended', // ESLint의 기본 권장 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript를 위한 권장 규칙
    'plugin:prettier/recommended', // Prettier와 ESLint를 함께 사용하기 위한 설정
    'next/core-web-vitals',
    'prettier',
    'eslint-config-prettier',
  ],

  // 특정 규칙들을 오버라이드하거나 추가하는 섹션
  rules: {
    // React를 사용할 때 'React'를 import 하지 않아도 되게 설정
    'react/react-in-jsx-scope': 0,
    // React Hooks의 의존성 배열을 정확하게 명시하도록 경고
    'react-hooks/exhaustive-deps': 1,
    // TypeScript에서 'any' 타입의 명시적 사용을 허용
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'no-unsafe-optional-chaining': 0,
    'prettier/prettier': 'error',
    'no-unused-vars': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
  },

  // ESLint 규칙에서 사용할 추가적인 설정. 여기서는 React 버전을 자동으로 감지하도록 설정한다.
  settings: {
    react: {
      version: 'detect',
    },
  },

  // ESLint가 파일을 무시하도록 하는 패턴들이다.
  ignorePatterns: ['node_modules/', '.next/', 'dist/', 'webpack.*.js'],
};
