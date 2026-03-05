import { useState, useEffect } from 'react';
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
  sftpUsername: string;
  sftpPassword: string;
}

const generateUsername = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export function EventCreationModal({ isOpen, onClose, onContinue }: EventCreationModalProps) {
  const [eventName, setEventName] = useState('');
  const [clientNames, setClientNames] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      setEventName('');
      setClientNames('');
      setDate('');
      setLocation('');
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!clientNames.trim() || clientNames.trim().length < 3) {
      newErrors.clientNames = 'Client names must be at least 3 characters';
    }

    if (!date) {
      newErrors.date = 'Event date is required';
    }

    if (!location.trim() || location.trim().length < 3) {
      newErrors.location = 'Location must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const finalEventName = eventName.trim() || `${clientNames} Wedding`;

    onContinue({
      eventName: finalEventName,
      clientNames: clientNames.trim(),
      date,
      location: location.trim(),
      sftpUsername: generateUsername(),
      sftpPassword: generatePassword()
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
          <div>
            <Input
              label="Event Name (Optional)"
              type="text"
              placeholder="Aarav & Diya Wedding"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <p className="mt-1 text-xs text-[#6B4423]">
              Leave blank to auto-generate from client names
            </p>
          </div>

          <div>
            <Input
              label="Client Names"
              type="text"
              placeholder="Aarav & Diya"
              value={clientNames}
              onChange={(e) => setClientNames(e.target.value)}
              required
            />
            {errors.clientNames && (
              <p className="mt-1 text-sm text-red-600">{errors.clientNames}</p>
            )}
          </div>

          <div>
            <Input
              label="Event Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div>
            <Input
              label="Location"
              type="text"
              placeholder="The Oberoi, Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth size="lg">
              Continue to Setup
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

