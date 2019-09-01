# **contributors**

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to automatically update contributors list from git history

[![Travis](https://img.shields.io/travis/flo-sch/semantic-release-contributors.svg)](https://travis-ci.org/flo-sch/semantic-release-contributors)
[![Codecov](https://img.shields.io/codecov/c/github/flo-sch/semantic-release-contributors.svg)](https://codecov.io/gh/flo-sch/semantic-release-contributors)
[![Greenkeeper badge](https://badges.greenkeeper.io/flo-sch/semantic-release-contributors.svg)](https://greenkeeper.io/)

[![npm latest version](https://img.shields.io/npm/v/semantic-release-contributors/latest.svg)](https://www.npmjs.com/package/flo-sch/semantic-release-contributors)
[![npm next version](https://img.shields.io/npm/v/semantic-release-contributors/next.svg)](https://www.npmjs.com/package/flo-sch/semantic-release-contributors)

| Step           | Description                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------------|
| `prepare`      | Determine the contributors list by analyzing git history.                                                  |

## Install

```bash
$ npm install semantic-release-contributors -D
```

## How does it work?

Whenener someone commit to the project, his/her name will be appended to the [contributors list of your package.json](https://docs.npmjs.com/files/package.json#people-fields-author-contributors) file.

If `Paul Smith` commits to a project with the following set-up:

```json
{
  "name": "your-project",
  "author": "Barney Rubble <b@rubble.com>",
  "contributors": [
    "John Doe <j@doe.com> (https://johndoe.com)"
  ]
}
```

The `package.json` file would then be updated to:

```json
{
  "name": "your-project",
  "author": "Barney Rubble <b@rubble.com>",
  "contributors": [
    "John Doe <j@doe.com> (https://johndoe.com)",
    "Paul Smith <p.smith@domain.tld>"
  ]
}
```

**NOTE**: this package internally deserialize the contributors to objects (name, email, url) and make sure duplicated emails are removed. Contributors objects are then potentially re-serialized before being written to the package file (unless you opt for a different format)

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    ["semantic-release-contributors", {
      "format": "string",
      "pkgRoot": "."
    }]
  ]
}
```

With this example:
- the contributors will be stringified to `name <email>`
- the package file containing the contributors will be read then updated in the current directory

## Configuration

### Options

| Option    | Description                                                                                                     | Default  |
|-----------|-----------------------------------------------------------------------------------------------------------------|----------|
| `format`  | `string` or `object`. It defines which format will the contributors be written with to the `package.json` file. | `string` |
| `pkgRoot` | Directory path to publish.                                                                                      | `.` |

## Similar or related projects

- [parse-author](https://www.npmjs.com/package/parse-author)
- [stringify-author](https://www.npmjs.com/package/stringify-author)

<p align="center">
  <img alt="Kill all humans" src="media/bender-with-memory.jpg">
</p>
