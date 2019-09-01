const path = require('path');
const AggregateError = require('aggregate-error');
const getContributors = require('./lib/get-contributors-from-commits');
const saveContributors = require('./lib/save-contributors');

async function prepare(pluginConfig, context) {
  const errors = [];
  const {cwd, commits, logger} = context;

  const format = ['string', 'object'].includes(pluginConfig.format) ? pluginConfig.format : 'string';
  const pkgRoot = pluginConfig.pkgRoot || '.';

  try {
    await saveContributors(path.resolve(cwd, pkgRoot, 'package.json'), getContributors(commits), format, logger);
  } catch (error) {
    errors.push(error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
}

module.exports = {
  prepare,
};
