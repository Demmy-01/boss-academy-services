import { createBrowserRouter } from 'react-router';
import { Link } from 'react-router';
import Root from './Root';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold inline-block hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'services/:slug', Component: ServicePage },
      { path: '*', Component: NotFound },
    ],
  },
]);
