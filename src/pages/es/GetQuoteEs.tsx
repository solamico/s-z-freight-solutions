import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { FooterEs } from "@/components/es/FooterEs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Truck, MapPin, Package, User, CheckCircle, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { BUSINESS_INFO, SERVICE_RATES, QUOTE_CALCULATION, SPECIAL_REQUIREMENTS } from "@/lib/constants.es";

const steps = [
  "Servicio",
  "Ruta",
  "Carga",
  "Contacto",
];

const GetQuoteEs = () => {
  const { toast } = useToast();
  const location = useLocation();
  const initialData = location.state || {};
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    serviceType: initialData.serviceType || "",
    origin: initialData.origin || "",
    destination: initialData.destination || "",
    pickupDate: "",
    deliveryDate: "",
    weight: initialData.weight || "",
    length: "",
    width: "",
    height: "",
    specialRequirements: [] as string[],
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
  });

  const serviceOptions = [
    { value: "spanish-road", label: "Transporte nacional" },
    { value: "european-road", label: "Transporte europeo" },
    { value: "relocation", label: "Reubicación empresarial" },
    { value: "global", label: "Logística global" },
    { value: "warehousing", label: "Almacenaje" },
    { value: "consultancy", label: "Consultoría supply chain" },
  ];

  const calculateEstimate = () => {
    const weightFactor = parseFloat(formData.weight) * QUOTE_CALCULATION.weightFactor;
    const baseRate = SERVICE_RATES[formData.serviceType as keyof typeof SERVICE_RATES] || 300;
    const specialReqCost = formData.specialRequirements.length * QUOTE_CALCULATION.specialRequirementCost;
    
    const total = baseRate + weightFactor + specialReqCost;
    setEstimatedCost(Math.round(total));
  };

  const validateStep = (currentStep: number): boolean => {
    setErrors({});
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.serviceType) {
          newErrors.serviceType = "El tipo de servicio es obligatorio";
        }
        break;
      case 2:
        if (!formData.origin || formData.origin.length < 2) {
          newErrors.origin = "El origen es obligatorio";
        }
        if (!formData.destination || formData.destination.length < 2) {
          newErrors.destination = "El destino es obligatorio";
        }
        break;
      case 3:
        if (!formData.weight) {
          newErrors.weight = "El peso es obligatorio";
        } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
          newErrors.weight = "El peso debe ser un número positivo";
        }
        break;
      case 4:
        if (!formData.contactName || formData.contactName.length < 2) {
          newErrors.contactName = "El nombre debe tener al menos 2 caracteres";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Correo electrónico no válido";
        }
        if (!formData.phone || formData.phone.length < 7) {
          newErrors.phone = "El teléfono debe tener al menos 7 caracteres";
        }
        break;
      default:
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.serviceType !== "";
      case 2:
        return formData.origin && formData.destination;
      case 3:
        return formData.weight !== "";
      case 4:
        return formData.contactName && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
      if (step === 3) {
        calculateEstimate();
      }
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast({
        title: "Error de validación",
        description: "Revisa los campos e inténtalo de nuevo.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const insertData = {
        service_type: formData.serviceType,
        origin: formData.origin,
        destination: formData.destination,
        pickup_date: formData.pickupDate && formData.pickupDate.trim() !== "" ? formData.pickupDate : null,
        delivery_date: formData.deliveryDate && formData.deliveryDate.trim() !== "" ? formData.deliveryDate : null,
        weight: parseFloat(formData.weight),
        length: formData.length && formData.length.trim() !== "" ? parseFloat(formData.length) : null,
        width: formData.width && formData.width.trim() !== "" ? parseFloat(formData.width) : null,
        height: formData.height && formData.height.trim() !== "" ? parseFloat(formData.height) : null,
        special_requirements: formData.specialRequirements.length > 0 ? formData.specialRequirements : null,
        contact_name: formData.contactName,
        company_name: formData.companyName && formData.companyName.trim() !== "" ? formData.companyName : null,
        email: formData.email,
        phone: formData.phone,
        estimated_cost: estimatedCost ?? null,
      };

      console.log("Submitting quote data:", insertData);

      const { data, error } = await supabase
        .from("quotes")
        .insert([insertData])
        .select();

      console.log("Supabase response - data:", data, "error:", error);

      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.error("No data returned from insert - RLS policy may be blocking");
        throw new Error("Insert succeeded but no data returned");
      }

      console.log("Quote successfully inserted:", data[0]);

      toast({
        title: "¡Solicitud enviada!",
        description: "Nuestro equipo te contactará en menos de 2 horas.",
      });
      setStep(5);
    } catch (error: any) {
      console.error("Quote submission error:", error);
      toast({
        title: "Error",
        description: error?.message || "No pudimos registrar tu solicitud. Inténtalo más tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const specialRequirementOptions = SPECIAL_REQUIREMENTS;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Truck className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Selecciona el tipo de servicio</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceOptions.map((service) => (
                <Card
                  key={service.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.serviceType === service.value ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, serviceType: service.value })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{service.label}</span>
                      {formData.serviceType === service.value && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {errors.serviceType && <p className="text-sm text-destructive mt-4">{errors.serviceType}</p>}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Detalles de la ruta</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Ciudad / punto de origen</label>
                <Input
                  placeholder="Ej. Madrid"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
                {errors.origin && <p className="text-sm text-destructive mt-1">{errors.origin}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Ciudad / punto de destino</label>
                <Input
                  placeholder="Ej. París"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
                {errors.destination && <p className="text-sm text-destructive mt-1">{errors.destination}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Fecha de recogida</label>
                <Input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Fecha preferida de entrega</label>
                <Input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Detalles de la carga</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Peso (kg)</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
                {errors.weight && <p className="text-sm text-destructive mt-1">{errors.weight}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Largo (cm)</label>
                <Input
                  type="number"
                  placeholder="200"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Ancho (cm)</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Alto (cm)</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Requisitos especiales</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {specialRequirementOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.specialRequirements.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            specialRequirements: [...formData.specialRequirements, option],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            specialRequirements: formData.specialRequirements.filter((r) => r !== option),
                          });
                        }
                      }}
                    />
                    <label htmlFor={option} className="text-sm cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Datos de contacto</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Nombre completo</label>
                <Input
                  placeholder="Nombre y apellidos"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
                {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Empresa (opcional)</label>
                <Input
                  placeholder="Nombre de la empresa"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Correo electrónico</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Teléfono</label>
                <Input
                  placeholder="+34 600 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-6 py-16">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold">¡Gracias por confiar en S&Z!</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tu petición ha sido registrada. Nuestro equipo revisará los datos y te enviará un presupuesto formal en menos de 2 horas hábiles.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>✓ Te contactaremos en las próximas 2 horas hábiles.</li>
                <li>✓ Nuestro equipo revisa los requisitos</li>
                <li>✓ Recibirás un presupuesto formal muy pronto</li>
                <li className="text-base">
                  ✓ ¿Dudas? Llámanos al{" "}
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-semibold"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/es/services">Explorar servicios</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/es/contact">Contactar soporte</a>
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Solicitar presupuesto | Transporte y logística"
        description="Solicita un presupuesto detallado para transporte en España y Europa, reubicaciones empresariales o logística global."
        keywords="presupuesto transporte, logística España, mudanzas empresariales"
      />
      <Navigation />
      <WhatsAppButton />

      <main id="main-content">
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-left">
            <PageBreadcrumbs items={[{ label: "Inicio", to: "/es" }, { label: "Solicitar presupuesto" }]} />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Solicitar presupuesto</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Cuéntanos qué necesitas mover y prepararemos un plan con costes claros en minutos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8">
            {step <= steps.length && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Paso {step} de {steps.length}</span>
                  <span className="text-sm font-medium">{steps[step - 1]}</span>
                </div>
                <Progress value={(step / steps.length) * 100} className="h-2" />
              </div>
            )}

            <Card>
              <CardContent className="p-6 space-y-8">
                {renderStep()}
                {step <= 4 && (
                  <div className="flex justify-between">
                    {step > 1 && (
                      <Button variant="outline" onClick={prevStep}>
                        Atrás
                      </Button>
                    )}
                    {step === 4 ? (
                      <Button
                        className="ml-auto"
                        disabled={loading}
                        onClick={handleSubmit}
                      >
                        {loading ? "Procesando..." : "Enviar solicitud"}
                      </Button>
                    ) : (
                      <Button
                        className="ml-auto"
                        disabled={!canProceed() || loading}
                        onClick={nextStep}
                      >
                        {loading ? "Procesando..." : "Continuar"}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>

      <FooterEs />
    </div>
  );
};

export default GetQuoteEs;
