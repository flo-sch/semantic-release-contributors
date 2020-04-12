/**
 * Remove duplicates from an array of objects by a given property
 *
 * @param array     items
 * @param string    property
 *
 * @return array
 */
const uniqBy = (items, property) =>
  items.reduce((uniqItems, item) => {
    const value = item[property];
    const uniqKeys = uniqItems.map((i) => i[property]);

    if (typeof value === 'undefined' || !uniqKeys.includes(value)) {
      uniqItems.push(item);
    }

    return uniqItems;
  }, []);

export default uniqBy;
