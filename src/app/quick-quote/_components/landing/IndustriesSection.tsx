import {
  Activity,
  BookOpen,
  HardHat,
  Factory,
  Utensils,
  Building,
  ShoppingBag,
  Rocket,
  Landmark,
  Truck,
  Wallet,
  Users,
} from "lucide-react";
import React from "react";

import { Reveal } from "@/components/animations";

export default function IndustriesSection() {
  const industries = [
    { name: "Healthcare", icon: <Activity className="w-5 h-5" /> },
    { name: "Education", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Construction", icon: <HardHat className="w-5 h-5" /> },
    { name: "Manufacturing", icon: <Factory className="w-5 h-5" /> },
    { name: "Restaurants", icon: <Utensils className="w-5 h-5" /> },
    { name: "Real Estate", icon: <Building className="w-5 h-5" /> },
    { name: "Retail", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Startups", icon: <Rocket className="w-5 h-5" /> },
    { name: "Government", icon: <Landmark className="w-5 h-5" /> },
    { name: "Logistics", icon: <Truck className="w-5 h-5" /> },
    { name: "Finance", icon: <Wallet className="w-5 h-5" /> },
    { name: "Agencies", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Industries We Empower
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We build specialized solutions tailored to the unique regulatory, operational, and
              scaling needs of diverse sectors.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-900 hover:border-zinc-700 hover:scale-[1.02] transition-all duration-300 group">
                <div className="text-zinc-500 group-hover:text-blue-400 transition-colors mb-4">
                  {ind.icon}
                </div>
                <h3 className="text-zinc-300 font-bold text-sm tracking-wide">{ind.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
