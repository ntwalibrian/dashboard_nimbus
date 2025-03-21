import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function page() {
  return (
    <div className="bg-purple-500 flex flex-grow pt-12 justify-center">
      <div className="space-y-6 p-9">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Good Morning</h1>
            <p className="text-muted-foreground">
              Here's your overview for Feb 19 - Mar 19
            </p>
          </div>
          <Select defaultValue="4weeks">
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

        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Get Started with Highnote</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your Test Environment allows you to explore the Highnote Platform,
              build your integration, test transactions and simulate almost
              anything. Once you complete all the steps this prompt will close.
            </p>

            <div className="mt-6 py-4 border rounded-md flex items-start gap-4">
              <div className="bg-background p-2 rounded border">
                {/* <FileText className="h-5 w-5" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-file-archive"
                >
                  <path d="M10 12v-1" />
                  <path d="M10 18v-2" />
                  <path d="M10 7V6" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01" />
                  <circle cx="10" cy="20" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Create a Product</h3>
                <p className="text-sm text-muted-foreground">
                  Create an acquiring or issuing product to start.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default page;
