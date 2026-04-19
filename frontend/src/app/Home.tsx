'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { brokerService } from '@/services/api';
import { Broker } from '@/types/broker';
import { useDebounce } from '@/hooks/useDebounce';

export default function HomeUI() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const data = await brokerService.getBrokers(debouncedSearch, type);
        setBrokers(data);
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    };
    fetchBrokers();
  }, [debouncedSearch, type]);

  const tabs = ['All Partners', 'CFD', 'Bond', 'Stock', 'Crypto'];

  // รูปตึกฟรีจาก Unsplash ไว้เป็น Placeholder ถ้าไม่มี Logo
  const placeholderImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Institutional Brokers</h1>
        <p className="text-gray-400 text-lg">Access global liquidity through our curated network of elite financial institutions and market makers.</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 space-y-6">
        <div className="relative max-w-xl">
          <span className="absolute left-4 top-3 text-gray-500">🔍</span>
          <input 
            type="text" 
            placeholder="Find brokers by name, region, or asset class..." 
            className="w-full bg-[#131B2F] border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          <span>Asset Focus:</span>
          <div className="flex space-x-2">
            {tabs.map(tab => {
              const val = tab === 'All Partners' ? 'all' : tab.toLowerCase();
              return (
                <button key={tab} onClick={() => setType(val)}
                  className={`px-4 py-2 rounded-full border transition ${type === val ? 'bg-[#5B8DEF] text-white border-[#5B8DEF]' : 'bg-[#131B2F] border-gray-800 text-gray-400 hover:border-gray-600'}`}>
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brokers.map(broker => (
          <Link href={`/broker/${broker.slug}`} key={broker.id} className="group block">
            <div className="bg-[#131B2F] rounded-xl overflow-hidden border border-gray-800 hover:border-[#5B8DEF] transition h-full flex flex-col">
              <div className="h-48 relative overflow-hidden bg-gray-900">
                <img src={broker.logo_url || placeholderImg} alt={broker.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
                <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/20">
                  {broker.broker_type}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-serif text-white mb-2">{broker.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">{broker.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">🌐 Global Reach</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#5B8DEF] transition flex items-center">
                    View Details <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Static CTA Card */}
        <div className="bg-[#0B1221] rounded-xl overflow-hidden border border-dashed border-gray-700 hover:border-gray-500 transition h-full flex flex-col items-center justify-center p-8 text-center min-h-[350px]">
          <div className="w-12 h-12 bg-[#131B2F] rounded-full flex items-center justify-center mb-4 border border-gray-800">🤝</div>
          <h3 className="text-xl font-serif text-white mb-2">Partner with Us</h3>
          <p className="text-sm text-gray-400 mb-6">Are you an institutional broker? Join our exclusive network of providers.</p>
          <Link href="/create" className="bg-[#8CAEEA] text-[#0B1221] px-6 py-2 rounded font-bold text-sm hover:bg-white transition">
            Inquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}