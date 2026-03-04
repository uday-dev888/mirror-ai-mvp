import { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { Calendar } from 'lucide-react';

interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (eventData: EventData) => void;
}

export interface EventData {
  eventName: string;
  clientNames: string;
  date: string;
  location: string;
}

export function EventCreationModal({ isOpen, onClose, onContinue }: EventCreationModalProps) {
  const [eventName, setEventName] = useState('');
  const [clientNames, setClientNames] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      eventName,
      clientNames,
      date,
      location
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5F1E8] rounded-full mb-4">
            <Calendar className="text-[#4E342E]" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-[#3E2723] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create New Event
          </h2>
          <p className="text-[#6B4423]">
            Let's set up your new wedding event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Event Name"
            type="text"
            placeholder="Aarav & Diya Wedding"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <Input
            label="Client Names"
            type="text"
            placeholder="Aarav & Diya"
            value={clientNames}
            onChange={(e) => setClientNames(e.target.value)}
            required
          />

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <Input
            label="Location"
            type="text"
            placeholder="Mumbai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <div className="pt-4">
            <Button type="submit" fullWidth size="lg">
              Generate SFTP Credentials
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
