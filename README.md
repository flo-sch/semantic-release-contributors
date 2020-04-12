<h1 align="center" style="border-bottom: none;">📦🤖 semantic-release-contributors</h1>
<p align="center">
  <a href="https://github.com/semantic-release/semantic-release">semantic-release</a>
  plugin to automatically update contributors list based on commits history
</p>
<p align="center">
  <a href="https://github.com/semantic-release/semantic-release" rel="nofollow">
    <img alt="Semantic Release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="http://commitizen.github.io/cz-cli/" rel="nofollow">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
  </a>
</p>
<p align="center">
  <a href="https://travis-ci.org/flo-sch/semantic-release-contributors" rel="nofollow">
    <img alt="Travis" src="https://img.shields.io/travis/flo-sch/semantic-release-contributors.svg">
  </a>
  <a href="https://codecov.io/gh/flo-sch/semantic-release-contributors" rel="nofollow">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/flo-sch/semantic-release-contributors.svg">
  </a>
  <a href="https://snyk.io/test/github/flo-sch/semantic-release-contributors?targetFile=package.json" rel="nofollow">
    <img alt="Known Vulnerabilities" src="https://snyk.io/test/github/flo-sch/semantic-release-contributors/badge.svg?targetFile=package.json">
  </a>
  <a href="https://codeclimate.com/github/flo-sch/semantic-release-contributors/maintainability" rel="nofollow">
    <img alt="Maintainability" src="https://api.codeclimate.com/v1/badges/0c542e19db095ddb9947/maintainability">
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/semantic-release-contributors" rel="nofollow">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/semantic-release-contributors/latest.svg">
  </a>
  <a href="https://bundlephobia.com/result?p=semantic-release-contributors" rel="nofollow">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/semantic-release-contributors">
  </a>
  <a href="https://bundlephobia.com/result?p=semantic-release-contributors" rel="nofollow">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/semantic-release-contributors">
  </a>
  <a href="https://img.shields.io/npm/l/semantic-release-contributors" rel="nofollow">
    <img alt="LICENSE" src="https://img.shields.io/npm/l/semantic-release-contributors">
  </a>
</p>

------------------

| Step           | Description                                                                                         |
|----------------|-----------------------------------------------------------------------------------------------------|
| `prepare`      | Determine the contributors list by analyzing commits history.                                       |

## Install

```bash
npm install semantic-release-contributors -D
```

## How does it work

Whenener someone commit to the project, his/her name will be appended
to the [contributors list of your package.json](https://docs.npmjs.com/files/package.json#people-fields-author-contributors) file.

If `Paul Smith` commits to a project with the following set-up:

```json5
{
  "name": "your-project",
  "author": "Barney Rubble <b@rubble.com>",
  "contributors": [
    "John Doe <j@doe.com> (https://johndoe.com)"
  ]
}
```

The `package.json` file would then be updated to:

```json5
{
  "name": "your-project",
  "author": "Barney Rubble <b@rubble.com>",
  "contributors": [
    "John Doe <j@doe.com> (https://johndoe.com)",
    "Paul Smith <p.smith@domain.tld>"
  ]
}
```

**NOTE**: this package internally deserialize the contributors to
objects (name, email, url) and make sure duplicated emails are removed.
Contributors objects are then potentially re-serialized before being written
to the package file (unless you opt for a different format)

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

**IMPORTANT**: since this plugin acts on semantic-release's "prepare" step
and do not commit the updated package.json file itself,
it *requires* to be placed *before* "@semantic-release/git".

```json5
{
  "plugins": [
    // important: insert it before @semantic-release/git
    ["semantic-release-contributors", {
      "format": "string",
      "pkgRoot": "."
    }],
    // ...
    "@semantic-release/git"
    // ...
  ]
}
```

With this example:

* the contributors will be stringified to `name <email>`
* the package file containing the contributors will be read
then updated in the current directory

## Configuration

### Options

| Option    | Description                                                                                                     | Default  |
|-----------|-----------------------------------------------------------------------------------------------------------------|----------|
| `format`  | `string` or `object`. It defines which format will the contributors be written with to the `package.json` file. | `string` |
| `pkgRoot` | Directory path to publish.                                                                                      | `.` |

## Similar or related projects

* [parse-author](https://www.npmjs.com/package/parse-author)
* [stringify-author](https://www.npmjs.com/package/stringify-author)

<p align="center">
  <img alt="Kill all humans" src="media/bender-with-memory.jpg">
</p>
