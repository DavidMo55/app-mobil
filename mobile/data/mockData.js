import { Briefcase, Home, Monitor, Paintbrush, User, Wrench } from 'lucide-react-native';

export const CATEGORIES = [
  { id: 'tech', name: 'Tecnología', icon: Monitor, color: 'bg-blue-100', iconColor: '#2563eb', bgColor: '#DBEAFE' },
  { id: 'home', name: 'Hogar', icon: Home, color: 'bg-orange-100', iconColor: '#ea580c', bgColor: '#FFEDD5' },
  { id: 'design', name: 'Diseño', icon: Paintbrush, color: 'bg-purple-100', iconColor: '#9333ea', bgColor: '#EDE9FE' },
  { id: 'repair', name: 'Reparaciones', icon: Wrench, color: 'bg-green-100', iconColor: '#16a34a', bgColor: '#D1FAE5' },
  { id: 'legal', name: 'Legal', icon: Briefcase, color: 'bg-slate-100', iconColor: '#475569', bgColor: '#F1F5F9' },
  { id: 'beauty', name: 'Belleza', icon: User, color: 'bg-pink-100', iconColor: '#db2777', bgColor: '#FCE7F3' },
];

export const PROFESSIONALS = [
  // --- TECNOLOGÍA ---
  {
    id: '1',
    categoryId: 'tech',
    name: 'Luis Hernández',
    title: 'Técnico en Computadoras',
    rating: 4.7,
    reviews: 1,
    price: '$350 / hora',
    location: 'Polanco, CDMX',
    distance: '2.3 km',
    description: 'Reparación y optimización de laptops y PCs. Instalación de software y mantenimiento preventivo.',
    portfolio: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1581094271987-22d08aa642b9?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.432, lon: -99.197 },
    reviewsList: [
      { id: 'r1', user: 'Erika R.', date: 'Hace 3 días', rating: 5, comment: 'Muy profesional, mi laptop quedó como nueva.' },
      { id: 'r2', user: 'Carlos M.', date: 'Hace 1 semana', rating: 4, comment: 'Buen servicio, un poco tardado pero valió la pena.' }
    ]
  },
  {
    id: '2',
    categoryId: 'tech',
    name: 'Marcos López',
    title: 'Programador Freelance',
    rating: 4.9,
    reviews: 98,
    price: '$700 / hora',
    location: 'Condesa, CDMX',
    distance: '1.8 km',
    description: 'Desarrollo de aplicaciones web y móviles. Especialista en interfaces limpias y rendimiento.',
    portfolio: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.420, lon: -99.180 },
    reviewsList: [
      { id: 'r1', user: 'Ana P.', date: 'Hace 2 días', rating: 5, comment: 'Increíble trabajo, entendió perfecto lo que necesitaba.' },
      { id: 'r2', user: 'Jorge T.', date: 'Hace 5 días', rating: 5, comment: 'Código muy limpio y entrega a tiempo.' }
    ]
  },

  // --- HOGAR ---
  {
    id: '3',
    categoryId: 'home',
    name: 'Carolina Torres',
    title: 'Organizadora Profesional',
    rating: 4.8,
    reviews: 60,
    price: '$500 / hora',
    location: 'Del Valle, CDMX',
    distance: '4.1 km',
    description: 'Organización de espacios, closets y cocinas. Transformo tu hogar en un espacio funcional.',
    portfolio: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.360, lon: -99.162 },
    reviewsList: [
      { id: 'r1', user: 'Lucía M.', date: 'Ayer', rating: 5, comment: 'Me cambió la vida, mi closet nunca había estado tan ordenado.' },
      { id: 'r2', user: 'Roberto G.', date: 'Hace 2 semanas', rating: 4, comment: 'Muy buenas ideas para aprovechar el espacio.' }
    ]
  },
  {
    id: '4',
    categoryId: 'home',
    name: 'Daniel Romero',
    title: 'Plomero Profesional',
    rating: 4.6,
    reviews: 134,
    price: '$380 / hora',
    location: 'Narvarte, CDMX',
    distance: '2.0 km',
    description: 'Reparación de fugas, instalación de tuberías y mantenimiento general.',
    portfolio: [
      'https://images.unsplash.com/photo-1589739904305-7ab6c19b87bc?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.395, lon: -99.138 },
    reviewsList: [
      { id: 'r1', user: 'Fernando S.', date: 'Hace 1 día', rating: 5, comment: 'Llegó rapidísimo y arregló la fuga en minutos.' },
      { id: 'r2', user: 'Elena V.', date: 'Hace 3 días', rating: 4, comment: 'Buen trabajo, precio justo.' }
    ]
  },

  // --- DISEÑO ---
  {
    id: '5',
    categoryId: 'design',
    name: 'Ana García',
    title: 'Diseñadora UX/UI',
    rating: 4.9,
    reviews: 89,
    price: '$650 / hora',
    location: 'Roma Norte, CDMX',
    distance: '3.5 km',
    description: 'Experiencias digitales intuitivas y atractivas. Diseño moderno para apps y sitios web.',
    portfolio: [
      'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.419, lon: -99.162 },
    reviewsList: [
      { id: 'r1', user: 'Startup X', date: 'Hace 1 semana', rating: 5, comment: 'Diseños de clase mundial. Elevó nuestra marca.' },
      { id: 'r2', user: 'David L.', date: 'Hace 2 semanas', rating: 5, comment: 'Muy creativa y atenta a los detalles.' }
    ]
  },
  {
    id: '6',
    categoryId: 'design',
    name: 'Diego Martínez',
    title: 'Diseñador Gráfico',
    rating: 4.7,
    reviews: 72,
    price: '$450 / hora',
    location: 'Doctores, CDMX',
    distance: '4.0 km',
    description: 'Logotipos, branding y contenido visual profesional para empresas.',
    portfolio: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.409, lon: -99.150 },
    reviewsList: [
      { id: 'r1', user: 'Cafetería Local', date: 'Hace 3 días', rating: 4, comment: 'Nos encantó el logo nuevo.' },
      { id: 'r2', user: 'Mónica J.', date: 'Hace 1 mes', rating: 5, comment: 'Excelente manejo de colores.' }
    ]
  },

  // --- REPARACIONES ---
  {
    id: '7',
    categoryId: 'repair',
    name: 'Carlos Méndez',
    title: 'Electricista Certificado',
    rating: 4.8,
    reviews: 124,
    price: '$400 / hora',
    location: 'Centro, CDMX',
    distance: '1.2 km',
    description: 'Instalaciones residenciales y comerciales. 10+ años de experiencia.',
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.4326, lon: -99.1332 },
    reviewsList: [
      { id: 'r1', user: 'Pedro Pablo', date: 'Hace 2 días', rating: 5, comment: 'Un maestro en lo que hace. Resolvió un corto que nadie más pudo.' },
      { id: 'r2', user: 'Laura G.', date: 'Hace 1 semana', rating: 4, comment: 'Muy amable y limpio al trabajar.' }
    ]
  },
  {
    id: '8',
    categoryId: 'repair',
    name: 'Roberto Salas',
    title: 'Técnico en Refrigeración',
    rating: 4.5,
    reviews: 55,
    price: '$380 / hora',
    location: 'Coyoacán, CDMX',
    distance: '5.6 km',
    description: 'Reparación de refrigeradores, aires acondicionados y congeladores.',
    portfolio: [
      'https://images.unsplash.com/photo-1523419349645-74f7d9a3e7f5?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.350, lon: -99.161 },
    reviewsList: [
      { id: 'r1', user: 'Restaurante El Sol', date: 'Hace 4 días', rating: 5, comment: 'Salvó nuestra mercancía al arreglar el congelador en domingo.' }
    ]
  },

  // --- LEGAL ---
  {
    id: '9',
    categoryId: 'legal',
    name: 'Adriana Ruíz',
    title: 'Abogada Civil',
    rating: 4.9,
    reviews: 150,
    price: '$1200 / hora',
    location: 'Reforma, CDMX',
    distance: '1.1 km',
    description: 'Especialista en casos civiles, asesoría legal y contratos.',
    portfolio: [
      'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.432, lon: -99.150 },
    reviewsList: [
      { id: 'r1', user: 'Grupo Inmobiliario', date: 'Hace 1 semana', rating: 5, comment: 'Asesoría impecable para nuestros contratos.' },
      { id: 'r2', user: 'Sofia L.', date: 'Hace 3 semanas', rating: 5, comment: 'Muy profesional y discreta.' }
    ]
  },
  {
    id: '10',
    categoryId: 'legal',
    name: 'Jorge Pérez',
    title: 'Abogado Penalista',
    rating: 4.8,
    reviews: 90,
    price: '$1400 / hora',
    location: 'Centro, CDMX',
    distance: '2.9 km',
    description: 'Defensa penal, representación legal y asesoría especializada.',
    portfolio: [
      'https://images.unsplash.com/photo-1593113630400-e5213f53ed87?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.430, lon: -99.140 },
    reviewsList: [
      { id: 'r1', user: 'Anónimo', date: 'Hace 1 mes', rating: 5, comment: 'Excelente estrategia legal.' }
    ]
  },

  // --- BELLEZA ---
  {
    id: '11',
    categoryId: 'beauty',
    name: 'María López',
    title: 'Maquillista Profesional',
    rating: 4.9,
    reviews: 210,
    price: '$550 / hora',
    location: 'Roma Sur, CDMX',
    distance: '2.4 km',
    description: 'Maquillaje para eventos, novias y sesiones fotográficas.',
    portfolio: [
      'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.412, lon: -99.160 },
    reviewsList: [
      { id: 'r1', user: 'Novia Feliz', date: 'Hace 2 semanas', rating: 5, comment: 'El maquillaje me duró toda la boda, ¡gracias!' },
      { id: 'r2', user: 'Carla D.', date: 'Hace 1 mes', rating: 5, comment: 'Súper talentosa.' }
    ]
  },
  {
    id: '12',
    categoryId: 'beauty',
    name: 'Sofía Estrada',
    title: 'Estilista',
    rating: 4.6,
    reviews: 140,
    price: '$300 / hora',
    location: 'Juárez, CDMX',
    distance: '1.7 km',
    description: 'Cortes, tintes, balayage y tratamientos capilares.',
    portfolio: [
      'https://images.unsplash.com/photo-1522335660651-a079a1b3fa5a?auto=format&fit=crop&q=80&w=300'
    ],
    coords: { lat: 19.430, lon: -99.150 },
    reviewsList: [
      { id: 'r1', user: 'Mariana P.', date: 'Hace 3 días', rating: 4, comment: 'Me gustó mucho el corte.' }
    ]
  },

  // --- OTROS ---
  {
    id: '13',
    categoryId: 'tech',
    name: 'Ricardo P.',
    title: 'Especialista en Redes',
    rating: 4.7,
    reviews: 44,
    price: '$420 / hora',
    location: 'Santa Fe, CDMX',
    distance: '7.2 km',
    description: 'Configuración de redes WiFi, cableado estructurado y seguridad.',
    portfolio: [
      'https://images.unsplash.com/photo-1581093458791-9a6c6f7c5320?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Oficina Central', date: 'Hace 1 semana', rating: 5, comment: 'Mejoró muchísimo la velocidad del internet.' }
    ],
    coords: { lat: 19.36, lon: -99.26 } 
  },
  {
    id: '14',
    categoryId: 'repair',
    name: 'Jesús Monroy',
    title: 'Carpintero',
    rating: 4.8,
    reviews: 77,
    price: '$500 / hora',
    location: 'Azcapotzalco, CDMX',
    distance: '6.0 km',
    description: 'Muebles a medida, reparaciones de madera y barnizado.',
    portfolio: [
      'https://images.unsplash.com/photo-1585616595152-d132d0e8d27b?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Familia Ruiz', date: 'Hace 2 semanas', rating: 5, comment: 'La mesa quedó preciosa.' }
    ],
    coords: { lat: 19.48, lon: -99.18 }
  },
  {
    id: '15',
    categoryId: 'beauty',
    name: 'Elena Ramos',
    title: 'Cosmetóloga',
    rating: 4.9,
    reviews: 99,
    price: '$350 / hora',
    location: 'San Ángel, CDMX',
    distance: '5.5 km',
    description: 'Faciales, masajes y tratamientos de piel.',
    portfolio: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Andrea L.', date: 'Hace 5 días', rating: 5, comment: 'Muy relajante, mi piel se siente genial.' }
    ],
    coords: { lat: 19.34, lon: -99.19 }
  },
  {
    id: '16',
    categoryId: 'design',
    name: 'Tomás Villalba',
    title: 'Ilustrador',
    rating: 4.7,
    reviews: 61,
    price: '$380 / hora',
    location: 'Cuauhtémoc, CDMX',
    distance: '2.9 km',
    description: 'Ilustración digital y tradicional para libros y publicidad.',
    portfolio: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Editorial J.', date: 'Hace 1 mes', rating: 4, comment: 'Gran estilo artístico.' }
    ],
    coords: { lat: 19.44, lon: -99.15 }
  },
  {
    id: '17',
    categoryId: 'legal',
    name: 'Laura Chávez',
    title: 'Notaria Pública',
    rating: 5.0,
    reviews: 120,
    price: '$1800 / hora',
    location: 'Lomas, CDMX',
    distance: '4.9 km',
    description: 'Trámites notariales, testamentos y escrituras.',
    portfolio: [
      'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Carlos V.', date: 'Hace 2 semanas', rating: 5, comment: 'Trámite rápido y seguro.' }
    ],
    coords: { lat: 19.42, lon: -99.21 }
  },
  {
    id: '18',
    categoryId: 'home',
    name: 'Gerardo Soto',
    title: 'Jardinero Profesional',
    rating: 4.6,
    reviews: 53,
    price: '$280 / hora',
    location: 'Iztapalapa, CDMX',
    distance: '8.3 km',
    description: 'Mantenimiento de jardines, poda y diseño de paisaje.',
    portfolio: [
      'https://images.unsplash.com/photo-1592214027429-5d79a8329c32?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Sra. Rosa', date: 'Hace 1 semana', rating: 5, comment: 'Dejó mi jardín hermoso.' }
    ],
    coords: { lat: 19.35, lon: -99.08 }
  },
  {
    id: '19',
    categoryId: 'repair',
    name: 'Ángel Flores',
    title: 'Albañil',
    rating: 4.5,
    reviews: 88,
    price: '$350 / hora',
    location: 'Tlalpan, CDMX',
    distance: '9.1 km',
    description: 'Construcción, remodelación y acabados.',
    portfolio: [
      'https://images.unsplash.com/photo-1562259949-b4a0c72a45cd?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Arq. Méndez', date: 'Hace 3 semanas', rating: 4, comment: 'Buen trabajador, cumple con los tiempos.' }
    ],
    coords: { lat: 19.29, lon: -99.16 }
  },
  {
    id: '20',
    categoryId: 'tech',
    name: 'Valeria Ruiz',
    title: 'Consultora IT',
    rating: 5.0,
    reviews: 31,
    price: '$900 / hora',
    location: 'Reforma, CDMX',
    distance: '1.0 km',
    description: 'Consultoría estratégica en tecnología para empresas.',
    portfolio: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300'
    ],
    reviewsList: [
      { id: 'r1', user: 'Director General', date: 'Hace 5 días', rating: 5, comment: 'Visión estratégica impecable.' }
    ],
    coords: { lat: 19.43, lon: -99.16 }
  }
];