
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import OTPInput from "@/components/OTPInput";
import { toast } from "sonner";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("buyer");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");

  const handleSendOtp = () => {
    // Validation for mobile number
    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    // Validation for email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validation for aadhar number
    if (!aadharNumber || aadharNumber.length !== 12 || !/^\d+$/.test(aadharNumber)) {
      toast.error("Please enter a valid 12-digit Aadhar number");
      return;
    }

    // Validation for location (only for buyers)
    if (activeTab === "buyer" && !location) {
      toast.error("Please enter your location");
      return;
    }

    // Simulate OTP sending
    toast.success(`OTP sent to ${mobileNumber}`);
    setIsOtpSent(true);
  };

  const handleVerifyOtp = (otp: string) => {
    // In a real app, you would verify the OTP with your backend
    console.log("Verifying OTP:", otp);
    
    // Simulate OTP verification
    setTimeout(() => {
      toast.success("OTP verified successfully!");
      
      // Redirect to appropriate page based on user type
      if (activeTab === "seller") {
        window.location.href = "/seller-dashboard";
      } else {
        window.location.href = "/";
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome to EstateNexus</h1>
          <p className="mt-2 text-gray-600">
            Find your dream property or list your property for sale
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isOtpSent ? "Verify OTP" : "Login / Register"}
            </CardTitle>
            {!isOtpSent && (
              <CardDescription className="text-center">
                Enter your details to continue
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!isOtpSent ? (
              <Tabs 
                value={activeTab} 
                onValueChange={(value) => setActiveTab(value as "buyer" | "seller")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buyer">Buyer</TabsTrigger>
                  <TabsTrigger value="seller">Seller</TabsTrigger>
                </TabsList>
                <TabsContent value="buyer">
                  <form className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number*</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        maxLength={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location*</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="City, State"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar">Aadhar Card Number*</Label>
                      <Input
                        id="aadhar"
                        type="text"
                        placeholder="12-digit Aadhar number"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        maxLength={12}
                      />
                      <p className="text-xs text-gray-500">
                        Required for verification purposes only
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      className="w-full" 
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="seller">
                  <form className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number*</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        maxLength={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar">Aadhar Card Number*</Label>
                      <Input
                        id="aadhar"
                        type="text"
                        placeholder="12-digit Aadhar number"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        maxLength={12}
                      />
                      <p className="text-xs text-gray-500">
                        Required for verification purposes only
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      className="w-full" 
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-6 py-4">
                <div className="text-center space-y-2">
                  <p className="text-gray-600">
                    We've sent a 6-digit OTP to {mobileNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    Please enter the code below to verify
                  </p>
                </div>
                <OTPInput length={6} onComplete={handleVerifyOtp} />
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Didn't receive the code?{" "}
                    <button 
                      type="button" 
                      className="text-primary hover:underline"
                      onClick={() => {
                        toast.success("OTP resent successfully!");
                      }}
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <div className="text-sm text-gray-500 text-center">
              By continuing, you agree to EstateNexus's{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
