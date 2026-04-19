import axios from 'axios';
import { Broker, CreateBrokerInput } from '@/types/broker';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9991/api',
});

export const brokerService = {
  getBrokers: async (search: string, type: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (type && type !== 'all') params.append('type', type);
    
    const { data } = await api.get<{data: Broker[]}>(`/brokers?${params.toString()}`);
    return data.data;
  },
  
  getBrokerBySlug: async (slug: string) => {
    const { data } = await api.get<{data: Broker}>(`/brokers/${slug}`);
    return data.data;
  },

  createBroker: async (payload: CreateBrokerInput) => {
    const { data } = await api.post('/brokers', payload);
    return data;
  }
};