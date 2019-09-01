import path from 'path';
import test from 'ava';
import {outputJson, readJson} from 'fs-extra';
import {spy} from 'sinon';
import tempy from 'tempy';

test.beforeEach(t => {
  t.context.m = require('..');

  const log = spy();
  t.context.log = log;
  t.context.logger = {
    debug: t.context.log,
    log: t.context.log,
    info: t.context.log,
    warn: t.context.log,
    success: t.context.log,
    error: t.context.log,
  };
});

test('Throws an error if package.json is not provided', async t => {
  await t.throwsAsync(
    t.context.m.prepare(
      {
        format: 'string',
      },
      {
        options: {},
        logger: t.context.logger,
      }
    )
  );
});

test('Do not change the list if there is no new commit', async t => {
  const cwd = tempy.directory();
  const filepath = path.resolve(cwd, 'package.json');
  const email = 'john.doe@domain.tld';
  let pkg = {
    name: 'test',
    contributors: [
      {
        name: 'John Doe',
        email,
      },
    ],
  };
  await outputJson(filepath, pkg);

  await t.notThrowsAsync(
    t.context.m.prepare(
      {
        format: 'object',
      },
      {
        cwd,
        options: {},
        logger: t.context.logger,
      }
    )
  );

  pkg = await readJson(filepath);

  t.is(pkg.contributors.length, 1);
  t.is(typeof pkg.contributors[0], 'object');
  t.is(pkg.contributors[0].email, email);
});

test('Update the list of contributors', async t => {
  const cwd = tempy.directory();
  const filepath = path.resolve(cwd, 'package.json');
  const email = 'john.doe@domain.tld';
  let pkg = {
    name: 'test',
    contributors: [
      {
        name: 'John Doe',
        email,
      },
    ],
  };
  await outputJson(filepath, pkg);

  await t.notThrowsAsync(
    t.context.m.prepare(
      {},
      {
        cwd,
        options: {},
        commits: [
          {
            author: {
              name: 'John Smith',
              email: 'john.smith@domain.tld',
            },
          },
        ],
        logger: t.context.logger,
      }
    )
  );

  pkg = await readJson(filepath);

  t.is(pkg.contributors.length, 2);
  t.is(typeof pkg.contributors[0], 'string');
  t.is(typeof pkg.contributors[1], 'string');
});

test('Works in a sub-directory', async t => {
  const cwd = tempy.directory();
  const filepath = path.resolve(cwd, 'dist/package.json');
  const email = 'john.doe@domain.tld';
  let pkg = {
    name: 'test',
    contributors: [
      {
        name: 'John Doe',
        email,
      },
    ],
  };
  await outputJson(filepath, pkg);

  await t.notThrowsAsync(
    t.context.m.prepare(
      {
        pkgRoot: 'dist',
      },
      {
        cwd,
        options: {},
        commits: [
          {
            author: {
              name: 'John Smith',
              email: 'john.smith@domain.tld',
            },
          },
        ],
        logger: t.context.logger,
      }
    )
  );

  pkg = await readJson(filepath);

  t.is(pkg.contributors.length, 2);
  t.is(typeof pkg.contributors[0], 'string');
  t.is(typeof pkg.contributors[1], 'string');
});
