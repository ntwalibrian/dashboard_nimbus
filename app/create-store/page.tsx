"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  ArrowRight,
  ArrowLeft as StepBack,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateStore() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    storeName: "",
    storeCategory: "",
    storeDescription: "",
    storeLocation: "",
    businessType: "individual",
    businessRegistration: "",
  });
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const totalSteps = 6;

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkAvailability = () => {
    setIsCheckingAvailability(true);

    // Simulate checking availability
    setTimeout(() => {
      // For demo purposes, let's say names ending with "store" are unavailable
      const available = !formData.storeName.toLowerCase().endsWith("store");
      setIsAvailable(available);
      setIsCheckingAvailability(false);
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.storeName && isAvailable;
      case 2:
        return !!formData.storeCategory;
      case 3:
        return !!formData.storeDescription;
      case 4:
        return !!formData.storeLocation;
      case 5:
        return !!formData.businessType;
      default:
        return true;
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleLocationDropdown = () =>
    setLocationDropdownOpen(!locationDropdownOpen);

  const selectCategory = (category: string, displayName: string) => {
    updateFormData("storeCategory", displayName);
    setDropdownOpen(false);
  };

  const selectLocation = (location: string, displayName: string) => {
    updateFormData("storeLocation", displayName);
    setLocationDropdownOpen(false);
  };

  return (
    <div className="absolute inset-0 bg-cream overflow-auto">
      <div className="w-full max-w-3xl mx-auto p-6 md:p-8 lg:p-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        <Card className="w-full shadow-lg bg-background/60 backdrop-blur-md border-none">
          <CardHeader className="border-b-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Store Basics</CardTitle>
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            <div className="w-full bg-gray-200/50 h-2 mt-4 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Step 1: Store Name */}
            {currentStep === 1 && (
              <div className="space-y-4 min-h-[200px]">
                <Label htmlFor="storeName" className="text-lg">
                  What is your store name?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="storeName"
                    placeholder="Enter your store name"
                    value={formData.storeName}
                    onChange={(e) =>
                      updateFormData("storeName", e.target.value)
                    }
                    className="flex-1 bg-white/80"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={checkAvailability}
                    disabled={!formData.storeName || isCheckingAvailability}
                    className="bg-white/80 hover:bg-white"
                  >
                    {isCheckingAvailability
                      ? "Checking..."
                      : "Check Availability"}
                  </Button>
                </div>
                {isAvailable === true && (
                  <p className="text-green-600 text-sm flex items-center">
                    <Check className="h-4 w-4 mr-1" /> This store name is
                    available!
                  </p>
                )}
                {isAvailable === false && (
                  <p className="text-red-600 text-sm">
                    This store name is already taken. Please try another.
                  </p>
                )}
              </div>
            )}

            {/* Step 2: Store Category */}
            {currentStep === 2 && (
              <div className="space-y-4 min-h-[200px]">
                <Label htmlFor="storeCategory" className="text-lg">
                  What is your store category?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-full bg-white/80 backdrop-blur-md border border-gray-300 rounded-md p-2 flex justify-between items-center"
                  >
                    <span>{formData.storeCategory || "Select a category"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute z-10 w-full bg-white/80 backdrop-blur-md border border-gray-300 rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto">
                      <li
                        onClick={() =>
                          selectCategory("fashion", "Fashion & Apparel")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Fashion & Apparel
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("electronics", "Electronics & Gadgets")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Electronics & Gadgets
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("home", "Home & Furniture")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Home & Furniture
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("beauty", "Beauty & Personal Care")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Beauty & Personal Care
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("health", "Health & Wellness")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Health & Wellness
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("food", "Food & Groceries")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Food & Groceries
                      </li>
                      <li
                        onClick={() => selectCategory("books", "Books & Media")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Books & Media
                      </li>
                      <li
                        onClick={() => selectCategory("toys", "Toys & Games")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Toys & Games
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("sports", "Sports & Outdoors")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Sports & Outdoors
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("jewelry", "Jewelry & Accessories")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Jewelry & Accessories
                      </li>
                      <li
                        onClick={() =>
                          selectCategory("art", "Art & Collectibles")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Art & Collectibles
                      </li>
                      <li
                        onClick={() => selectCategory("other", "Other")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Other
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Store Description */}
            {currentStep === 3 && (
              <div className="space-y-4 min-h-[200px]">
                <Label htmlFor="storeDescription" className="text-lg">
                  What is your store description?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="storeDescription"
                  placeholder="Enter a brief tagline or mission statement"
                  className="h-32 bg-white/80"
                  value={formData.storeDescription}
                  onChange={(e) =>
                    updateFormData("storeDescription", e.target.value)
                  }
                />
                <p className="text-sm text-muted-foreground">
                  This will appear on your store page to help customers
                  understand your business
                </p>
              </div>
            )}

            {/* Step 4: Store Location */}
            {currentStep === 4 && (
              <div className="space-y-4 min-h-[200px]">
                <Label htmlFor="storeLocation" className="text-lg">
                  Where is your store based?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <button
                    onClick={toggleLocationDropdown}
                    className="w-full bg-white/80 backdrop-blur-md border border-gray-300 rounded-md p-2 flex justify-between items-center"
                  >
                    <span>
                      {formData.storeLocation || "Select a country/region"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {locationDropdownOpen && (
                    <ul className="absolute z-10 w-full bg-white/80 backdrop-blur-md border border-gray-300 rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto">
                      <li
                        onClick={() => selectLocation("kgl", "Kigali City")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Kigali City
                      </li>
                      <li
                        onClick={() => selectLocation("wp", "Western Province")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Western Province
                      </li>
                      <li
                        onClick={() =>
                          selectLocation("sp", "Southern Province")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Southern Province
                      </li>
                      <li
                        onClick={() =>
                          selectLocation("np", "Northern Province")
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Northern Province
                      </li>
                      <li
                        onClick={() => selectLocation("ep", "Eastern Province")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Eastern Province
                      </li>
                      <li
                        onClick={() => selectLocation("other", "Other")}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Other
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Business Type */}
            {currentStep === 5 && (
              <div className="space-y-4 min-h-[200px]">
                <Label className="text-lg">
                  What is your business type?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.businessType}
                  onValueChange={(value) =>
                    updateFormData("businessType", value)
                  }
                  className="mt-4 space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="font-normal">
                      Individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="sole-proprietor"
                      id="sole-proprietor"
                    />
                    <Label htmlFor="sole-proprietor" className="font-normal">
                      Sole Proprietor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="registered-company"
                      id="registered-company"
                    />
                    <Label htmlFor="registered-company" className="font-normal">
                      Registered Company
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 6: Business Registration */}
            {currentStep === 6 && (
              <div className="space-y-4 min-h-[200px]">
                <Label htmlFor="businessRegistration" className="text-lg">
                  Do you have a business registration number? (Optional)
                </Label>
                <Input
                  id="businessRegistration"
                  placeholder="Enter your business registration number"
                  value={formData.businessRegistration}
                  onChange={(e) =>
                    updateFormData("businessRegistration", e.target.value)
                  }
                  className="bg-white/80"
                />
                <p className="text-sm text-muted-foreground">
                  This helps with verification but is not required to get
                  started
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t-0 p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="bg-white/80 hover:bg-white"
            >
              <StepBack className="h-4 w-4 mr-2" /> Back
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => (window.location.href = "/studio")}
              >
                Create Store
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
