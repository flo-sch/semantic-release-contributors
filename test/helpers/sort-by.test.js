import test from 'ava';
import sortBy from '../../lib/helpers/sort-by';

test('Sort by a given property', (t) => {
  const value1 = 'foo';
  const value2 = 'bar';
  const value3 = 'baz';

  const sortedItems = sortBy(
    [
      {
        id: 1,
        value: value1,
      },
      {
        id: 3,
        value: value3,
      },
      {
        id: 2,
        value: value2,
      },
    ],
    'id'
  );

  t.is(sortedItems.length, 3);
  t.is(sortedItems[0].value, value3);
  t.is(sortedItems[1].value, value2);
  t.is(sortedItems[2].value, value1);
});

test('Return the array as such when the property does not exists', (t) => {
  const value1 = 'foo';
  const value2 = 'bar';
  const value3 = 'baz';

  const sortedItems = sortBy(
    [
      {
        id: 1,
        value: value1,
      },
      {
        id: 3,
        value: value3,
      },
      {
        id: 2,
        value: value2,
      },
    ],
    'unexisting-property'
  );

  t.is(sortedItems.length, 3);
  t.is(sortedItems[0].value, value1);
  t.is(sortedItems[1].value, value3);
  t.is(sortedItems[2].value, value2);
});
