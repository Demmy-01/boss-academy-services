import { createBrowserRouter, Navigate } from 'react-router';
import { Link } from 'react-router';
import Root from './Root';
import ServicePage from './pages/ServicePage';
import AdminDashboard from './pages/AdminDashboard';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/study-europe"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold inline-block hover:bg-primary/90 transition-colors"
        >
          Go to Services
        </Link>
      </div>
    </div>
  );
}

const serviceRoutes = [
  'study-europe',
  'study-uk',
  'study-canada',
  'citizen-brazil',
  'proof-of-funds',
  'school-excursions',
  'visit-europe',
  'visit-uk',
  'visit-canada',
  'visit-china',
  'visit-australia',
  'visit-kenya',
  'visit-zanzibar',
  'group-trip-kigali',
  'ielts',
  'celpip-tutorial',
  'french-language',
  'chinese-language',
  'pre-tutorial',
  'travel-insurance',
];

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      // Redirect root to first service
      { index: true, element: <Navigate to="/study-europe" replace /> },
      // Each service gets its own clean URL
      ...serviceRoutes.map((slug) => ({
        path: slug,
        element: <ServicePage slug={slug} />,
      })),
      // Legacy /services/:slug redirect support
      { path: 'services/:slug', element: <ServicePage /> },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
]);
