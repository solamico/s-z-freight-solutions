import { Navigation } from "@/components/Navigation";
import { FooterEs } from "@/components/es/FooterEs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Truck, Globe, Warehouse, Ship, TrendingUp, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { ServicesFaqSchema } from "@/components/StructuredData";
import heroImage from "@/assets/hero-truck.jpg";

const ServicesEs = () => {
  const services = [
    {
      id: "spanish-road",
      icon: Truck,
      title: "Transporte nacional",
      description: "Cobertura total en España con opciones flexibles para todo tipo de carga.",
      coverage: "Todas las provincias y principales ciudades españolas",
      deliveryTime: "24-48 horas en territorio nacional",
      priceRange: "150 € - 800 € por envío (rango habitual)",
      benefits: [
        "Entregas en 24 h a las principales ciudades",
        "Seguimiento GPS en tiempo real",
        "Opciones de control de temperatura",
        "Especialistas en carga frágil",
      ],
    },
    {
      id: "european-road",
      icon: Globe,
      title: "Transporte europeo",
      description: "Logística transfronteriza conectando España con más de 25 países europeos.",
      coverage: "UE27, Reino Unido, Suiza y Noruega",
      deliveryTime: "2-7 días según destino",
      priceRange: "450 € - 2.500 € por envío",
      benefits: [
        "Asistencia en trámites aduaneros",
        "Rutas multi entrega",
        "Opciones exprés",
        "Consolidación de cargas para ahorrar costes",
      ],
    },
    {
      id: "relocation",
      icon: Package,
      title: "Reubicaciones empresariales",
      description: "Traslados profesionales de oficinas y negocios con el máximo cuidado.",
      coverage: "España y principales ciudades europeas",
      deliveryTime: "Calendario según proyecto",
      priceRange: "500 € - 5.000 € por proyecto de reubicación",
      benefits: [
        "Planificación previa al traslado",
        "Manejo especializado de equipamiento IT",
        "Mudanzas fuera de horario",
        "Seguro hasta 500.000 €",
      ],
    },
    {
      id: "global",
      icon: Ship,
      title: "Logística y envíos globales",
      description: "Servicios marítimos y aéreos para comercio internacional.",
      coverage: "Más de 150 países",
      deliveryTime: "5-30 días (aire/marítimo)",
      priceRange: "1.200 € - 15.000 € por envío internacional",
      benefits: [
        "Apoyo dedicado en aduanas",
        "Opciones FCL y LCL",
        "Carga aérea para urgencias",
        "Entrega puerta a puerta",
      ],
    },
    {
      id: "warehousing",
      icon: Warehouse,
      title: "Almacenaje y logística",
      description: "Instalaciones seguras y climatizadas estratégicamente situadas.",
      coverage: "Madrid, Barcelona y Valencia",
      deliveryTime: "Condiciones flexibles",
      priceRange: "200 € - 2.000 €/mes",
      benefits: [
        "Vigilancia 24/7 y CCTV",
        "Zonas climatizadas",
        "Sistemas de gestión de inventario",
        "Contratos a corto y largo plazo",
      ],
    },
    {
      id: "consultancy",
      icon: TrendingUp,
      title: "Consultoría de cadena de suministro",
      description: "Análisis experto para reducir costes y mejorar la eficiencia.",
      coverage: "Consultoría remota y presencial",
      deliveryTime: "Según proyecto",
      priceRange: "500 € - 5.000 € por proyecto",
      benefits: [
        "Análisis de reducción de costes",
        "Estrategias de optimización de rutas",
        "Consolidación de proveedores",
        "Integración tecnológica",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Servicios de logística y transporte"
        description="Transporte nacional, europeo, almacenaje, envíos globales y consultoría logística. Presupuestos en minutos."
        keywords="transporte, logística, almacenaje, mudanzas empresariales"
      />
      <Navigation />
      <WhatsAppButton />
      
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-left">
            <PageBreadcrumbs items={[{ label: "Inicio", to: "/es" }, { label: "Servicios" }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestros servicios</h1>
              <p className="text-xl text-muted-foreground">
                Soluciones logísticas completas para empresas modernas. Elige el servicio que mejor se adapte a tus rutas, carga y presupuesto.
              </p>
            </div>
            <div className="relative h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-md">
              <img
                src={heroImage}
                alt="Camiones de transporte en ruta"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lista */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="border rounded-lg px-6 bg-card hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Cobertura</h4>
                      <p>{service.coverage}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Tiempo de entrega</h4>
                      <p>{service.deliveryTime}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Beneficios clave</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-sm text-muted-foreground">Rango de precio: </span>
                      <span className="text-xl font-bold text-primary">{service.priceRange}</span>
                    </div>
                    <Button asChild>
                      <Link to="/es/get-quote" state={{ serviceType: service.id }}>
                        Solicitar presupuesto
                      </Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ServicesFaqSchema />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas frecuentes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Respuestas rápidas sobre nuestros servicios de transporte, logística y reubicación.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Logística general</h3>
              <div>
                <h4 className="font-semibold mb-1">¿Qué regiones cubrís?</h4>
                <p className="text-sm text-muted-foreground">
                  Operamos desde España y cubrimos los principales corredores europeos: España, Portugal, Francia, Alemania, Benelux, Italia y Reino Unido.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">¿Qué tipo de mercancías transportáis?</h4>
                <p className="text-sm text-muted-foreground">
                  Paletizado, cargas completas o parciales, maquinaria, retail, e-commerce y carga industrial. Para mercancía especial confirmamos la solución más segura.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">¿Mis envíos están asegurados?</h4>
                <p className="text-sm text-muted-foreground">
                  Sí, contamos con cobertura estándar y podemos ampliar el seguro para cargas de alto valor.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">¿Cómo solicito un presupuesto?</h4>
                <p className="text-sm text-muted-foreground">
                  Completa el formulario online, envíanos un email o llámanos con origen, destino, fechas, peso y requisitos especiales.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Mudanzas y reubicaciones</h3>
              <div>
                <h4 className="font-semibold mb-1">¿Qué tipo de mudanzas gestionáis?</h4>
                <p className="text-sm text-muted-foreground">
                  Oficinas, almacenes y espacios industriales. También mudanzas residenciales vinculadas a proyectos corporativos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">¿Trabajáis fuera de horario?</h4>
                <p className="text-sm text-muted-foreground">
                  Sí, planificamos mudanzas nocturnas o en fin de semana para minimizar interrupciones.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">¿Proporcionáis materiales de embalaje?</h4>
                <p className="text-sm text-muted-foreground">
                  Ofrecemos cajas, cajas especiales, etiquetas y servicios de embalaje/desembalaje.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">¿Qué información necesitáis para presupuestar?</h4>
                <p className="text-sm text-muted-foreground">
                  Direcciones, fechas, tamaño aproximado, equipos especiales, accesos y si necesitáis embalaje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas una solución a medida?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cada negocio es único. Cuéntanos tus requisitos y diseñaremos un plan logístico personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/es/get-quote">Obtener presupuesto detallado</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/es/contact">Contactar con el equipo</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterEs />
    </div>
  );
};

export default ServicesEs;
