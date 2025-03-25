"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { format, subDays, subMonths, subYears } from "date-fns";

function page() {
  const [selectedPeriod, setSelectedPeriod] = useState("4weeks");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case "4weeks":
        startDate = subDays(now, 28);
        break;
      case "3months":
        startDate = subMonths(now, 3);
        break;
      case "6months":
        startDate = subMonths(now, 6);
        break;
      case "1year":
        startDate = subYears(now, 1);
        break;
      default:
        startDate = subDays(now, 28);
    }

    const formattedStart = format(startDate, "MMM d");
    const formattedEnd = format(now, "MMM d");
    setDateRange(`${formattedStart} - ${formattedEnd}`);
  }, [selectedPeriod]);

  return (
    <div className="bg-radial-gradient flex flex-grow justify-center">
      <div className="space-y-6 p-9">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Good Morning</h1>
            <p className="text-muted-foreground">
              Here's your overview for {dateRange}
            </p>
          </div>
          <Select
            defaultValue="4weeks"
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="bg-background/60 backdrop-blur-md border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>Get Started with Nimbus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your Nimbus environment allows you to explore the platform, build
              your online store, manage products, and process transactions. Once
              you complete all the setup steps, your e-commerce store will be
              ready to launch.
            </p>

            <div className="mt-6 py-4 border rounded-md flex items-center gap-4 hover:bg-blue-50 transition-colors">
              <a
                href="/create-store"
                className="flex items-center gap-4 w-full"
              >
                <div className="text-blue-500 flex items-center px-2 pt-0.5">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-black">Create a Store</h3>
                  <p className="text-sm text-muted-foreground">
                    Set up your e-commerce store to start selling products
                    online.
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default page;
