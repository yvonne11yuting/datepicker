/* eslint-disable import/no-extraneous-dependencies */
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sass from 'rollup-plugin-sass';
import image from '@rollup/plugin-image';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import cssnano from 'cssnano';
import filesize from 'rollup-plugin-filesize';

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
};

export default [{
  input: './src/index',
  output: [
    {
      file: './libs/calendar.min.js',
      format: 'es',
      name: 'calendar',
      globals,
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    peerDepsExternal(),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: ['node_modules/**'],
    }),
    sass({
      insert: true,
      processor: (css) => postcss([
        autoprefixer({ grid: 'autoplace' }),
        cssnano,
      ]).process(css, { from: undefined }).then((result) => result.css),
    }),
    image(),
    terser(),
    filesize(),
  ],
  external: ['react', 'react-dom'],
}];
