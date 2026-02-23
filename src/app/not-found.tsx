import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Annadaata Agro Industries',
  description: 'The page you are looking for does not exist. Return to our home page.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 bg-background">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">
          404 - Rice Field Not Found
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
          Oops! It seems like you've wandered into unplanted fields. The page you're looking for doesn't exist.
        </p>
        <div className="mt-16">
          <Link
            href="/"
            className="px-8 py-3 text-lg font-accent rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}