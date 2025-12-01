import { Navigation } from "@/components/Navigation";
import { FooterEs } from "@/components/es/FooterEs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, MapPin, Clock, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";

export const RelocationEs = () => {
  const features = [
    {
      icon: MapPin,
      title: "Cobertura nacional e internacional",
      description: "Reubicaciones dentro de España y en toda Europa con un único proveedor de confianza.",
    },
    {
      icon: Clock,
      title: "Mudanzas exprés",
      description: "Opciones de 24-48h para traslados urgentes con planificación prioritaria.",
    },
    {
      icon: Shield,
      title: "Seguro completo",
      description: "Protección integral para tu mobiliario y equipos durante el traslado.",
    },
    {
      icon: Users,
      title: "Equipos especializados",
      description: "Personal formado en el manejo de equipos sensibles y mobiliario de oficina.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Evaluación",
      description: "Visita in situ para valorar el volumen y requisitos específicos.",
    },
    {
      number: "02",
      title: "Planificación",
      description: "Propuesta detallada con cronograma y asignación de recursos.",
    },
    {
      number: "03",
      title: "Preparación",
      description: "Embalaje profesional y protección de todos los elementos.",
    },
    {
      number: "04",
      title: "Ejecución",
      description: "Traslado eficiente con seguimiento en tiempo real.",
    },
    {
      number: "05",
      title: "Instalación",
      description: "Montaje y distribución según planos en el nuevo espacio.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Reubicación de oficinas y negocios | S&Z Trading"
        description="Servicio integral de mudanzas empresariales en España y Europa. Planificación profesional para minimizar tiempos de inactividad."
        keywords="mudanza de oficinas, reubicación empresarial, traslado de negocio"
      />
      <Navigation />
      <WhatsAppButton />
      
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-left">
            <PageBreadcrumbs items={[
              { label: "Inicio", to: "/es" },
              { label: "Reubicación" }
            ]} />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Reubicación profesional de empresas</h1>
            <p className="text-xl text-muted-foreground">
              Soluciones completas para el traslado de oficinas, almacenes y espacios comerciales en España y Europa.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/es/get-quote?service=relocation">Solicitar presupuesto</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#como-funciona">Ver proceso</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Soluciones adaptadas a cada negocio</h2>
            <p className="text-lg text-muted-foreground">
              Desde pequeñas oficinas hasta sedes corporativas, gestionamos tu traslado con el máximo cuidado y profesionalidad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6 mx-auto">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Mudanzas de oficinas</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Traslado de mobiliario y equipos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Desmontaje y montaje de puestos de trabajo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Gestión de documentación confidencial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Reubicación de equipos IT</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6 mx-auto">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Reubicación industrial</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Traslado de maquinaria pesada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Logística para almacenes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Gestión de inventario</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Almacenamiento temporal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro proceso de reubicación</h2>
            <p className="text-lg text-muted-foreground">
              Un enfoque meticuloso para garantizar una transición sin problemas
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Por qué elegirnos para tu reubicación</h2>
              <p className="text-muted-foreground mb-8">
                Con más de 2 años de experiencia en reubicaciones empresariales, ofrecemos un servicio integral que minimiza el tiempo de inactividad y el estrés asociado con las mudanzas corporativas.
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link to="/es/contact">Habla con un experto</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Solicita una consulta sin compromiso</h3>
              <p className="text-muted-foreground mb-6">
                Cuéntanos sobre tu próximo proyecto de reubicación y te haremos una propuesta personalizada.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de reubicación</label>
                  <select className="w-full px-4 py-2 border rounded-md bg-background">
                    <option>Oficina</option>
                    <option>Almacén</option>
                    <option>Comercio</option>
                    <option>Industrial</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">M2 aproximados</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-md bg-background" placeholder="Ej: 150 m²" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha prevista</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-md bg-background" placeholder="Seleccionar fecha" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tu correo electrónico</label>
                  <input type="email" className="w-full px-4 py-2 border rounded-md bg-background" placeholder="tunombre@empresa.com" />
                </div>
                
                <Button className="w-full">Solicitar consulta</Button>
                
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Al enviar, aceptas nuestra política de privacidad. No compartimos tus datos con terceros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Preparado para tu próxima reubicación?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Nuestro equipo está listo para ayudarte a planificar una transición sin estrés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/es/get-quote?service=relocation">Solicitar presupuesto</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
              <Link to="/es/contact">Contactar con un asesor</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterEs />
    </div>
  );
};

export default RelocationEs;
