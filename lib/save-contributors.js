const fs = require('fs-extra');
const stringifyAuthor = require('stringify-author');
const mergeContributors = require('./merge-contributors');

module.exports = async function(packageFilePath, contributors = [], format = 'string', logger = undefined) {
  const pkg = await fs.readJson(packageFilePath);

  let allContributors = mergeContributors(pkg.contributors, contributors);

  if (format === 'string') {
    allContributors = allContributors.map(stringifyAuthor);
  }

  if (logger) {
    logger.info('Updated contributors list', allContributors);
  }

  pkg.contributors = allContributors;

  await fs.writeJson(packageFilePath, pkg, {
    spaces: 2,
  });
};
