import { SEODashboard } from '@/components/SEODashboard';
import heroImage from '@/assets/hero-seo.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div 
          className="h-96 bg-cover bg-center brutal-border-thick"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="space-y-6 text-white max-w-4xl px-6">
            <h1 className="text-6xl md:text-8xl font-black font-mono uppercase tracking-widest leading-none">
              SEO AUDIT
              <br />
              MACHINE
            </h1>
            <p className="text-xl md:text-2xl font-mono font-bold uppercase tracking-wider max-w-2xl mx-auto">
              PROFESSIONAL SEO REPORTS IN 2 MINUTES
              <br />
              NO BS. JUST RESULTS.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary text-primary-foreground p-8 brutal-border brutal-shadow transform -rotate-1">
              <h3 className="text-2xl font-black font-mono uppercase mb-4">FAST AF</h3>
              <p className="font-mono font-bold">Complete SEO audits in under 2 minutes. No waiting around.</p>
            </div>
            
            <div className="bg-secondary text-secondary-foreground p-8 brutal-border brutal-shadow transform rotate-1">
              <h3 className="text-2xl font-black font-mono uppercase mb-4">CLIENT READY</h3>
              <p className="font-mono font-bold">Professional PDF reports that impress clients instantly.</p>
            </div>
            
            <div className="bg-accent text-accent-foreground p-8 brutal-border brutal-shadow transform -rotate-1">
              <h3 className="text-2xl font-black font-mono uppercase mb-4">NO FLUFF</h3>
              <p className="font-mono font-bold">Critical issues and actionable recommendations only.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Generator */}
      <div className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-widest mb-6">
              GENERATE REPORT
            </h2>
            <p className="text-xl font-mono font-bold uppercase tracking-wider">
              DROP YOUR URL. GET YOUR AUDIT. CLOSE YOUR CLIENT.
            </p>
          </div>
          <SEODashboard />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono font-bold uppercase tracking-wider">
            © 2024 SEO AUDIT MACHINE - BRUTALLY EFFECTIVE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;