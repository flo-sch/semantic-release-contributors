import path from 'path';
import test from 'ava';
import {stub} from 'sinon';
import tempy from 'tempy';
import {outputJson, readJson} from 'fs-extra';
import saveContributors from '../lib/save-contributors';

test.beforeEach(t => {
  // Stub the logger functions
  const log = stub();
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

test('Throw an error if the package file path is undefined', async t => {
  await t.throwsAsync(async () => {
    await saveContributors(undefined);
  });
});

test('Throw an error if the package file does not exists', async t => {
  const error = await t.throwsAsync(async () => {
    await saveContributors('not-existing-file.json');
  });
  t.is(error.code, 'ENOENT');
  t.regex(error.message, new RegExp('no such file or directory', 'i'));
});

test('Save an updated list of contributors in "string" format', async t => {
  const cwd = tempy.directory();
  const filepath = path.resolve(cwd, 'package.json');
  const email = 'john.smith@domain.tld';
  let pkg = {
    name: 'test',
    contributors: [
      {
        name: 'John Doe',
        email: 'john.doe@domain.tld',
      },
    ],
  };
  await outputJson(filepath, pkg);

  await t.notThrowsAsync(async () => {
    await saveContributors(
      filepath,
      [
        {
          name: 'John Smith',
          email,
        },
      ],
      'string',
      t.context.logger
    );
  });

  pkg = await readJson(filepath);

  t.is(pkg.contributors.length, 2);
  t.is(typeof pkg.contributors[0], 'string');
  t.is(typeof pkg.contributors[1], 'string');
});

test('Save an updated list of contributors in "object" format', async t => {
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

  await t.notThrowsAsync(async () => {
    await saveContributors(
      filepath,
      [
        {
          name: 'John Smith',
          email: 'john.smith@domain.tld',
        },
      ],
      'object'
    );
  });

  pkg = await readJson(filepath);

  t.is(pkg.contributors.length, 2);
  t.is(typeof pkg.contributors[0], 'object');
  t.is(pkg.contributors[0].email, email);
});
