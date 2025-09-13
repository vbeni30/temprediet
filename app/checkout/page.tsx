"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone, Mail, MapPin, Copy, CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { state } = useCart()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const copyToClipboard = (text: string, accountType: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(accountType)
      setTimeout(() => setCopiedAccount(null), 2000)
    })
  }

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const shipping = 25
  const tax = getSubtotal() * 0.08
  const total = getSubtotal() + shipping + tax

  const bankAccounts = [
    {
      name: "Telebirr",
      account: "+251-911-234567",
      type: "Mobile Money",
      icon: "📱",
    },
    {
      name: "Commercial Bank of Ethiopia (CBE)",
      account: "1000123456789",
      type: "Bank Account",
      icon: "🏦",
    },
    {
      name: "Bank of Abyssinia (BOA)",
      account: "0987654321012",
      type: "Bank Account",
      icon: "🏦",
    },
    {
      name: "Dashen Bank",
      account: "1122334455667",
      type: "Bank Account",
      icon: "🏦",
    },
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const orderSummary = state.items
        .map(
          (item) =>
            `${item.title} (${item.category}) - Qty: ${item.quantity} - ${item.price}${item.selectedPanel ? ` - Panel: ${item.selectedPanel}` : ""}`,
        )
        .join("\n")

      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "68382b11-7f75-471a-bbc0-a008f5751b03")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("subject", `Order Confirmation - Total: $${total.toFixed(2)}`)
      formDataToSend.append("from_name", "Red Suk Order System")
      formDataToSend.append("replyto", formData.email)
      formDataToSend.append("redirect", "https://web3forms.com/success")
      formDataToSend.append("botcheck", "")
      formDataToSend.append(
        "message",
        `Customer Name: ${formData.name}
Customer Email: ${formData.email}
Customer Phone: ${formData.phone}

Order Details:
${formData.message}

--- ORDER SUMMARY ---
${orderSummary}

Subtotal: $${getSubtotal().toLocaleString()}
Shipping: $${shipping}
Tax: $${tax.toFixed(2)}
Total: $${total.toFixed(2)}

This is an automated order confirmation from Red Suk online store.`,
      )

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isLoading) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full z-50 bg-white border-b border-neutral-200">
        <div className="w-full px-12 lg:px-20 flex justify-between items-center py-0">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Image src="/images/logo.png" alt="Rediet Haddis" width={800} height={300} className="h-28 w-auto" />
          </Link>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pt-32 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Payment Information Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-4 text-black">Payment Information</h1>
            <p className="text-lg text-neutral-600 mb-4">
              Complete your order by transferring to one of our bank accounts
            </p>
            <div className="w-20 h-px bg-neutral-300 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Payment Instructions */}
            <div className="space-y-8">
              {/* Bank Accounts */}
              <div className="space-y-6">
                <h2 className="text-2xl font-medium text-black mb-6">Bank Account Details</h2>

                {bankAccounts.map((bank, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-lg border border-neutral-200 bg-neutral-50 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{bank.icon}</span>
                        <div>
                          <h3 className="font-medium text-black">{bank.name}</h3>
                          <p className="text-sm text-neutral-500">{bank.type}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(bank.account, bank.name)}
                        variant="outline"
                        size="sm"
                        className="border-neutral-300 hover:bg-neutral-100"
                      >
                        {copiedAccount === bank.name ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="font-mono text-lg p-3 rounded bg-white text-black border border-neutral-200">
                      {bank.account}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Instructions */}
              <div className="p-6 rounded-lg border border-yellow-300 bg-yellow-50">
                <h3 className="font-medium mb-4 text-yellow-800">📋 Payment Instructions</h3>
                <ol className="space-y-2 text-sm text-yellow-700">
                  <li>1. Transfer the total amount to any of the above bank accounts</li>
                  <li>2. Take a screenshot of your transfer receipt</li>
                  <li>3. Send the screenshot via WhatsApp, Telegram, or Email</li>
                  <li>4. Include your order details in the message</li>
                  <li>5. We'll confirm your payment and process your order within 24 hours</li>
                </ol>
              </div>

              {/* Order Confirmation Contact Form */}
              <div className="space-y-6">
                <h2 className="text-2xl font-medium text-black">Order Confirmation Form</h2>
                <div className="p-6 rounded-lg border border-blue-300 bg-blue-50">
                  <h3 className="font-medium mb-4 text-blue-800">📧 Send Order Confirmation</h3>
                  <p className="text-sm text-blue-700 mb-6">
                    Use this form to send your order details and payment confirmation directly to our team. We'll
                    respond within 24 hours to confirm your order.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-blue-800 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+251-911-123456"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-1">
                        Message & Payment Confirmation *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Please include details about your payment method, transaction reference, and any special instructions..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Order Confirmation
                        </>
                      )}
                    </Button>

                    {submitStatus === "success" && (
                      <div className="p-3 rounded-md bg-green-100 border border-green-300">
                        <p className="text-sm text-green-700">
                          ✅ Order confirmation sent successfully! We'll respond within 24 hours.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-3 rounded-md bg-red-100 border border-red-300">
                        <p className="text-sm text-red-700">
                          ❌ Failed to send message. Please try again or contact us directly.
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-medium text-black">Contact Information</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="h-5 w-5 text-neutral-600" />
                      <span className="font-medium text-black">Phone</span>
                    </div>
                    <p className="text-neutral-600">+251-911-123456</p>
                    <p className="text-sm text-neutral-500">WhatsApp Available</p>
                  </div>

                  <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="h-5 w-5 text-neutral-600" />
                      <span className="font-medium text-black">Email</span>
                    </div>
                    <p className="text-neutral-600">orders@rediethaddis.com</p>
                    <p className="text-sm text-neutral-500">24/7 Support</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-neutral-600" />
                    <span className="font-medium text-black">Location</span>
                  </div>
                  <p className="text-neutral-600">Addis Ababa, Ethiopia</p>
                  <p className="text-sm text-neutral-500">Local pickup available</p>
                </div>
              </div>

              {/* Important Note */}
              <div className="p-6 rounded-lg border border-red-300 bg-red-50">
                <h3 className="font-medium mb-3 text-red-800">⚠️ Important Note</h3>
                <p className="text-sm text-red-700">
                  Please ensure you send a screenshot of your transfer receipt to complete your order. Orders without
                  payment confirmation will not be processed. For any questions or issues, contact us immediately using
                  the information provided above.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="p-8 rounded-lg border border-neutral-200 bg-neutral-50">
                <h2 className="text-xl font-medium mb-6 text-black">Order Summary</h2>

                <div className="space-y-6 mb-8">
                  {state.items.map((item, index) => (
                    <div key={`${item.id}-${item.selectedPanel}-${index}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-black">{item.title}</h3>
                        <p className="text-xs text-neutral-500 mb-1">{item.category}</p>
                        {item.selectedPanel && (
                          <p className="text-xs text-neutral-500 mb-1">Panel: {item.selectedPanel}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-medium text-black">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="text-black">${getSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-black">${shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span className="text-black">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-neutral-300">
                    <span className="text-lg font-medium text-black">Total</span>
                    <span className="text-lg font-medium text-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Transfer Amount Highlight */}
                <div className="mt-6 p-4 rounded-lg border-2 border-green-300 bg-green-50">
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-800 mb-1">Transfer This Amount</p>
                    <p className="text-2xl font-bold text-green-700">${total.toFixed(2)} USD</p>
                    <p className="text-xs text-green-600 mt-1">(Equivalent in ETB based on current exchange rate)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
