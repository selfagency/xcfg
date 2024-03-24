# xcfg

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/selfagency/xcfg/blob/master/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/selfagency/xcfg.svg)](https://github.com/selfagency/xcfg/issues)
[![Known Vulnerabilities](https://snyk.io/test/github/selfagency/xcfg/badge.svg)](https://snyk.io/test/github/selfagency/xcfg)

Cross-platform config file management made easy. Works great with command-line tools and [Electron](https://electron.atom.io) apps. Originally written in CommonJS by [Jonathan Beebe](https://github.com/jonbeebe/xcfg), this is a complete rewrite in TypeScript using updated JavaScript conventions and Node.js APIs, with both ESM and CJS exports.

## Overview

When building command-line tools and desktop apps with [Node.js](https://nodejs.org/en/), there exists a common need for managing application configuration files.

**xcfg** is a package that saves you the trouble of validating config paths across multiple platforms and creating the config file. It makes config file management easy by handling all IO operations under the hood, and provides a simple `get()` and `set()` interface for individual configuration properties. JSON is used as the config file format to be easy on both machines and humans (and to eliminate the need for 3rd party dependencies).

## Installation

```sh
cd node-project
npm install xcfg
```

## Usage

Require the module and create a new instance:

```js
import Xcfg from 'xcfg';
const xcfg = await Xcfg.create('agency.self.myapp');
```

On construction, after sanitizing the `id`, it is used to create a configuration file (if it doesn't already exist) at the following path: `~/.config/agency.self.myapp/config.json`

After that, you can use the `xcfg` instance to get, set, and delete properties on the in-memory object:

```js
xcfg.set('foo', 'bar');
xcfg.get('foo'); // bar
xcfg.del('foo');
xcfg.get('foo'); // undefined
```

The above will only manipulate the in-memory config instance. To persist changes to disk, use `save()`:

```js
xcfg.save();
```

And while there's _a little_ more to it than that, that's the basic idea and really all you need to know to use this package. To see more methods and options, view the documentation.

## Documentation

Documentation is available in the `docs` directory and can be recompiled with `npm run docs`.

## Tests

```sh
npm run test
```

All tests were written using [Jest](https://jestjs.io).

## Linting

This project uses eslint and Prettier to enforce code correctness and style. You can check for errors by running:

```sh
npm run lint
```

## License

Copyright (c) 2023, Daniel Sieradski; 2017, Jonathan Beebe

This code was derived from [https://github.com/jonbeebe/xcfg](https://github.com/jonbeebe/xcfg).

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice (including the next
paragraph) shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
