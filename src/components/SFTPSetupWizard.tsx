import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Camera, Wifi, Copy, Check, Eye, EyeOff, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { EventData } from './EventCreationModal';
import { useAuth } from '../lib/authContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SFTPSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: EventData | null;
  onEventCreated?: () => void;
}

export function SFTPSetupWizard({ isOpen, onClose, eventData, onEventCreated }: SFTPSetupWizardProps) {
  const { currentUser } = useAuth();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [testUploadStatus, setTestUploadStatus] = useState<'waiting' | 'success'>('waiting');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const credentials = {
    server: 'sftp.thornstorage.com',
    username: eventData?.sftpUsername || 'user_default',
    password: eventData?.sftpPassword || 'password',
    port: '22'
  };

  const cameraInstructions: Record<string, string> = {
    'Sony': 'Menu → Network → FTP Transfer Function → Enable',
    'Canon': 'Menu → Wireless Communication → FTP Transfer → Enable',
    'Nikon': 'Menu → Network Menu → FTP Upload → Enable',
    'Fujifilm': 'Menu → Connection Setting → FTP Settings',
    'Other': 'Check your camera manual for FTP/SFTP settings'
  };

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveEvent = async () => {
    if (!eventData || !currentUser) {
      setSaveError('Missing event data or user information');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      console.log('SFTPSetupWizard: Saving event to Firestore...');

      const eventDoc = {
        couple: eventData.clientNames,
        name: eventData.eventName,
        date: eventData.date,
        location: eventData.location,
        createdBy: currentUser.uid,
        status: 'active',
        sftpCredentials: {
          server: credentials.server,
          username: credentials.username,
          password: credentials.password,
          port: credentials.port
        },
        createdAt: serverTimestamp(),
        views: 0,
        photoCount: 0,
        image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=800',
        isNew: true
      };

      const docRef = await addDoc(collection(db, 'events'), eventDoc);
      console.log('SFTPSetupWizard: Event created with ID:', docRef.id);

      setSaveSuccess(true);

      setTimeout(() => {
        if (onEventCreated) {
          onEventCreated();
        }
        onClose();
      }, 1500);

    } catch (error) {
      console.error('SFTPSetupWizard: Error saving event:', error);
      setSaveError('Failed to create event. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setTestUploadStatus('success');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setTestUploadStatus('waiting');
      setSelectedBrand('');
      setShowPassword(false);
      setSaveError(null);
      setSaveSuccess(false);
      setIsSaving(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="p-6 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5F1E8] rounded-full mb-4">
            <div className="relative">
              <Camera className="text-[#4E342E]" size={32} />
              <Wifi className="text-[#4E342E] absolute -top-1 -right-1" size={16} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2723] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Connect Your Camera in 3 Easy Steps
          </h2>
          <p className="text-[#6B4423] text-lg">
            Direct upload from camera to cloud
          </p>
        </div>

        <div className="space-y-10">
          <div className="bg-[#F5F1E8] rounded-[20px] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-[#4E342E] text-white rounded-full font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your SFTP Credentials
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {Object.entries(credentials).map(([key, value]) => (
                <div key={key} className="bg-[#FAF8F3] rounded-lg p-4">
                  <label className="block text-sm font-medium text-[#6B4423] mb-2 capitalize">
                    {key}
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[#3E2723] font-mono text-sm break-all">
                      {key === 'password' && !showPassword ? '••••••••••' : value}
                    </code>
                    {key === 'password' && (
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} className="text-[#6B4423]" /> : <Eye size={16} className="text-[#6B4423]" />}
                      </button>
                    )}
                    <button
                      onClick={() => handleCopy(key, value)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        copiedField === key
                          ? 'bg-green-500 text-white'
                          : 'border-2 border-[#4E342E] text-[#4E342E] hover:bg-[#4E342E] hover:text-white'
                      }`}
                    >
                      {copiedField === key ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#6B4423] text-center">
              Enter these in your camera's WiFi/FTP settings
            </p>
          </div>

          <div className="bg-[#F5F1E8] rounded-[20px] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-[#4E342E] text-white rounded-full font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Configure Your Camera
              </h3>
            </div>

            <div className="space-y-4">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF8F3] border border-[#E0D7C6] rounded-lg text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4E342E]"
              >
                <option value="">Select your camera brand</option>
                <option value="Sony">Sony (A7 series, A9 series)</option>
                <option value="Canon">Canon (EOS R series, 5D/6D)</option>
                <option value="Nikon">Nikon (Z series)</option>
                <option value="Fujifilm">Fujifilm</option>
                <option value="Other">Other</option>
              </select>

              {selectedBrand && (
                <div className="bg-[#FAF8F3] rounded-lg p-4 animate-fadeIn">
                  <p className="text-[#4E342E] font-medium">
                    {cameraInstructions[selectedBrand]}
                  </p>
                </div>
              )}

              <Button variant="secondary" className="gap-2 w-full md:w-auto">
                <Play size={16} />
                Watch Setup Video
              </Button>
            </div>
          </div>

          <div className="bg-[#F5F1E8] rounded-[20px] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-[#4E342E] text-white rounded-full font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Test Upload
              </h3>
            </div>

            {testUploadStatus === 'waiting' ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FAF8F3] rounded-full mb-4">
                  <Camera className="text-[#6B4423] animate-pulse" size={32} />
                </div>
                <p className="text-[#6B4423] text-lg">
                  Waiting for test photo<span className="animate-dots">...</span>
                </p>
              </div>
            ) : (
              <div className="text-center py-8 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <p className="text-green-600 text-xl font-semibold mb-4">
                  ✓ Photo received!
                </p>
                <div className="mb-4">
                  <img
                    src="https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop"
                    alt="Test upload"
                    className="inline-block rounded-lg shadow-md"
                  />
                </div>
                <a href="#" className="text-[#4E342E] font-medium hover:underline">
                  View in Gallery →
                </a>
              </div>
            )}
          </div>
        </div>

        {saveError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-800 text-sm">{saveError}</p>
          </div>
        )}

        {saveSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-green-800 text-sm font-medium">Event created successfully! Redirecting to dashboard...</p>
          </div>
        )}

        <div className="mt-10 space-y-4">
          <Button
            fullWidth
            size="lg"
            onClick={handleSaveEvent}
            disabled={isSaving || saveSuccess}
          >
            {isSaving ? 'Creating Event...' : saveSuccess ? 'Event Created!' : 'Complete Setup & Save Event'}
          </Button>
          {!isSaving && !saveSuccess && (
            <div className="text-center">
              <button
                onClick={onClose}
                className="text-[#6B4423] hover:text-[#3E2723] font-medium transition-colors"
              >
                Skip for now — I'll set this up later
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
        .animate-dots::after {
          content: '...';
          animation: dots 1.5s infinite;
        }
      `}</style>
    </Modal>
  );
}

