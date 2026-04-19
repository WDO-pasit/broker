'use client'; // บังคับรันบน Browser

import { useEffect, useState, use } from 'react';
import { brokerService } from '@/services/api';
import { notFound } from 'next/navigation';
import BrokerDetailUI from './BrokerDetail'; // เช็ค path ให้ตรงกับไฟล์ของคุณด้วยนะครับ
import { Broker } from '@/types/broker';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [broker, setBroker] = useState<Broker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBroker = async () => {
      try {
        console.log('🔍 Fetching broker:', resolvedParams.slug);
        const data = await brokerService.getBrokerBySlug(resolvedParams.slug);
        console.log('✅ Broker found:', data);
        setBroker(data);
      } catch (err) {
        console.error('❌ Error fetching broker:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBroker();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="min-h-screen bg-[#0B1221] text-white flex items-center justify-center">Loading...</div>;
  }

  if (error || !broker) {
    return notFound();
  }

  return <BrokerDetailUI broker={broker} />;
}