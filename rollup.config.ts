import {globSync} from 'glob'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {InputOption, RollupOptions} from 'rollup'

import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import {dts} from 'rollup-plugin-dts';

const inputFiles = Object.fromEntries(
	[...globSync('lib/**/*.ts'), ...globSync('lib/**/*.tsx')].map(file => [
		path.relative(
			'lib',
			file.slice(0, file.length - path.extname(file).length)
		),
		fileURLToPath(new URL(file, import.meta.url))
	])
)

export default [
	{
		input: inputFiles,
		output: {
			format: 'es',
			dir: 'dist',
			sourcemap: true,
		},
		plugins: [
			external(),
			commonjs({ extensions: ['.js', '.ts', '.jsx', '.tsx'] }),
			typescript({tsconfig: './tsconfig.json', declarationDir: path.join(__dirname, 'dist/types')}),
		],
	},
	{
		input: inputFiles,
		output: {
			format: 'es',
			dir: 'dist',
		},
		plugins: [dts(),],
	}
] as RollupOptions[]