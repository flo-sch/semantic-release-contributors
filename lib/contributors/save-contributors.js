import {readJson, writeJson} from 'fs-extra';
import stringifyAuthor from 'stringify-author';
import mergeContributors from './merge-contributors';

const saveContributors = async (packageFilePath, contributors = [], format = 'string', logger = undefined) => {
  const pkg = await readJson(packageFilePath);

  let allContributors = mergeContributors(pkg.contributors, contributors);

  if (format === 'string') {
    allContributors = allContributors.map(stringifyAuthor);
  }

  if (logger) {
    logger.info('Updated contributors list', allContributors);
  }

  pkg.contributors = allContributors;

  await writeJson(packageFilePath, pkg, {
    spaces: 2,
  });
};

export default saveContributors;
