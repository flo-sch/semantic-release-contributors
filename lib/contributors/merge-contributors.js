import parseAuthor from 'parse-author';
import uniqBy from '../helpers/uniq-by';

/**
 * Parse a contributor string with parse-author
 *
 * @param mixed contributor
 *
 * @return object
 */
const parseContributor = (contributor) => (typeof contributor === 'string' ? parseAuthor(contributor) : contributor);

/**
 * Merge array of contributors, parsing them and removing duplicates on email
 *
 * @param array packageContributors
 * @param array commitsContributors
 *
 * @return array
 */
const mergeContributors = (packageContributors = [], commitsContributors = []) =>
  uniqBy(packageContributors.concat(commitsContributors).map(parseContributor), 'email');

export default mergeContributors;
