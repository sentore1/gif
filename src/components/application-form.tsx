"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createClient } from "../../supabase/client";

const steps = [
  { id: 1, title: "Personal Information" },
  { id: 2, title: "Program Selection" },
  { id: 3, title: "Motivation" },
  { id: 4, title: "Review & Submit" },
];

const educationLevels = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
];

const programs = [
  {
    id: "afa",
    name: "Acting for Film and Theater Program",
    description:
      "Intensive training in film acting techniques and on-camera performance",
  },
  {
    id: "career",
    name: "Career Guidance & Internship",
    description:
      "Professional career counseling and hands-on internship opportunities",
  },
  {
    id: "film",
    name: "Film Making & TV Production",
    description:
      "Comprehensive training in film making, directing, and cinematography",
  },
  {
    id: "animation",
    name: "Animation & Motion Graphics",
    description:
      "Learn 2D/3D animation, motion design, and visual effects creation",
  },
  {
    id: "photography",
    name: "Photography & Graphic Design",
    description:
      "Master photography techniques and professional graphic design skills",
  },
];

interface FormData {
  firstName: string;
  surname: string;
  middleName: string;
  dateOfBirth: string;
  idNumber: string;
  email: string;
  educationLevel: string;
  specialization: string;
  program: string;
  duration: string;
  reasonToApply: string;
  applicationDate: string;
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    surname: "",
    middleName: "",
    dateOfBirth: "",
    idNumber: "",
    email: "",
    educationLevel: "",
    specialization: "",
    program: "",
    duration: "",
    reasonToApply: "",
    applicationDate: new Date().toISOString().split("T")[0],
  });

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.surname.trim()) newErrors.surname = "Surname is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.idNumber.trim())
        newErrors.idNumber = "ID number is required";
      if (!formData.email.trim())
        newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.educationLevel)
        newErrors.educationLevel = "Education level is required";
      if (!formData.specialization.trim())
        newErrors.specialization = "Specialization is required";
    }

    if (step === 2) {
      if (!formData.program) newErrors.program = "Please select a program";
      if (!formData.duration) newErrors.duration = "Please select a duration";
    }

    if (step === 3) {
      if (!formData.reasonToApply.trim())
        newErrors.reasonToApply = "Please provide your reason to apply";
      if (formData.reasonToApply.trim().length < 20)
        newErrors.reasonToApply = "Please write at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("applications")
        .insert([
          {
            first_name: formData.firstName,
            surname: formData.surname,
            middle_name: formData.middleName || null,
            date_of_birth: formData.dateOfBirth,
            id_number: formData.idNumber,
            email: formData.email,
            education_level: formData.educationLevel,
            specialization: formData.specialization,
            program: formData.program,
            duration: formData.duration,
            reason_to_apply: formData.reasonToApply,
            application_date: formData.applicationDate,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setApplicationId(data.id);
      
      // Send confirmation email
      fetch('/api/send-application-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.surname}`,
          status: 'pending',
          program: programs.find(p => p.id === formData.program)?.name || formData.program,
        }),
      }).catch(err => console.error('Email notification failed:', err));
      
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      const errorMessage = error?.message || error?.error_description || "There was an error submitting your application. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const charCount = formData.reasonToApply.trim().length;

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 lg:p-12 shadow-[0_8px_24px_rgba(27,58,95,0.12)] text-center max-w-xl mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy mb-4">
          Application Submitted!
        </h2>
        <p className="text-[#5F6B7A] mb-6">
          Your application has been successfully submitted. We will review it
          and get back to you soon.
        </p>
        <div className="bg-[#FAFBFC] rounded-lg p-4 mb-8">
          <p className="text-sm text-[#5F6B7A] mb-1">Application Reference</p>
          <p className="font-mono text-lg font-bold text-navy">
            {applicationId.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <div className="space-y-3 text-left bg-navy/5 rounded-lg p-4">
          <h3 className="font-semibold text-navy">Next Steps:</h3>
          <ul className="text-sm text-[#5F6B7A] space-y-2">
            <li>1. Our team will review your application within 3-5 business days</li>
            <li>2. You will receive an email notification about your application status</li>
            <li>3. If approved, you will receive further instructions for enrollment</li>
          </ul>
        </div>
        <Button
          className="mt-8 bg-navy hover:bg-navy/90"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(27,58,95,0.12)] overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-[#FAFBFC] p-6 border-b border-[#E4E7EB]">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-navy text-white"
                      : "bg-[#E4E7EB] text-[#5F6B7A]"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium hidden sm:block ${
                    currentStep === step.id ? "text-navy" : "text-[#5F6B7A]"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-green-500" : "bg-[#E4E7EB]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 lg:p-10">
        <AnimatePresence mode="wait">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Personal Information
                </h2>
                <p className="text-[#5F6B7A]">
                  Please provide your basic information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">
                    First Name (Izina) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="surname">
                    Surname <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="surname"
                    value={formData.surname}
                    onChange={(e) => updateFormData("surname", e.target.value)}
                    className={errors.surname ? "border-red-500" : ""}
                    placeholder="Enter your surname"
                  />
                  {errors.surname && (
                    <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={(e) => updateFormData("middleName", e.target.value)}
                    placeholder="Enter your middle name (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    className={errors.dateOfBirth ? "border-red-500" : ""}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="idNumber">
                    ID Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className={errors.idNumber ? "border-red-500" : ""}
                    placeholder="Enter your national ID number"
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="educationLevel">
                    Education Level <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.educationLevel}
                    onValueChange={(value) => updateFormData("educationLevel", value)}
                  >
                    <SelectTrigger
                      className={errors.educationLevel ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.educationLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.educationLevel}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="specialization">
                    Combination/Specialization <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) =>
                      updateFormData("specialization", e.target.value)
                    }
                    className={errors.specialization ? "border-red-500" : ""}
                    placeholder="Enter your field of study or specialization"
                  />
                  {errors.specialization && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.specialization}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Program Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Program Selection
                </h2>
                <p className="text-[#5F6B7A]">
                  Choose your preferred program and duration
                </p>
              </div>

              <div>
                <Label className="mb-4 block">
                  Select Program <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className={`relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.program === program.id
                          ? "border-navy bg-navy/5"
                          : "border-[#E4E7EB] hover:border-navy/30"
                      }`}
                      onClick={() => updateFormData("program", program.id)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        formData.program === program.id
                          ? "border-navy bg-navy"
                          : "border-[#E4E7EB]"
                      }`}>
                        {formData.program === program.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-navy">
                          {program.name}
                        </p>
                        <p className="text-sm text-[#5F6B7A] mt-1">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.program && (
                  <p className="text-red-500 text-sm mt-2">{errors.program}</p>
                )}
              </div>

              <div>
                <Label className="mb-4 block">
                  Program Duration <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-4">
                  <div
                    className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all text-center relative ${
                      formData.duration === "three_months"
                        ? "border-navy bg-navy/5"
                        : "border-[#E4E7EB] hover:border-navy/30"
                    }`}
                    onClick={() => updateFormData("duration", "three_months")}
                  >
                    {formData.duration === "three_months" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-navy flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <p className="font-semibold text-navy">Three Months</p>
                    <p className="text-sm text-[#5F6B7A] mt-1">Intensive program</p>
                  </div>
                  <div
                    className={`flex-1 p-4 border-2 rounded-xl cursor-pointer transition-all text-center relative ${
                      formData.duration === "six_months"
                        ? "border-navy bg-navy/5"
                        : "border-[#E4E7EB] hover:border-navy/30"
                    }`}
                    onClick={() => updateFormData("duration", "six_months")}
                  >
                    {formData.duration === "six_months" && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-navy flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <p className="font-semibold text-navy">Six Months</p>
                    <p className="text-sm text-[#5F6B7A] mt-1">Comprehensive program</p>
                  </div>
                </div>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-2">{errors.duration}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Motivation */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Motivation
                </h2>
                <p className="text-[#5F6B7A]">
                  Tell us why you want to join this program
                </p>
              </div>

              <div>
                <Label htmlFor="reasonToApply">
                  Reason to Apply <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="reasonToApply"
                  value={formData.reasonToApply}
                  onChange={(e) => updateFormData("reasonToApply", e.target.value)}
                  className={`min-h-[200px] ${
                    errors.reasonToApply ? "border-red-500" : ""
                  }`}
                  placeholder="Explain your motivation for applying to this program. (Minimum 20 characters)"
                />
                <div className="flex justify-between items-center mt-2">
                  <p
                    className={`text-sm ${
                      charCount < 20
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {charCount} characters {charCount < 20 && "(minimum 20 required)"}
                  </p>
                </div>
                {errors.reasonToApply && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reasonToApply}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="applicationDate">Application Date</Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) =>
                    updateFormData("applicationDate", e.target.value)
                  }
                />
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-2xl font-bold text-navy mb-2">
                  Review & Submit
                </h2>
                <p className="text-[#5F6B7A]">
                  Please review your application before submitting
                </p>
              </div>

              <div className="space-y-6">
                {/* Personal Information Summary */}
                <div className="bg-[#FAFBFC] rounded-xl p-6">
                  <h3 className="font-semibold text-navy mb-4 flex items-center justify-between">
                    Personal Information
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                      className="text-gold hover:text-gold/80"
                    >
                      Edit
                    </Button>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#5F6B7A]">Full Name:</span>
                      <p className="font-medium text-navy">
                        {formData.firstName} {formData.middleName}{" "}
                        {formData.surname}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#5F6B7A]">Date of Birth:</span>
                      <p className="font-medium text-navy">
                        {new Date(formData.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#5F6B7A]">ID Number:</span>
                      <p className="font-medium text-navy">{formData.idNumber}</p>
                    </div>
                    <div>
                      <span className="text-[#5F6B7A]">Email:</span>
                      <p className="font-medium text-navy">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-[#5F6B7A]">Education Level:</span>
                      <p className="font-medium text-navy">
                        {formData.educationLevel}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-[#5F6B7A]">Specialization:</span>
                      <p className="font-medium text-navy">
                        {formData.specialization}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program Selection Summary */}
                <div className="bg-[#FAFBFC] rounded-xl p-6">
                  <h3 className="font-semibold text-navy mb-4 flex items-center justify-between">
                    Program Selection
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(2)}
                      className="text-gold hover:text-gold/80"
                    >
                      Edit
                    </Button>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#5F6B7A]">Program:</span>
                      <p className="font-medium text-navy">
                        {
                          programs.find((p) => p.id === formData.program)
                            ?.name
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-[#5F6B7A]">Duration:</span>
                      <p className="font-medium text-navy">
                        {formData.duration === "three_months"
                          ? "Three Months"
                          : "Six Months"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivation Summary */}
                <div className="bg-[#FAFBFC] rounded-xl p-6">
                  <h3 className="font-semibold text-navy mb-4 flex items-center justify-between">
                    Motivation
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(3)}
                      className="text-gold hover:text-gold/80"
                    >
                      Edit
                    </Button>
                  </h3>
                  <div className="text-sm">
                    <span className="text-[#5F6B7A]">Reason to Apply:</span>
                    <p className="font-medium text-navy mt-2 whitespace-pre-wrap">
                      {formData.reasonToApply}
                    </p>
                  </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="flex items-start gap-3 p-4 border border-[#E4E7EB] rounded-xl">
                  <Checkbox
                    id="confirmAccuracy"
                    checked={confirmAccuracy}
                    onCheckedChange={(checked) =>
                      setConfirmAccuracy(checked as boolean)
                    }
                  />
                  <Label htmlFor="confirmAccuracy" className="cursor-pointer">
                    I confirm that all the information provided above is accurate
                    and complete to the best of my knowledge.
                  </Label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t border-[#E4E7EB]">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-navy text-navy"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="bg-navy hover:bg-navy/90 text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setShowConfirmDialog(true)}
              disabled={!confirmAccuracy || isSubmitting}
              className="bg-gold hover:bg-gold/90 text-navy font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your application? Once submitted,
              you won't be able to make changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              className="bg-navy hover:bg-navy/90"
            >
              Yes, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
