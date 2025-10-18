import { resolve } from 'path';

export default {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      resolve(__dirname, 'tests/e2e/steps/**/*.ts'),
      resolve(__dirname, 'tests/e2e/support/**/*.ts'),
    ],
    format: ['progress'],
    paths: [resolve(__dirname, 'tests/e2e/features/**/*.feature')],
    publishQuiet: true,
    'ts-node': {
      project: resolve(__dirname, 'tsconfig.e2e.json'),
    },
  },
};
