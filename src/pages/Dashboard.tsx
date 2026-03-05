import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { EventCreationModal, EventData } from '../components/EventCreationModal';
import { SFTPSetupWizard } from '../components/SFTPSetupWizard';
import { Calendar, Upload, Heart, Eye, Share2, QrCode, Plus, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/authContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface Event {
  id: string;
  couple: string;
  date: string;
  views: number;
  image: string;
  isNew: boolean;
  createdBy: string;
  createdAt: any;
}

export function Dashboard() {
  const { currentUser } = useAuth();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSFTPWizardOpen, setIsSFTPWizardOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeEvents: 0,
    photosUploaded: 0,
    clientEngagement: 0
  });

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    console.log('Dashboard: Fetching events for user:', currentUser.uid);

    const timeoutId = setTimeout(() => {
      console.warn('Dashboard: Query timeout after 5 seconds');
      setLoading(false);
    }, 5000);

    try {
      const eventsQuery = query(
        collection(db, 'events'),
        where('createdBy', '==', currentUser.uid)
      );

      const unsubscribe = onSnapshot(
        eventsQuery,
        (snapshot) => {
          clearTimeout(timeoutId);
          console.log('Dashboard: Query success. Found', snapshot.size, 'events');

          const eventsData: Event[] = [];
          snapshot.forEach((doc) => {
            eventsData.push({ id: doc.id, ...doc.data() } as Event);
          });

          eventsData.sort((a, b) => {
            const timeA = a.createdAt?.toMillis?.() || 0;
            const timeB = b.createdAt?.toMillis?.() || 0;
            return timeB - timeA;
          });

          setEvents(eventsData);
          setStats({
            activeEvents: eventsData.length,
            photosUploaded: eventsData.reduce((total, event) => total + (event.views || 0), 0),
            clientEngagement: eventsData.length > 0 ? Math.round(eventsData.reduce((total, event) => total + (event.views || 0), 0) / eventsData.length) : 0
          });
          setLoading(false);
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error('Dashboard: Error fetching events:', error);
          setEvents([]);
          setLoading(false);
        }
      );

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Dashboard: Error setting up query:', error);
      setEvents([]);
      setLoading(false);
    }
  }, [currentUser]);

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
                <p className="text-3xl font-bold text-[#3E2723]">
                  {loading ? '...' : stats.activeEvents}
                </p>
              </div>
              <div className="p-3 bg-[#F5F1E8] rounded-xl">
                <Calendar className="text-[#4E342E]" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6B4423] mb-1">Total Views</p>
                <p className="text-3xl font-bold text-[#3E2723]">
                  {loading ? '...' : stats.photosUploaded.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-[#F5F1E8] rounded-xl">
                <Eye className="text-[#4E342E]" size={24} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#6B4423] mb-1">Avg. Views per Event</p>
                <p className="text-3xl font-bold text-[#3E2723]">
                  {loading ? '...' : stats.clientEngagement}
                </p>
              </div>
              <div className="p-3 bg-[#F5F1E8] rounded-xl">
                <Heart className="text-[#4E342E]" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6F47]"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-[#F5F1E8] rounded-full flex items-center justify-center mb-6">
              <ImageIcon className="text-[#8B6F47]" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-[#3E2723] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              No Events Yet
            </h2>
            <p className="text-[#6B4423] text-center max-w-md mb-8">
              Create your first event to start sharing photos with clients in real-time
            </p>
            <Button
              onClick={() => setIsEventModalOpen(true)}
              variant="primary"
              className="px-8 py-3 text-lg"
            >
              <Plus size={20} className="mr-2" />
              Create Your First Event
            </Button>
          </div>
        ) : (
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
        )}

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
        onClose={() => {
          setIsSFTPWizardOpen(false);
          setEventData(null);
        }}
        eventData={eventData}
        onEventCreated={() => {
          console.log('Dashboard: Event created successfully');
        }}
      />
    </DashboardLayout>
  );
}


