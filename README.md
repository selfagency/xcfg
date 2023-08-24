# xcfg

[![GitHub Issues](https://img.shields.io/github/issues/selfagency/xcfg.svg)](https://github.com/selfagency/xcfg/issues)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/selfagency/xcfg/blob/master/LICENSE)

Cross-platform config file management made easy. Works great with command-line tools and [Electron](https://electron.atom.io) apps.

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
const xcfg = Xcfg.config('agency.self.myapp');
```

On construction, after sanitizing the `id`, it is used to create a configuration file (if it doesn't already exist) at the following path: `~/.config/agency.self.myapp/config.json`

After that, you can use the `xcfg` instance to get, set, and delete properties on the in-memory object:

```
xcfg.set('foo', 'bar')
xcfg.get('foo') // bar
xcfg.del('foo')
xcfg.get('foo') // undefined
```

The above will only manipulate the in-memory config instance. To persist changes to disk, use `save()`:

```
xcfg.save()
```

And while there's _a little_ more to it than that, that's the basic idea and really all you need to know to use this package. To see more methods and options, view the documentation.

## Documentation

Documentation is available in the `docs` directory and can be recompiled with `npm run docs`.

## Tests

```
npm run test
```

All tests were written using [Jest](https://jestjs.io).

## Linting

This project uses eslint and Prettier to enforce code correctness and style. You can check for errors by running:

```
npm run lint
```

## License

Copyright (c) 2023, Daniel Sieradski; 2017, Jonathan Beebe
This code was derived from [https://github.com/jonbeebe/xcfg](https://github.com/jonbeebe/xcfg)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
