export type BrokerType = 'cfd' | 'bond' | 'stock' | 'crypto';

export interface Broker {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  website: string;
  broker_type: BrokerType;
  created_at?: string;
}

export interface CreateBrokerInput extends Omit<Broker, 'id' | 'created_at'> {}