import test from 'ava';
import {stub} from 'sinon';
import getContributors from '../lib/get-contributors-from-commits';

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

test('Extract an empty list if the commit list is empty', t => {
  const contributors = getContributors();

  t.is(contributors.length, 0);
});

test('Extract a list of contributors from a commits list', t => {
  const firstCommiterName = 'John Doe';
  const secondCommiterEmail = 'john.smith@domain.tld';

  const contributors = getContributors([
    {
      message: 'feat(something): add something',
      author: {
        name: firstCommiterName,
        email: 'john.doe@domain.tld',
      },
    },
    {
      message: 'feat(something-else): add something else',
      author: {
        name: 'John Smith',
        email: secondCommiterEmail,
      },
    },
  ]);

  t.is(contributors.length, 2);
  t.is(contributors[0].name, firstCommiterName);
  t.is(contributors[1].email, secondCommiterEmail);
});

test('Removes duplicates email from the commiters list', t => {
  const name = 'John Doe';
  const email = 'john.doe@domain.tld';

  const contributors = getContributors([
    {
      message: 'feat(something): add something',
      author: {
        name,
        email,
      },
    },
    {
      message: 'fix(something): fix something',
      author: {
        name: 'John Smith',
        email: 'john.smith',
      },
    },
    {
      message: 'feat(something-else): add something else',
      author: {
        name,
        email,
      },
    },
  ]);

  t.is(contributors.length, 2);
  t.is(contributors.filter(contributor => contributor.email === email).length, 1);
});
