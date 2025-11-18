import { Monitor, Home, Paintbrush, Wrench, Briefcase, User } from 'lucide-react-native';

export const CATEGORIES = [
  { id: 'tech', name: 'Tecnología', icon: Monitor, color: 'bg-blue-100', iconColor: '#2563eb' },
  { id: 'home', name: 'Hogar', icon: Home, color: 'bg-orange-100', iconColor: '#ea580c' },
  { id: 'design', name: 'Diseño', icon: Paintbrush, color: 'bg-purple-100', iconColor: '#9333ea' },
  { id: 'repair', name: 'Reparaciones', icon: Wrench, color: 'bg-green-100', iconColor: '#16a34a' },
  { id: 'legal', name: 'Legal', icon: Briefcase, color: 'bg-slate-100', iconColor: '#475569' },
  { id: 'beauty', name: 'Belleza', icon: User, color: 'bg-pink-100', iconColor: '#db2777' },
];

export const PROFESSIONALS = [
  {
    id: '1', 
    name: 'Carlos Méndez',
    title: 'Electricista Certificado',
    rating: 4.8,
    reviews: 124,
    price: '$400 / hora',
    location: 'Centro, CDMX',
    distance: '1.2 km',
    description: 'Especialista en instalaciones residenciales y comerciales con más de 10 años de experiencia. Garantía en todos los trabajos.',
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.4326, lon: -99.1332 }
  },
  {
    id: '2',
    name: 'Ana García',
    title: 'Diseñadora UX/UI',
    rating: 4.9,
    reviews: 89,
    price: '$650 / hora',
    location: 'Roma Norte, CDMX',
    distance: '3.5 km',
    description: 'Creo experiencias digitales intuitivas y atractivas. Diseño de apps móviles y sitios web modernos.',
    portfolio: [
      'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.4194, lon: -99.1626 }
  }
];