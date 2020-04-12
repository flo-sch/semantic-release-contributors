import parseAuthor from 'parse-author';
import {chain, concat} from 'lodash';

const parseContributor = (contributor) => (typeof contributor === 'string' ? parseAuthor(contributor) : contributor);

const mergeContributors = (packageContributors = [], commitsContributors = []) =>
  chain(concat(packageContributors.map(parseContributor), commitsContributors.map(parseContributor)))
    .uniqBy('email')
    .value();

export default mergeContributors;
