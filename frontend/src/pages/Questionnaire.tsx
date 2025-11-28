import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, CheckCircle, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

interface Question {
  id: string;
  question: string;
  type?: "radio" | "photos";
  options?: { value: string; label: string }[];
  photoLabels?: string[];
}

const questions: Question[] = [
  {
    id: "age",
    question: "Qual sua idade?",
    options: [
      { value: "18-25", label: "18-25 anos" },
      { value: "26-35", label: "26-35 anos" },
      { value: "36-45", label: "36-45 anos" },
      { value: "46+", label: "46+ anos" }
    ]
  },
  {
    id: "hairLoss",
    question: "Há quanto tempo você percebe a queda de cabelo?",
    options: [
      { value: "recent", label: "Menos de 6 meses" },
      { value: "moderate", label: "6 meses a 2 anos" },
      { value: "long", label: "Mais de 2 anos" },
      { value: "progressive", label: "É progressiva ao longo dos anos" }
    ]
  },
  {
    id: "pattern",
    question: "Como você descreveria o padrão da queda?",
    options: [
      { value: "receding", label: "Entradas/linha frontal recuando" },
      { value: "crown", label: "Topo da cabeça/coroa" },
      { value: "diffuse", label: "Queda difusa (geral)" },
      { value: "patches", label: "Áreas específicas/manchas" }
    ]
  },
  {
    id: "family",
    question: "Há histórico de calvície na família?",
    options: [
      { value: "yes-father", label: "Sim, do lado paterno" },
      { value: "yes-mother", label: "Sim, do lado materno" },
      { value: "yes-both", label: "Sim, em ambos os lados" },
      { value: "no", label: "Não há histórico" }
    ]
  },
  {
    id: "previous",
    question: "Já tentou algum tratamento anteriormente?",
    options: [
      { value: "no", label: "Não, é meu primeiro tratamento" },
      { value: "otc", label: "Sim, produtos de farmácia" },
      { value: "prescription", label: "Sim, medicamentos prescritos" },
      { value: "natural", label: "Sim, tratamentos naturais" }
    ]
  },
  {
    id: "health",
    question: "Você tem alguma condição de saúde?",
    options: [
      { value: "none", label: "Nenhuma condição" },
      { value: "thyroid", label: "Problemas de tireoide" },
      { value: "hormonal", label: "Distúrbios hormonais" },
      { value: "other", label: "Outras condições" }
    ]
  },
  {
    id: "photos",
    question: "Faça upload de fotos do seu couro cabeludo",
    type: "photos",
    photoLabels: ["Frente", "Topo", "Atrás", "Laterais"]
  }
];

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Record<string, File[]>>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
  };

  const handlePhotoUpload = (index: number, file: File | null) => {
    const currentPhotos = photos[questions[currentStep].id] || [];
    const newPhotos = [...currentPhotos];
    
    if (file) {
      newPhotos[index] = file;
    } else {
      newPhotos.splice(index, 1);
    }
    
    setPhotos({ ...photos, [questions[currentStep].id]: newPhotos });
  };

  const getPhotoPreview = (index: number): string | null => {
    const currentPhotos = photos[questions[currentStep].id] || [];
    const file = currentPhotos[index];
    return file ? URL.createObjectURL(file) : null;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save submission to localStorage so doctors can review later
      try {
        const raw = localStorage.getItem("submissions");
        const submissions = raw ? JSON.parse(raw) : [];
        const id = String(Date.now());
        const authUser = (() => {
          try {
            return JSON.parse(localStorage.getItem("auth_user") || "null");
          } catch {
            return null;
          }
        })();

        const submission = {
          id,
          patientName: authUser?.name,
          timestamp: Date.now(),
          answers,
        };
        submissions.unshift(submission);
        localStorage.setItem("submissions", JSON.stringify(submissions));
      } catch (e) {
        // ignore storage errors
      }

      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const getRecommendation = () => {
    // Lógica simples de recomendação baseada nas respostas
    const hasLongHistory = answers.hairLoss === "long" || answers.hairLoss === "progressive";
    const hasFamilyHistory = answers.family?.includes("yes");
    
    if (hasLongHistory && hasFamilyHistory) {
      return {
        title: "Tratamento Intensivo Recomendado",
        description: "Baseado em suas respostas, recomendamos um tratamento combinado com bloqueador de DHT e estimulador de crescimento.",
        products: ["Finasterida 1mg", "Minoxidil 5%", "Vitaminas capilares"]
      };
    } else if (hasLongHistory || hasFamilyHistory) {
      return {
        title: "Tratamento Moderado Recomendado",
        description: "Um tratamento com foco em estabilização e crescimento gradual seria ideal para seu caso.",
        products: ["Minoxidil 5%", "Vitaminas capilares", "Shampoo especial"]
      };
    } else {
      return {
        title: "Tratamento Preventivo Recomendado",
        description: "Recomendamos um protocolo preventivo para manter a saúde capilar e evitar progressão.",
        products: ["Minoxidil 3%", "Vitaminas capilares"]
      };
    }
  };

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground">
                Avaliação Completa!
              </h2>
              
              <div className="bg-secondary/30 rounded-lg p-6 text-left space-y-4">
                <h3 className="text-2xl font-semibold text-primary">
                  {recommendation.title}
                </h3>
                <p className="text-muted-foreground">
                  {recommendation.description}
                </p>
                
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Produtos recomendados:</p>
                  <ul className="space-y-2">
                    {recommendation.products.map((product, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-lg text-foreground font-semibold">
                  Próximo Passo: Consulta Médica
                </p>
                <p className="text-muted-foreground">
                  Um dermatologista irá revisar suas respostas e criar seu plano de tratamento personalizado.
                </p>
                <Button size="lg" className="w-full sm:w-auto">
                  Agendar Consulta Médica
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const hasAnswer = currentQuestion.type === "photos" 
    ? (photos[currentQuestion.id]?.length === currentQuestion.photoLabels?.length)
    : answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Pergunta {currentStep + 1} de {questions.length}
              </span>
              <span className="text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === "photos" ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Por favor, faça upload de fotos claras do seu couro cabeludo de diferentes ângulos.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.photoLabels?.map((label, index) => (
                      <div key={label} className="space-y-2">
                        <Label className="text-foreground">{label}</Label>
                        <div className="relative">
                          {getPhotoPreview(index) ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary bg-muted">
                              <img
                                src={getPhotoPreview(index)!}
                                alt={label}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8"
                                onClick={() => handlePhotoUpload(index, null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer bg-muted/50">
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <span className="text-sm text-muted-foreground">
                                Clique para fazer upload
                              </span>
                              <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoUpload(index, file);
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQuestion.options?.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!hasAnswer}
                  className="flex-1"
                >
                  {currentStep === questions.length - 1 ? "Finalizar" : "Próxima"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
