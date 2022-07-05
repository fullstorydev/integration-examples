import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';
import * as fs from 'fs';

const samples = fs.readdirSync(`${__dirname}/src`).filter(filename => filename.endsWith('.js'));
const options = [];

samples.forEach(filename => {
  // non-minified JS
  options.push({
    input: `src/${filename}`,
    output: {
      file: __dirname + `/dist/${filename}`,
      format: 'iife'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      cleanup(),
    ],
  });

  // minified JS
  options.push({
    input: `src/${filename}`,
    output: {
      file: __dirname + `/dist/${filename.replace('.js', '.min.js')}`,
      format: 'iife'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      terser(),
      cleanup(),
    ],
  });
});

export default options;