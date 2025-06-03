import { showBetaFeature } from '@repo/feature-flags';
import { getDictionary } from '@repo/internationalization';
import { LazySection } from '@repo/design-system';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSectionEnhanced } from './components/HeroSectionEnhanced';

// Dynamic imports for performance optimization
const Features = dynamic(() => import('./components/features').then(mod => ({ default: mod.Features })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

const Stats = dynamic(() => import('./components/stats').then(mod => ({ default: mod.Stats })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

const Testimonials = dynamic(() => import('./components/testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

const CTA = dynamic(() => import('./components/cta').then(mod => ({ default: mod.CTA })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

const Newsletter = dynamic(() => import('./components/newsletter').then(mod => ({ default: mod.Newsletter })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

const Journey = dynamic(() => import('./components/journey').then(mod => ({ default: mod.Journey })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

const EnhancedNewsletter = dynamic(() => import('./components/enhanced-newsletter').then(mod => ({ default: mod.EnhancedNewsletter })), {
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )
});

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary.web.home.meta);
};

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const betaFeature = await showBetaFeature();

  return (
    <>
      {betaFeature && (
        <div className="w-full bg-black py-2 text-center text-white">
          Beta feature now available
        </div>
      )}
      
      {/* Hero Section - Loaded immediately for fast FCP */}
      <HeroSectionEnhanced dictionary={dictionary} />
      
      {/* Below-the-fold sections - Direct loading for testing */}
      <Features dictionary={dictionary.web.home} />
      <Journey dictionary={dictionary.web.home} />
      <EnhancedNewsletter dictionary={dictionary.web.home} />
    </>
  );
};

export default Home;
