import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TrendingUp, Download, Trophy } from 'lucide-react';

const topEvents = [
  {
    id: 1,
    couple: 'Aarav & Diya',
    views: 234,
    engagement: 89,
    image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
  },
  {
    id: 2,
    couple: 'Rohan & Ananya',
    views: 189,
    engagement: 82,
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
  },
  {
    id: 3,
    couple: 'Arjun & Ishita',
    views: 156,
    engagement: 78,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
  }
];

export function Analytics() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Analytics & Insights
          </h1>

          <div className="flex items-center gap-3">
            <select className="px-4 py-2 bg-[#FAF8F3] border border-[#E0D7C6] rounded-lg text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4E342E]">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
            <Button variant="secondary" className="gap-2">
              <Download size={16} />
              <span className="hidden md:inline">Download Report</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="p-6">
            <div className="space-y-3">
              <p className="text-sm text-[#6B4423]">Events Completed</p>
              <p className="text-3xl font-bold text-[#3E2723]">12</p>
              <div className="h-12">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <polyline
                    points="0,30 20,25 40,28 60,20 80,22 100,15"
                    fill="none"
                    stroke="#4E342E"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-3">
              <p className="text-sm text-[#6B4423]">Photos Delivered</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-[#3E2723]">3,450</p>
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-3">
              <p className="text-sm text-[#6B4423]">Client Engagement</p>
              <p className="text-3xl font-bold text-[#3E2723]">89%</p>
              <div className="relative w-16 h-16">
                <svg className="transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#E0D7C6"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#4E342E"
                    strokeWidth="3"
                    strokeDasharray="89 11"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-3">
              <p className="text-sm text-[#6B4423]">Avg Gallery Views</p>
              <p className="text-3xl font-bold text-[#3E2723]">234</p>
              <p className="text-sm text-[#6B4423]">per event</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gallery Engagement Over Time
          </h2>

          <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-[#E0D7C6] p-4">
            {[45, 62, 55, 78, 68, 85, 75, 92, 88, 95, 89, 96].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-[#4E342E] to-[#6B4423] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                style={{ height: `${height}%` }}
                title={`Week ${index + 1}: ${height}%`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 px-4 text-xs text-[#6B4423]">
            <span>Week 1</span>
            <span>Week 6</span>
            <span>Week 12</span>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Top Performing Events
              </h2>

              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-[#F5F1E8] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#FFD54F] rounded-full">
                      {index === 0 ? (
                        <Trophy size={16} className="text-[#3E2723]" />
                      ) : (
                        <span className="font-bold text-[#3E2723]">#{index + 1}</span>
                      )}
                    </div>

                    <img
                      src={event.image}
                      alt={event.couple}
                      className="w-16 h-12 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {event.couple}
                      </p>
                      <p className="text-sm text-[#6B4423]">
                        {event.views} views • {event.engagement}% engagement
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Storage Insights
              </h2>

              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#E0D7C6"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#4E342E"
                      strokeWidth="3"
                      strokeDasharray="45 55"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#3E2723]">45%</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2 mb-6">
                <p className="text-lg font-semibold text-[#3E2723]">45GB / 100GB</p>
                <p className="text-sm text-[#6B4423]">55GB remaining</p>
              </div>

              <Button variant="primary" fullWidth>
                Upgrade Plan
              </Button>
            </Card>
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-[#3E2723] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Quick Stats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-[#6B4423] mb-2">Avg Upload Time</p>
              <p className="text-2xl font-bold text-[#3E2723]">3.2 sec</p>
            </div>

            <div className="text-center border-l border-r border-[#E0D7C6] md:border-l md:border-r-0 lg:border-r">
              <p className="text-sm text-[#6B4423] mb-2">Peak Hours</p>
              <p className="text-2xl font-bold text-[#3E2723]">8-10 PM</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#6B4423] mb-2">Download Rate</p>
              <p className="text-2xl font-bold text-[#3E2723]">45%</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
