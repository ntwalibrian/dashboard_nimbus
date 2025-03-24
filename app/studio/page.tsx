"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MinimalTemplate from "@/public/templetes/Screenshot (123).png";
import Image from "next/image";

export default function Studio() {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleProceed = () => {
    router.push("/dashboard");
  };

  return (
    <div className="absolute inset-0 bg-cream overflow-auto">
      <div className="w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
        <Link
          href="/dashboard"
          onClick={handleBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        {/* Confirmation Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Leave Page?</DialogTitle>
              <DialogDescription>
                Are you sure you want to leave? Your progress will be lost and
                you'll need to start over.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex space-x-2 sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                variant="destructive"
                className="flex-1 sm:flex-none"
              >
                Proceed to Dashboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Choose a Template for Your Store
            </h1>
            <p className="text-muted-foreground text-lg">
              Select a template to get started. You can customize it later to
              match your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Minimal Store Template */}
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-background/60 backdrop-blur-md border-none">
              <CardHeader>
                <div className="aspect-video rounded-md mb-4 overflow-hidden">
                  <Image
                    src={MinimalTemplate}
                    alt="Minimal Store Template"
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <CardTitle>Minimal Store</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clean and modern design perfect for any product type.
                </p>
              </CardContent>
            </Card>

            {/* Commented out templates
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-background/60 backdrop-blur-md border-none">
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-md mb-4">
                </div>
                <CardTitle>Fashion Boutique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Elegant layout designed for fashion and accessories.
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-background/60 backdrop-blur-md border-none">
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-md mb-4">
                </div>
                <CardTitle>Digital Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perfect for digital products and downloads.
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-background/60 backdrop-blur-md border-none">
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-md mb-4">
                </div>
                <CardTitle>Food & Grocery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Optimized for food delivery and grocery stores.
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-background/60 backdrop-blur-md border-none">
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-md mb-4">
                </div>
                <CardTitle>Art Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Showcase your artwork with this gallery-style template.
                </p>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-background/60 backdrop-blur-md border-none">
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-md mb-4">
                </div>
                <CardTitle>Electronics Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Technical layout for electronics and gadgets.
                </p>
              </CardContent>
            </Card>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
