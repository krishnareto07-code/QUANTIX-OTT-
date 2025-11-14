import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Lock, Smartphone, Wallet } from "lucide-react";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";

const planDetails: Record<string, { name: string; price: string; period: string }> = {
  daily: { name: "Daily Pass", price: "₹50", period: "day" },
  basic: { name: "Basic Plan", price: "₹799", period: "month" },
  standard: { name: "Standard Plan", price: "₹1199", period: "month" },
  premium: { name: "Premium Plan", price: "₹1599", period: "month" },
};

const Checkout = () => {
  const { planId = "standard" } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "wallet">("card");

  const plan = planDetails[planId] || planDetails.standard;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Demo payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-20 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Complete Your Subscription</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
              
              <Tabs defaultValue="card" className="space-y-6" onValueChange={(v) => setPaymentMethod(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card" className="gap-2">
                    <CreditCard className="w-4 h-4" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="upi" className="gap-2">
                    <Smartphone className="w-4 h-4" />
                    UPI
                  </TabsTrigger>
                  <TabsTrigger value="wallet" className="gap-2">
                    <Wallet className="w-4 h-4" />
                    Wallet
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                  <TabsContent value="card" className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        required
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-2"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          className="mt-2"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          className="mt-2"
                          maxLength={3}
                          type="password"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upi" className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        required
                        className="mt-2"
                      />
                    </div>
                    
                    <div className="glass rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Or scan QR code</p>
                      <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">QR Code</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="wallet" className="space-y-4 mt-6">
                    <Label>Select Wallet</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Paytm", "PhonePe", "Google Pay", "Amazon Pay"].map((wallet) => (
                        <button
                          key={wallet}
                          type="button"
                          className="glass rounded-lg p-4 hover:border-primary transition-all hover-scale text-center"
                        >
                          <Wallet className="w-8 h-8 mx-auto mb-2 text-primary" />
                          <p className="text-sm font-medium">{wallet}</p>
                        </button>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <Label htmlFor="walletPhone">Mobile Number</Label>
                      <Input
                        id="walletPhone"
                        placeholder="+91 98765 43210"
                        required
                        className="mt-2"
                        maxLength={15}
                      />
                    </div>
                  </TabsContent>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing Payment..." : `Pay ${plan.price}/${plan.period}`}
                  </Button>
                </form>
              </Tabs>
            </div>
            
            {/* Order Summary */}
            <div className="glass rounded-2xl p-8 h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-semibold">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span className="capitalize">{plan.period === "day" ? "Daily" : "Monthly"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                  <span>Total Due Today</span>
                  <span className="gradient-text">{plan.price}</span>
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <p className="text-sm">
                  <span className="font-semibold">7-Day Free Trial</span>
                  <br />
                  <span className="text-muted-foreground">
                    You won't be charged until your trial ends. Cancel anytime.
                  </span>
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Access to full content library</p>
                <p>• No commitment, cancel anytime</p>
                <p>• Watch on multiple devices</p>
                <p>• HD/4K streaming quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PaymentSuccessModal 
        open={showSuccess} 
        onOpenChange={setShowSuccess}
        planName={plan.name}
      />
    </div>
  );
};

export default Checkout;
