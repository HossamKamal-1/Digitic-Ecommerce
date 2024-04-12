import axios, { CreateAxiosDefaults } from 'axios';

const EcommerceClientConfig: CreateAxiosDefaults = {
  baseURL: 'http://localhost:5070',
};
const EcommerceClient = axios.create(EcommerceClientConfig);

export default EcommerceClient;
