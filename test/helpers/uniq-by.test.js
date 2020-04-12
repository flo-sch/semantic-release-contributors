import test from 'ava';
import uniqBy from '../../lib/helpers/uniq-by';

test('Removes duplicate by a given property', (t) => {
  const value = 'foo';
  const uniqItems = uniqBy(
    [
      {
        id: 1,
        value,
      },
      {
        id: 1,
        value: 'bar',
      },
    ],
    'id'
  );

  t.is(uniqItems.length, 1);
  t.is(uniqItems[0].value, value);
});

test('Returns the array without change if there is no duplicate', (t) => {
  const value1 = 'foo';
  const value2 = 'bar';
  const uniqItems = uniqBy(
    [
      {
        id: 1,
        value: value1,
      },
      {
        id: 2,
        value: value2,
      },
    ],
    'id'
  );

  t.is(uniqItems.length, 2);
  t.is(uniqItems[0].value, value1);
  t.is(uniqItems[1].value, value2);
});

test('Returns the array as such if the property does not exist', (t) => {
  const value1 = 'foo';
  const value2 = 'bar';
  const uniqItems = uniqBy(
    [
      {
        id: 1,
        value: value1,
      },
      {
        id: 2,
        value: value2,
      },
    ],
    'unexisting-property'
  );

  t.is(uniqItems.length, 2);
  t.is(uniqItems[0].value, value1);
  t.is(uniqItems[1].value, value2);
});
