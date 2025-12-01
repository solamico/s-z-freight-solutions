import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
import { BUSINESS_INFO, SERVICE_RATES, QUOTE_CALCULATION, SPECIAL_REQUIREMENTS } from "@/lib/constants";

const GetQuote = () => {
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

  const specialRequirementOptions = [
    "Temperature Controlled",
    "Fragile Items",
    "Hazardous Materials",
    "Oversized Load",
    "Express Delivery",
    "Insurance Required",
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
          newErrors.serviceType = "Service type is required";
        }
        break;
      case 2:
        if (!formData.origin || formData.origin.length < 2) {
          newErrors.origin = "Origin is required";
        }
        if (!formData.destination || formData.destination.length < 2) {
          newErrors.destination = "Destination is required";
        }
        break;
      case 3:
        if (!formData.weight) {
          newErrors.weight = "Weight is required";
        } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
          newErrors.weight = "Weight must be a positive number";
        }
        break;
      case 4:
        if (!formData.contactName || formData.contactName.length < 2) {
          newErrors.contactName = "Name must be at least 2 characters";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Valid email is required";
        }
        if (!formData.phone || formData.phone.length < 7) {
          newErrors.phone = "Phone number must be at least 7 characters";
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
        title: "Validation Error",
        description: "Please check all fields and try again.",
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
        title: "Quote Request Submitted!",
        description: "Our team will contact you within 2 hours with a formal quote.",
      });
      
      setStep(5);
    } catch (error: any) {
      console.error("Quote submission error:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Truck className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-semibold">Select Service Type</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: "spanish-road", label: "Spanish Road Transport" },
                { value: "european-road", label: "European Road Freight" },
                { value: "relocation", label: "Business Relocation" },
                { value: "global", label: "Global Logistics" },
                { value: "warehousing", label: "Warehousing" },
                { value: "consultancy", label: "Supply Chain Consultancy" },
              ].map((service) => (
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
              <h3 className="text-2xl font-semibold">Route Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Origin City/Location</label>
                <Input
                  placeholder="e.g., Madrid"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
                {errors.origin && <p className="text-sm text-destructive mt-1">{errors.origin}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Destination City/Location</label>
                <Input
                  placeholder="e.g., Paris"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
                {errors.destination && <p className="text-sm text-destructive mt-1">{errors.destination}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Pickup Date</label>
                <Input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Desired Delivery Date</label>
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
              <h3 className="text-2xl font-semibold">Cargo Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
                {errors.weight && <p className="text-sm text-destructive mt-1">{errors.weight}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Length (cm)</label>
                <Input
                  type="number"
                  placeholder="200"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Width (cm)</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Special Requirements</label>
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
              <h3 className="text-2xl font-semibold">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name *</label>
                <Input
                  placeholder="John Doe"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
                {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Company Name</label>
                <Input
                  placeholder="Company Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address *</label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+34 600 123 456"
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
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold">Quote Request Submitted!</h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Thank you for choosing S&Z Trading. Our logistics team will review your request and send you a detailed formal quote within 2 business hours.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg max-w-md mx-auto">
              <p className="font-medium mb-2">What happens next?</p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>✓ You'll hear from us within the next 2 business hours.</li>
                <li>✓ Our team reviews your requirements</li>
                <li>✓ You'll receive a formal quote within 2 hours</li>
                <li className="text-base">
                  ✓ Questions? Call us at{" "}
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-semibold"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
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

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Get Quote - Freight Transport Services"
        description="Get an instant quote for freight transport across Spain and Europe. Fill out our simple form and receive a detailed quote within 2 hours."
        keywords="freight quote, logistics quote, transport estimate, shipping quote Spain"
      />
      <Navigation />
      <WhatsAppButton />
      
      <main id="main-content">
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-4 text-left">
            <PageBreadcrumbs items={[{ label: "Home", to: "/" }, { label: "Get Quote" }]} />
          </div>
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Get Your Quote</h2>
                <span className="text-sm text-muted-foreground">Step {step} of 4</span>
              </div>
              <Progress value={(step / 4) * 100} className="h-2" />
            </div>
          )}

          <Card>
            <CardContent className="p-8">
              {renderStep()}

              {step <= 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {step > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  {step === 4 ? (
                    <Button
                      className="ml-auto"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Processing..." : "Submit Quote Request"}
                    </Button>
                  ) : (
                    <Button
                      className="ml-auto"
                      disabled={!canProceed() || loading}
                      onClick={nextStep}
                    >
                      {loading ? "Processing..." : "Continue"}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default GetQuote;