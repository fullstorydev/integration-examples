import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import * as fs from 'fs';

const samples = fs.readdirSync(`${__dirname}/src`).filter(filename => filename.endsWith('.js'));
const options = samples.map(filename => {
  return {
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
      cleanup()],
  };
});

export default options;