'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import CheckoutButton from '../payment/checkout-button'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  planId: string
}

export function PricingCard({ title, price, description, features, isPopular = false, planId }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`w-[300px] ${isPopular ? 'border-primary shadow-lg' : ''}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">{price}</div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="text-green-500" size={16} />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          {/* <CheckoutSubscriptionBtn mode='modal' planId={planId}> */}
          <CheckoutButton>
          <Button className="w-full">Choose Plan</Button>
          </CheckoutButton>
          {/* </CheckoutSubscriptionBtn> */}
        </CardFooter>
      </Card>
    </motion.div>
  )
}