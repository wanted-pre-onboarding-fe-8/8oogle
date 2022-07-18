import axios from 'axios';
import { OVERALL_CONSTANTS, PLATFORM_CONSTANTS, CAMPAIGN_CONSTANTS } from '../utils/constants/data';

const BASE_URL = 'http://localhost:8000';

export const overallService = axios.create({
  baseURL: `${BASE_URL}/${OVERALL_CONSTANTS.OVERALL}/`,
});

export const platformService = axios.create({
  baseURL: `${BASE_URL}/${PLATFORM_CONSTANTS.PLATFORM}/`,
});

export const campaignService = axios.create({
  baseURL: `${BASE_URL}/${CAMPAIGN_CONSTANTS.CAMPAIGN}/`,
});
