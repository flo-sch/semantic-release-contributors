import uniqBy from '../helpers/uniq-by';
import sortBy from '../helpers/sort-by';

/**
 * Extract an array of contributors from an array of commits, removing duplicates on email
 *
 * @param array commits
 */
const getContributorsFromCommits = (commits = []) =>
  uniqBy(
    sortBy(commits, 'date').map((commit) => ({
      email: commit.author.email,
      name: commit.author.name,
    })),
    'email'
  );

export default getContributorsFromCommits;
