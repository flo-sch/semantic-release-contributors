import {readFile, writeFile} from 'jsonfile';
import stringifyAuthor from 'stringify-author';
import mergeContributors from './merge-contributors';

/**
 * Save an array of contributors to a package.json file
 *
 * @param string packageFilePath
 * @param array contributors
 * @param string format
 * @param mixed logger
 */
const saveContributors = async (packageFilePath, contributors = [], format = 'string', logger = undefined) => {
  const pkg = await readFile(packageFilePath);

  let allContributors = mergeContributors(pkg.contributors, contributors);

  if (format === 'string') {
    allContributors = allContributors.map(stringifyAuthor);
  }

  if (logger) {
    logger.info('Updated contributors list', allContributors);
  }

  pkg.contributors = allContributors;

  await writeFile(packageFilePath, pkg, {
    spaces: 2,
  });
};

export default saveContributors;
