import {chain} from 'lodash';

const getContributorsFromCommits = (commits = []) =>
  chain(commits)
    .map((commit) => commit.author)
    .sortBy('date')
    .map(({email, name}) => ({email, name}))
    .uniqBy('email')
    .value();

export default getContributorsFromCommits;
