import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { EventCreationModal, EventData } from '../components/EventCreationModal';
import { SFTPSetupWizard } from '../components/SFTPSetupWizard';
import { Calendar, Upload, Heart, Eye, Share2, QrCode, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

const events = [
  {
    id: 'aarav-diya',
    couple: 'Aarav & Diya',
    date: '12 July, 2024',
    views: 1250,
    image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    isNew: true
  },
  {
    id: 'rohan-ananya',
    couple: 'Rohan & Ananya',
    date: '8 July, 2024',
    views: 980,
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    isNew: false
  },
  {
    id: 'arjun-ishita',
    couple: 'Arjun & Ishita',
    date: '5 July, 2024',
    views: 1150,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    isNew: true
  }
];

export function Dashboard() {
  const { currentUser } = useAuth();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSFTPWizardOpen, setIsSFTPWizardOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);

  const handleEventCreated = (data: EventData) => {
    setEventData(data);
    setIsEventModalOpen(false);
    setIsSFTPWizardOpen(true);
  };

  const getUserDisplayName = () => {
    if (!currentUser) return '';

    if (currentUser.displayName) {
      return currentUser.displayName;
    }

    if (currentUser.email) {
      const emailPrefix = currentUser.email.split('@')[0];
      return emailPrefix
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
    }

    return 'there';
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome back{getUserDisplayName() && `, ${getUserDisplayName()}`}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6B4423] mb-1">Active Events</p>
                <p className="text-3xl font-bold text-[#3E2723]">12</p>
              </div>
              <div className="p-3 bg-[#F5F1E8] rounded-xl">
                <Calendar className="text-[#4E342E]" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6B4423] mb-1">Photos Uploaded</p>
                <p className="text-3xl font-bold text-[#3E2723]">3,450</p>
              </div>
              <div className="p-3 bg-[#F5F1E8] rounded-xl">
                <Upload className="text-[#4E342E]" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6B4423] mb-1">Client Engagement</p>
                <p className="text-3xl font-bold text-[#3E2723]">89%</p>
              </div>
              <div className="p-3 bg-[#F5F1E8] rounded-xl">
                <Heart className="text-[#4E342E]" size={24} />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recent Events
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} hover className="overflow-hidden">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.couple}
                    className="w-full h-48 object-cover"
                  />
                  {event.isNew && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="new">NEW</Badge>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#3E2723] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {event.couple}
                    </h3>
                    <p className="text-sm text-[#6B4423]">{event.date}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#6B4423]">
                    <Eye size={16} />
                    <span>{event.views.toLocaleString()} views</span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/gallery/${event.id}`} className="flex-1">
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

