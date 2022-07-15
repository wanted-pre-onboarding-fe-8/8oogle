import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const OVERALL = 'overall';
export const PLATFORM = 'platform';
export const CAMPAGIN = 'campaign';

export const overallService = axios.create({
  baseURL: `${BASE_URL}/${OVERALL}/`,
});

export const platformService = axios.create({
  baseURL: `${BASE_URL}/${PLATFORM}/`,
});

export const campaignService = axios.create({
  baseURL: `${BASE_URL}/${CAMPAGIN}/`,
});
