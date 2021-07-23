import cleanup from 'rollup-plugin-cleanup';

export default [
  {
    input: 'src/optimizely-page-vars.js',
    output: {
      file: __dirname + '/dist/optimizely-page-vars.js',
      format: 'iife'
    },
    plugins: [cleanup()]
  },
]