import axios from 'axios';

const api = () => axios.create();

export const getMaxResult = data => api().get(`https://api.github.com/search/repositories?q=${data}&per_page=100`)
export const searchUser = (user, activFilterLang, activeFilterStars, activeFilterForks, page, sort, sortOrder) => api().get(
  `https://api.github.com/search/repositories?q=${user}+${activFilterLang?'language:'+activFilterLang+'+':''}
  ${activeFilterStars ? 'stars:>' + activeFilterStars + '+' : ''}
  ${activeFilterForks ? 'forks:>' + activeFilterForks + '+' : ''}
  &per_page=5&page=${page}&sort=${sort}&order=${sortOrder}`
)