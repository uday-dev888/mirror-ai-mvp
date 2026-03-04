import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { MoreVertical, Plus } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Photographer',
    phone: '+91 98234 56789',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'active'
  },
  {
    id: 2,
    name: 'Sneha Patel',
    role: 'Assistant Photographer',
    phone: '+91 97123 45678',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'active'
  },
  {
    id: 3,
    name: 'Amit Singh',
    role: 'Video Editor',
    phone: '+91 96543 21098',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'active'
  }
];

export function Settings() {
  const [activeSection, setActiveSection] = useState<string>('account');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sections = [
    { id: 'account', label: 'Account' },
    { id: 'team', label: 'Team Management' },
    { id: 'business', label: 'Business Info' },
    { id: 'sftp', label: 'SFTP Configuration' },
    { id: 'billing', label: 'Billing & Plans' }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-2">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-[#4E342E] text-white'
                        : 'text-[#6B4423] hover:bg-[#F5F1E8]'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="p-6 md:p-8 space-y-8">
              {activeSection === 'account' && (
                <>
                  <div className="flex flex-col items-center md:items-start gap-4">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#E0D7C6]"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Account Settings
                    </h2>

                    <div className="space-y-5">
                      <Input
                        label="Full Name"
                        type="text"
                        defaultValue="Priya Sharma"
                      />

                      <Input
                        label="Email"
                        type="email"
                        defaultValue="priya@example.com"
                      />

                      <Input
                        label="Phone"
                        type="tel"
                        defaultValue="+91 98765 43210"
                      />

                      <div className="pt-4">
                        <button className="text-[#4E342E] font-medium hover:underline">
                          Change Password
                        </button>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#3E2723]">Two-Factor Authentication</p>
                          <p className="text-sm text-[#6B4423]">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                          className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
                            twoFactorEnabled ? 'bg-[#4E342E]' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                              twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#E0D7C6] pt-8">
                    <h3 className="text-xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Your Team (3 photographers)
                    </h3>

                    <div className="space-y-4 mb-6">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 bg-[#F5F1E8] rounded-lg">
                          <div className="flex items-center gap-4">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-[#3E2723]">{member.name}</p>
                              <p className="text-sm text-[#6B4423]">{member.role}</p>
                              <p className="text-sm text-[#6B4423]">{member.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="active">Active</Badge>
                            <button className="p-2 hover:bg-[#FAF8F3] rounded-lg transition-colors">
                              <MoreVertical size={20} className="text-[#6B4423]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="secondary" className="gap-2">
                      <Plus size={20} />
                      Invite Team Member
                    </Button>
                  </div>

                  <div className="border-t border-[#E0D7C6] pt-8">
                    <h3 className="text-xl font-semibold text-[#3E2723] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Business Info
                    </h3>
                    <p className="text-sm text-[#6B4423] mb-6">Public Contact Information</p>

                    <div className="space-y-5">
                      <Input
                        label="Studio Name"
                        type="text"
                        placeholder="Your Photography Studio"
                      />

                      <Input
                        label="Website URL"
                        type="url"
                        placeholder="https://yourwebsite.com"
                      />

                      <Input
                        label="Instagram Handle"
                        type="text"
                        placeholder="@yourstudio"
                      />

                      <Input
                        label="Contact Email"
                        type="email"
                        placeholder="studio@example.com"
                      />

                      <p className="text-sm text-[#6B4423]">
                        Shown to clients in gallery footer
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-4">
                    <button className="text-[#6B4423] hover:text-[#3E2723] font-medium">
                      Cancel
                    </button>
                    <Button variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </>
              )}

              {activeSection !== 'account' && (
                <div className="text-center py-12">
                  <p className="text-[#6B4423]">
                    {sections.find(s => s.id === activeSection)?.label} section coming soon
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
