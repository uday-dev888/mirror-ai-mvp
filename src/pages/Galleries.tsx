import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { EventCreationModal, EventData } from '../components/EventCreationModal';
import { SFTPSetupWizard } from '../components/SFTPSetupWizard';
import { Search, Plus, Share2, QrCode } from 'lucide-react';

const galleries = [
  {
    id: 'aarav-diya',
    couple: 'Aarav & Diya',
    date: '12 July, 2024',
    photos: 234,
    views: 89,
    size: '12.4 GB',
    image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'live',
    newPhotos: 5
  },
  {
    id: 'rohan-ananya',
    couple: 'Rohan & Ananya',
    date: '8 July, 2024',
    photos: 189,
    views: 67,
    size: '10.2 GB',
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'arjun-ishita',
    couple: 'Arjun & Ishita',
    date: '5 July, 2024',
    photos: 312,
    views: 124,
    size: '15.8 GB',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'kabir-meera',
    couple: 'Kabir & Meera',
    date: '1 July, 2024',
    photos: 276,
    views: 98,
    size: '14.1 GB',
    image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'vihaan-saanvi',
    couple: 'Vihaan & Saanvi',
    date: '28 June, 2024',
    photos: 198,
    views: 72,
    size: '9.8 GB',
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'aditya-riya',
    couple: 'Aditya & Riya',
    date: '25 June, 2024',
    photos: 245,
    views: 89,
    size: '11.6 GB',
    image: 'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    status: 'active'
  }
];

export function Galleries() {
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSFTPWizardOpen, setIsSFTPWizardOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);

  const handleEventCreated = (data: EventData) => {
    setEventData(data);
    setIsEventModalOpen(false);
    setIsSFTPWizardOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm text-[#6B4423]">
          <Link to="/dashboard" className="hover:text-[#4E342E]">Dashboard</Link>
          <span>{'>'}</span>
          <span className="text-[#3E2723]">Galleries</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Event Galleries
          </h1>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A08A6D]" size={20} />
          <Input
            type="text"
            placeholder="Search by couple name or date"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        <div className="flex gap-6 border-b border-[#E0D7C6]">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 px-1 font-medium transition-colors duration-200 ${
              activeTab === 'active'
                ? 'text-[#4E342E] border-b-2 border-[#4E342E]'
                : 'text-[#6B4423] hover:text-[#4E342E]'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`pb-3 px-1 font-medium transition-colors duration-200 ${
              activeTab === 'archived'
                ? 'text-[#4E342E] border-b-2 border-[#4E342E]'
                : 'text-[#6B4423] hover:text-[#4E342E]'
            }`}
          >
            Archived
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <Card key={gallery.id} hover className="overflow-hidden">
              <div className="relative">
                <img
                  src={gallery.image}
                  alt={gallery.couple}
                  className="w-full h-48 object-cover"
                />
                {gallery.status === 'live' && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="live">LIVE</Badge>
                  </div>
                )}
                {gallery.newPhotos && (
                  <div className="absolute top-3 right-3 bg-[#FFD54F] text-[#3E2723] px-3 py-1 rounded-full text-xs font-semibold">
                    {gallery.newPhotos} new photos
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#3E2723] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {gallery.couple}
                  </h3>
                  <p className="text-sm text-[#6B4423]">{gallery.date}</p>
                </div>

                <div className="text-sm text-[#6B4423]">
                  {gallery.photos} photos • {gallery.views} views • {gallery.size}
                </div>

                <div className="flex gap-2">
                  <Link to={`/gallery/${gallery.id}`} className="flex-1">
                    <Button variant="primary" fullWidth size="sm">
                      View Gallery
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm">
                    <Share2 size={16} />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <QrCode size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-24 lg:bottom-8 right-8">
          <Button
            onClick={() => setIsEventModalOpen(true)}
            className="shadow-lg hover:shadow-xl w-14 h-14 rounded-full p-0"
            style={{ boxShadow: '0 4px 20px rgba(78, 52, 46, 0.3)' }}
          >
            <Plus size={24} />
          </Button>
        </div>
      </div>

      <EventCreationModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onContinue={handleEventCreated}
      />

      <SFTPSetupWizard
        isOpen={isSFTPWizardOpen}
        onClose={() => setIsSFTPWizardOpen(false)}
        eventData={eventData}
      />
    </DashboardLayout>
  );
}
