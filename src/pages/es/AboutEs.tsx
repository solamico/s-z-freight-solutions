import { Navigation } from "@/components/Navigation";
import { FooterEs } from "@/components/es/FooterEs";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";

const AboutEs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Sobre S&Z Trading International"
        description="Tu socio logístico de confianza en España y Europa. Transporte, reubicaciones y logística integral desde 2022."
        keywords="sobre logística, empresa de transporte, S&Z Trading"
      />
      <Navigation />
      <WhatsAppButton />
      
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-left">
            <PageBreadcrumbs items={[{ label: "Inicio", to: "/es" }, { label: "Sobre" }]} />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre S&Z TRADING INTERNATIONAL S.C.A.</h1>
            <p className="text-xl text-muted-foreground">
              Tu socio logístico en España y Europa desde 2022
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Nuestra historia</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Fundada en 2022, S&Z TRADING INTERNATIONAL S.C.A. se ha consolidado rápidamente como un proveedor de logística fiable en España y Europa. Empezamos con el transporte por carretera y hoy ofrecemos soluciones integrales para empresas de todos los tamaños.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Nuestra reputación se basa en tres pilares: fiabilidad, transparencia y servicio al cliente. Cada envío se gestiona con cuidado y cada cliente recibe atención personalizada, lo que nos ha permitido crear relaciones duraderas en múltiples sectores.
            </p>
            <p className="text-lg text-muted-foreground">
              Con una flota moderna y una red de socios de confianza, cubrimos desde entregas locales hasta proyectos internacionales. Nos comprometemos a ofrecer servicios eficientes y competitivos sin renunciar a la calidad.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por qué elegirnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: "Calidad certificada",
                description: "ISO 9001 y cobertura de seguro hasta 250.000 € por envío",
              },
              {
                icon: Users,
                title: "Soporte dedicado",
                description: "Gestores personales y servicio 24/7 para todos los clientes",
              },
              {
                icon: Globe,
                title: "Cobertura amplia",
                description: "Operamos en más de 25 países europeos con expertise local",
              },
              {
                icon: TrendingUp,
                title: "Eficiencia de costes",
                description: "Tarifas competitivas sin costes ocultos. Ahorro medio del 20%",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { value: "3+", label: "Años operando" },
              { value: "200+", label: "Clientes activos" },
              { value: "25+", label: "Países atendidos" },
              { value: "98%", label: "Entregas puntuales" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Certificaciones y cumplimiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-2">ISO 9001:2015</div>
                <p className="text-sm text-muted-foreground">Gestión de calidad</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-2">AEO</div>
                <p className="text-sm text-muted-foreground">Operador Económico Autorizado</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold mb-2">Chep Associate</div>
                <p className="text-sm text-muted-foreground">CX/HX/Timo/Trans</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Registro: VAT/NIF ESF70700547</p>
            <p className="font-bold text-base">Cobertura asegurada hasta 250.000 € por envío</p>
          </div>
        </div>
      </section>

      <FooterEs />
    </div>
  );
};

export default AboutEs;
