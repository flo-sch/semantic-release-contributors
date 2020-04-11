const {chain, concat} = require('lodash');
const parseAuthor = require('parse-author');

const parseContributor = function (contributor) {
  return typeof contributor === 'string' ? parseAuthor(contributor) : contributor;
};

module.exports = function (packageContributors = [], commitsContributors = []) {
  return chain(concat(packageContributors.map(parseContributor), commitsContributors.map(parseContributor)))
    .uniqBy('email')
    .value();
};
