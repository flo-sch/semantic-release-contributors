import test from 'ava';
import {stub} from 'sinon';
import mergeContributors from '../../lib/contributors/merge-contributors';

test.beforeEach((t) => {
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

test('Merge empty arrays into one', (t) => {
  const mergedContributors = mergeContributors();

  t.is(mergedContributors.length, 0);
});

test('Merge arrays of contributors', (t) => {
  const name = 'John Doe';
  const email = 'john.smith@domain.tld';
  const mergedContributors = mergeContributors(
    [
      {
        name,
        email: 'john.doe@domain.tld',
      },
    ],
    [
      {
        name: 'John Smith',
        email,
      },
    ]
  );

  t.is(mergedContributors.length, 2);
  t.is(mergedContributors[0].name, name);
  t.is(mergedContributors[1].email, email);
});

test('Removes duplicated emails', (t) => {
  const email = 'john.smith@domain.tld';
  const mergedContributors = mergeContributors(
    [
      {
        name: 'John Doe',
        email: 'john.doe@domain.tld',
      },
    ],
    [
      {
        name: 'John Smith',
        email,
      },
      {
        name: 'John Doe',
        email: 'john.doe@domain.tld',
      },
      {
        name: 'John Smith',
        email,
      },
    ]
  );

  t.is(mergedContributors.length, 2);
  t.is(mergedContributors.filter((contributor) => contributor.email === email).length, 1);
});

test('Works with strings and objects', (t) => {
  const email = 'john.smith@domain.tld';
  const mergedContributors = mergeContributors(
    [
      `John Smith <${email}>`,
      {
        name: 'John Doe',
        email: 'john.doe@domain.tld',
      },
    ],
    [
      {
        name: 'John Doe 2',
        email: 'john.doe2@domain.tld',
      },
      `John Smith <${email}> (https://domain.tld)`,
    ]
  );

  t.is(mergedContributors.length, 3);
  t.is(mergedContributors.filter((contributor) => contributor.email === email).length, 1);
});
