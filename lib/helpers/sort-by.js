/**
 * Sort an array of objects by a given property
 *
 * @param array     items
 * @param string    property
 *
 * @return array
 */
const sortBy = (items, property) =>
  items.sort((itemA, itemB) => {
    if (itemA[property] > itemB[property]) {
      return -1;
    }

    if (itemA[property] < itemB[property]) {
      return 1;
    }

    return 0;
  });

export default sortBy;
