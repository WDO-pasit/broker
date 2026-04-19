'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brokerService } from '@/services/api';
import { CreateBrokerInput } from '@/types/broker';

export default function CreateUI() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateBrokerInput>({
    name: '', slug: '', broker_type: 'cfd', logo_url: '', website: '', description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await brokerService.createBroker(form);
      router.push('/');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Submit Broker</h1>
      <p className="text-gray-400 text-sm md:text-base mb-10">Register a new institutional entity within the Sterling Midnight ecosystem.<br/>Please ensure all data points align with regulatory documentation.</p>
      
      <div className="bg-[#131B2F] p-8 md:p-10 rounded-2xl border border-gray-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Broker Name</label>
              <input required type="text" placeholder="e.g. Sterling Capital Markets" 
                className="w-full bg-[#1C253C] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5B8DEF] focus:ring-1 focus:ring-[#5B8DEF]"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Slug</label>
              <input required type="text" placeholder="sterling-capital-markets" pattern="^[a-z0-9-]+$" 
                className="w-full bg-[#1C253C] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5B8DEF]"
                value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Broker Type</label>
            <div className="grid grid-cols-4 gap-3 bg-[#1C253C] p-1 rounded-lg border border-gray-700">
              {['cfd', 'bond', 'stock', 'crypto'].map((type) => (
                <button type="button" key={type}
                  onClick={() => setForm({...form, broker_type: type as any})}
                  className={`py-2 text-sm font-semibold rounded-md uppercase transition ${form.broker_type === type ? 'bg-[#6A8BBD] text-white shadow' : 'text-gray-400 hover:text-white'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Logo URL</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">🖼️</span>
                <input required type="url" placeholder="https://..." 
                  className="w-full bg-[#1C253C] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#5B8DEF]"
                  value={form.logo_url} onChange={e => setForm({...form, logo_url: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Website</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">🌐</span>
                <input required type="url" placeholder="https://..." 
                  className="w-full bg-[#1C253C] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#5B8DEF]"
                  value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Broker Description</label>
            <textarea required rows={5} placeholder="Provide a comprehensive institutional overview..." 
              className="w-full bg-[#1C253C] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5B8DEF]"
              value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
          </div>

          <div className="flex justify-end items-center gap-6 pt-4">
            <button type="button" onClick={() => router.push('/')} className="text-sm font-bold text-gray-400 hover:text-white">Discard Draft</button>
            <button type="submit" disabled={loading} className="bg-[#6A8BBD] hover:bg-[#8CAEEA] text-[#0B1221] font-bold px-8 py-3 rounded-lg shadow-lg disabled:opacity-50 transition">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}