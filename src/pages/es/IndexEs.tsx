import { Navigation } from "@/components/Navigation";
import { FooterEs } from "@/components/es/FooterEs";
import { InstantQuoteFormEs } from "@/components/es/InstantQuoteFormEs";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustSignalsEs } from "@/components/es/TrustSignalsEs";
import { TestimonialsEs } from "@/components/es/TestimonialsEs";
import { Button } from "@/components/ui/button";
import { Truck, Train, Ship, Warehouse, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-truck.jpg";
import { SEO } from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LocalBusinessSchema } from "@/components/StructuredData";
import { SEO_DEFAULTS } from "@/lib/constants.es";

const IndexEs = () => {
  const services = [
    {
      icon: Truck,
      title: "Transporte nacional",
      description: "Cobertura en toda España con opciones de entrega en 24h",
      priceRange: "150 € por envío",
      badge: "Más solicitado",
      highlight: true,
    },
    {
      icon: Globe,
      title: "Transporte europeo",
      description: "Logística transfronteriza en más de 25 países europeos",
      priceRange: "450 € por envío",
      badge: "Ideal para exportaciones",
      highlight: true,
    },
    {
      icon: Warehouse,
      title: "Servicios de reubicación",
      description: "Traslados empresariales y de oficinas con el máximo cuidado",
      priceRange: "800 € por proyecto de reubicación",
    },
    {
      icon: Ship,
      title: "Logística global",
      description: "Transporte marítimo y aéreo a todo el mundo",
      priceRange: "Desde 1.200 € por envío internacional",
    },
    {
      icon: Warehouse,
      title: "Soluciones de almacenaje",
      description: "Instalaciones seguras en los principales hubs de España",
      priceRange: "Desde 200 €/mes",
    },
    {
      icon: TrendingUp,
      title: "Consultoría de supply chain",
      description: "Optimizamos tus operaciones logísticas",
      priceRange: "500 € por proyecto",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={SEO_DEFAULTS.title}
        description={SEO_DEFAULTS.description}
        keywords={SEO_DEFAULTS.keywords}
      />
      <LocalBusinessSchema />
      <Navigation />
      <WhatsAppButton />
      
      {/* Hero */}
      <main id="main-content">
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Transporte profesional"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Nueva competencia desde 2022.
                <span className="text-primary block">
                  El partner de reubicación y logística más competitivo de España. Entregando en toda Europa.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Seguimos con hambre. Seguimos siendo competitivos. 3 años ofreciendo los resultados que los clientes españoles se merecen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/es/get-quote">Solicitar presupuesto</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/es/get-quote" state={{ serviceType: "relocation" }}>
                    Planificar reubicación
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Soporte 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Expertos en reubicación</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Carga asegurada</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <InstantQuoteFormEs />
            </div>
          </div>
        </div>
      </section>

      {/* Señales de confianza */}
      <TrustSignalsEs />

      <section id="relocation" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mudanzas y reubicaciones empresariales</h2>
            <p className="text-lg text-muted-foreground">
              Traslada tu negocio por España y Europa con un partner que cuida tu carga como si fuera propia. Planificamos cada paso para que tu operación no se detenga.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Planificación integral</h3>
              <p className="text-sm text-muted-foreground">
                Coordinadores dedicados que planifican tu mudanza desde el primer briefing hasta la entrega final.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Embalaje profesional</h3>
              <p className="text-sm text-muted-foreground">
                Equipos formados, materiales premium y el equipo adecuado para cargas pesadas o delicadas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Operamos fuera de horario</h3>
              <p className="text-sm text-muted-foreground">
                Mudanzas nocturnas o en fin de semana para minimizar el impacto en tus equipos y clientes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Transporte seguro y conforme</h3>
              <p className="text-sm text-muted-foreground">
                Vehículos y rutas pensados para tu tipo de carga, con seguros adaptados a tu perfil de riesgo.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Cobertura paneuropea</h3>
              <p className="text-sm text-muted-foreground">
                Conexiones fiables por carretera e intermodales en los principales corredores europeos.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Comparte tu ruta, fechas y lo que necesitas mover; prepararemos un plan y presupuesto a medida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/es/get-quote" state={{ serviceType: "relocation" }}>
                  Planificar traslado
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/es/contact">
                  Hablar con un especialista
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros servicios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones logísticas completas adaptadas a tu negocio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <TestimonialsEs />

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para optimizar tu logística?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Obtén un presupuesto detallado en minutos. Respondemos en menos de 2 horas en horario laboral.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/es/get-quote">Solicitar presupuesto formal</Link>
          </Button>
        </div>
      </section>
      </main>

      <FooterEs />
    </div>
  );
};

export default IndexEs;
