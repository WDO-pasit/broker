'use client';

import { Broker } from '@/types/broker';

export default function BrokerDetailUI({ broker }: { broker: Broker }) {
  const placeholderImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop";

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[500px] w-full flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/90 to-transparent z-10"></div>
        <img src={broker.logo_url || placeholderImg} alt={broker.name} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="mb-4 flex items-center space-x-4">
            <span className="bg-[#1C253C] border border-[#5B8DEF]/30 text-[#5B8DEF] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Institutional Grade
            </span>
            <span className="text-gray-400 text-sm">★★★★★</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight max-w-3xl">{broker.name}</h1>
          <p className="text-lg text-gray-300 max-w-xl mb-8 line-clamp-2">
            The definitive platform for sovereign wealth management and high-velocity execution.
          </p>
          <div className="flex gap-4">
            <a href={broker.website} target="_blank" rel="noopener noreferrer" 
               className="bg-[#5B8DEF] hover:bg-[#749FF4] text-white px-6 py-3 rounded text-sm font-bold transition">
              Visit Website
            </a>
            <button className="bg-[#1C253C] hover:bg-gray-700 border border-gray-700 text-white px-6 py-3 rounded text-sm font-bold transition">
              Download Prospectus
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-serif text-[#D4E0FC] mb-6">The Sovereign Mandate</h2>
            <p className="text-gray-400 leading-relaxed text-base whitespace-pre-wrap">
              {broker.description}
            </p>
          </section>

          {/* Dummy Mockup Cards (ตามดีไซน์เป๊ะๆ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-[#131B2F] border border-gray-800 rounded-xl p-6">
                <div className="w-10 h-10 mb-4 rounded-full bg-[#1C253C] flex items-center justify-center border border-gray-700">🛡️</div>
                <h4 className="text-white font-bold mb-2">SEC & FCA Regulated</h4>
                <p className="text-sm text-gray-500">Operating under the strictest global mandates for transparency and capital reserve requirements.</p>
             </div>
             <div className="bg-[#131B2F] border border-gray-800 rounded-xl p-6">
                <div className="w-10 h-10 mb-4 rounded-full bg-[#1C253C] flex items-center justify-center border border-gray-700">⚡</div>
                <h4 className="text-white font-bold mb-2">12ms Execution</h4>
                <p className="text-sm text-gray-500">Industry-leading throughput powered by our proprietary Sterling Core engine.</p>
             </div>
          </div>
        </div>
        
        {/* Sidebar Metrics (Dummy data เพื่อความสมจริง) */}
        <div className="space-y-6">
          <div className="bg-[#1C253C] rounded-2xl p-8 border border-gray-700">
            <h3 className="text-xl font-serif text-white mb-8">Performance Metrics</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">AUM Growth (YOY)</p>
                <div className="flex justify-between items-end">
                  <span className="text-2xl text-white font-semibold">+24.8%</span>
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">📈</span>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Liquidity Access</p>
                <div className="flex justify-between items-end">
                  <span className="text-2xl text-white font-semibold">$12.4B</span>
                  <span className="text-xs text-gray-500">Daily Average</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 bg-transparent border border-gray-600 text-gray-300 py-3 rounded text-sm font-bold hover:bg-gray-800 transition">
              View Full Audit Report
            </button>
          </div>

          <div className="p-6">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contact & Details</h3>
             <ul className="space-y-4 text-sm text-gray-400">
               <li className="flex items-center gap-3"><span>📍</span> One Canary Wharf, London</li>
               <li className="flex items-center gap-3"><span>✉️</span> institutional@{broker.slug}.com</li>
               <li className="flex items-center gap-3"><span>🌐</span> {new URL(broker.website).hostname.replace('www.', '')}</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}