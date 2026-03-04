import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Search, Download, Menu, User } from 'lucide-react';

const photos = [
  { id: 1, url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: true, height: 'h-64' },
  { id: 2, url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-80' },
  { id: 3, url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: true, height: 'h-72' },
  { id: 4, url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-96' },
  { id: 5, url: 'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-64' },
  { id: 6, url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: true, height: 'h-72' },
  { id: 7, url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-80' },
  { id: 8, url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-96' },
  { id: 9, url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-64' },
  { id: 10, url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-72' },
  { id: 11, url: 'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-80' },
  { id: 12, url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-96' },
  { id: 13, url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-64' },
  { id: 14, url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-72' },
  { id: 15, url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600', isNew: false, height: 'h-80' }
];

export function ClientGallery() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <header className="sticky top-0 z-50 bg-[#FAF8F3]/95 backdrop-blur-sm border-b border-[#E0D7C6] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />

          <h1 className="hidden md:block text-xl font-semibold text-[#3E2723]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Aarav & Diya Wedding
          </h1>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors duration-200">
              <Search size={20} className="text-[#4E342E]" />
            </button>
            <button className="p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors duration-200">
              <Download size={20} className="text-[#4E342E]" />
            </button>
            <button className="p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors duration-200">
              <Menu size={20} className="text-[#4E342E]" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#3E2723] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome to Aarav & Diya's wedding gallery
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-[#6B4423]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-medium">Live • Photos uploading in real-time</span>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative break-inside-avoid group">
              <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={photo.url}
                  alt={`Wedding photo ${photo.id}`}
                  className={`w-full ${photo.height} object-cover group-hover:scale-105 transition-transform duration-300`}
                />
                {photo.isNew && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="new">NEW</Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#FAF8F3]/95 backdrop-blur-sm border-t border-[#E0D7C6] px-4 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="secondary" size="sm" className="gap-2">
            <User size={16} />
            <span className="hidden md:inline">Find My Photos</span>
          </Button>

          <div className="text-sm font-medium text-[#3E2723]">
            234 photos
          </div>

          <Button variant="primary" size="sm" className="gap-2">
            <Download size={16} />
            <span className="hidden md:inline">Download Favorites</span>
          </Button>
        </div>
      </div>

      <footer className="bg-[#FAF8F3] border-t border-[#E0D7C6] px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <p className="text-sm text-[#6B4423]">
            Questions?{' '}
            <a href="mailto:priya@example.com" className="text-[#4E342E] hover:underline font-medium">
              Email Photographer
            </a>
            {' | '}
            <a href="#" className="text-[#4E342E] hover:underline font-medium">
              Visit Website
            </a>
            {' | '}
            <a href="#" className="text-[#4E342E] hover:underline font-medium">
              Instagram
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
