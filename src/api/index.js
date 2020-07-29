import axios from '../utils/axios';
import ApiRoutes from '../utils/api';

export const fetchFilters = async () => {
  return await axios.get(ApiRoutes.getFilters)
}

export const fetchVendor = async (queries='',page = 1) => {
  return await axios.get(`${ApiRoutes.getVendors}${queries}`,{params: {page}})
} 