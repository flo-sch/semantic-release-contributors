const {chain} = require('lodash');

module.exports = function (commits = []) {
  return chain(commits)
    .map((commit) => commit.author)
    .sortBy('date')
    .map(({email, name}) => ({email, name}))
    .uniqBy('email')
    .value();
};
