import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


function page() {
  return (
    <div className='bg-purple-500 flex flex-grow pt-12 justify-center'>
      <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Good Morning</h1>
              <p className="text-muted-foreground">Here's your overview for Feb 19 - Mar 19</p>
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
                Your Test Environment allows you to explore the Highnote Platform, build your integration, test
                transactions and simulate almost anything. Once you complete all the steps this prompt will close.
              </p>

              <div className="mt-6 p-4 border rounded-md flex items-start gap-4">
                <div className="bg-background p-2 rounded border">
                  {/* <FileText className="h-5 w-5" /> */}j
                </div>
                <div>
                  <h3 className="font-medium">Create a Product</h3>
                  <p className="text-sm text-muted-foreground">Create an acquiring or issuing product to start.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}

export default page
