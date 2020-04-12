import path from 'path';
import AggregateError from 'aggregate-error';
import getContributorsFromCommits from '../contributors/get-contributors-from-commits';
import saveContributors from '../contributors/save-contributors';

const prepare = async (pluginConfig, context) => {
  const errors = [];
  const {cwd, commits, logger} = context;

  const format = ['string', 'object'].includes(pluginConfig.format) ? pluginConfig.format : 'string';
  const pkgRoot = pluginConfig.pkgRoot || '.';

  try {
    await saveContributors(
      path.resolve(cwd, pkgRoot, 'package.json'),
      getContributorsFromCommits(commits),
      format,
      logger
    );
  } catch (error) {
    errors.push(error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};

export default prepare;
