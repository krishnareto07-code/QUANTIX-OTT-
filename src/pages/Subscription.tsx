import Header from "@/components/Header";
import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const pricingPlans = [
  {
    planId: "daily",
    name: "Daily Pass",
    price: "₹50",
    period: "day",
    description: "Perfect for quick access",
    features: [
      "24-hour access",
      "Watch on 1 device",
      "HD (720p) quality",
      "Limited content library",
      "Ads included",
    ],
  },
    {
      planId: "basic",
      name: "Basic",
      price: "₹799",
      period: "month",
    description: "Perfect for casual viewers",
    features: [
      "Watch on 1 device at a time",
      "HD (720p) quality",
      "Limited content library",
      "Ads included",
      "Mobile & tablet access",
    ],
  },
    {
      planId: "standard",
      name: "Standard",
      price: "₹1199",
      period: "month",
    description: "Great for families",
    features: [
      "Watch on 2 devices simultaneously",
      "Full HD (1080p) quality",
      "Full content library",
      "Ad-free experience",
      "Download up to 10 titles",
      "All devices supported",
    ],
    popular: true,
  },
    {
      planId: "premium",
      name: "Premium",
      price: "₹1599",
      period: "month",
    description: "Ultimate streaming experience",
    features: [
      "Watch on 4 devices at once",
      "Ultra HD (4K) + HDR quality",
      "Full content library + exclusives",
      "Ad-free experience",
      "Unlimited downloads",
      "All devices + Smart TV apps",
      "Early access to new releases",
      "Watch party feature",
    ],
  },
];

const featureComparison = [
  { feature: "Simultaneous Streams", daily: "1", basic: "1", standard: "2", premium: "4" },
  { feature: "Video Quality", daily: "HD", basic: "HD", standard: "Full HD", premium: "4K + HDR" },
  { feature: "Content Library", daily: "Limited", basic: "Limited", standard: "Full", premium: "Full + Exclusives" },
  { feature: "Ads", daily: true, basic: true, standard: false, premium: false },
  { feature: "Downloads", daily: false, basic: false, standard: "10 titles", premium: "Unlimited" },
  { feature: "Smart TV Support", daily: false, basic: false, standard: true, premium: true },
  { feature: "Watch Party", daily: false, basic: false, standard: false, premium: true },
  { feature: "Early Access", daily: false, basic: false, standard: false, premium: true },
];

const Subscription = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Choose Your <span className="gradient-text">Quantix</span> Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Unlock unlimited entertainment with flexible plans designed for every viewer
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.planId} {...plan} />
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compare All Features
          </h2>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">Daily</th>
                    <th className="text-center p-6 font-semibold">Basic</th>
                    <th className="text-center p-6 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        Standard
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Popular
                        </span>
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-6 font-medium">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.daily === "boolean" ? (
                          row.daily ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.daily}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.basic === "boolean" ? (
                          row.basic ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.basic}</span>
                        )}
                      </td>
                      <td className="p-6 text-center bg-primary/5">
                        {typeof row.standard === "boolean" ? (
                          row.standard ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-foreground font-medium">{row.standard}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.premium === "boolean" ? (
                          row.premium ? (
                            <Check className="w-5 h-5 text-primary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="glass rounded-2xl p-8 space-y-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground text-sm">
                New subscribers get a 7-day free trial on any plan. Cancel anytime during the trial period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground text-sm">
                We accept all major credit cards, debit cards, UPI, and digital wallets (Paytm, PhonePe, Google Pay, Amazon Pay).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
