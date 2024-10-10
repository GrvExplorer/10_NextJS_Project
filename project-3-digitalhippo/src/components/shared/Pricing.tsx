"use client";

import { PricingCard } from "@/components/custom ui/pricing-card";
import { pricingPlans } from "@/constants";
import { Button } from "@react-email/components";
import { motion } from "framer-motion";
import LogoutButton from "../auth/logout-button";

export default function Pricing() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground">
          Select the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PricingCard {...plan} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
