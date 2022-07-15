import { AxiosInstance } from 'axios';

export function get(service: AxiosInstance, queryString: string) {
  return service.get(queryString).then((response) => response.data);
}
