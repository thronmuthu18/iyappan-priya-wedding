import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { GoldLine } from '@/components/shared'
import { rsvpSchema, type RSVPFormData } from './rsvp.schema'
import { submitRSVP } from '@/services'

export const RSVP: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guestsCount: 0,
      attendance: undefined,
    },
  })

  const attendance = watch('attendance')
  const guestsCount = watch('guestsCount')

  const handleNextStep = async () => {
    // Validate Step 1 fields
    const isValid = await trigger(['name', 'email', 'attendance'])
    if (isValid) {
      if (attendance === 'declined') {
        // Submit immediately if declined
        handleSubmit(onSubmit)()
      } else {
        setStep(2)
      }
    }
  }

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    try {
      await submitRSVP(data)
      setStep(3)
    } catch (error) {
      console.error("Submission failed", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section id="rsvp" className="bg-[#FAF7F2] py-20 md:py-36 border-t border-border/10">
      <Container size="reading">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            REGISTRATION
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            RSVP Invitation
          </h2>
          <GoldLine className="mx-auto" />
          <p className="font-body text-xs text-text-secondary max-w-[380px] mx-auto mt-4 leading-relaxed">
            Kindly respond by September 15, 2026. We look forward to celebrating this day with you.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white/65 backdrop-blur-md border border-border/20 p-8 md:p-12 rounded-sm shadow-soft relative overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait" initial={false}>
              
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  {/* Name field */}
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      {...register('name')}
                      className="border border-border/60 bg-bg-light/20 rounded-none px-4 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary/40"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 font-sans tracking-wide">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. eleanor@example.com"
                      {...register('email')}
                      className="border border-border/60 bg-bg-light/20 rounded-none px-4 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary/40"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 font-sans tracking-wide">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Attendance buttons */}
                  <div className="flex flex-col space-y-3">
                    <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Attending Option */}
                      <label className={`border p-4 flex flex-col items-center justify-center cursor-pointer transition-colors rounded-none ${
                        attendance === 'attending'
                          ? 'border-primary bg-primary-light/10 text-primary'
                          : 'border-border/60 hover:border-primary/50 text-text-secondary'
                      }`}>
                        <input
                          type="radio"
                          value="attending"
                          {...register('attendance')}
                          className="sr-only"
                        />
                        <span className="font-display text-sm">Joyfully Attend</span>
                      </label>
                      {/* Declined Option */}
                      <label className={`border p-4 flex flex-col items-center justify-center cursor-pointer transition-colors rounded-none ${
                        attendance === 'declined'
                          ? 'border-primary bg-primary-light/10 text-primary'
                          : 'border-border/60 hover:border-primary/50 text-text-secondary'
                      }`}>
                        <input
                          type="radio"
                          value="declined"
                          {...register('attendance')}
                          className="sr-only"
                        />
                        <span className="font-display text-sm">Regretfully Decline</span>
                      </label>
                    </div>
                    {errors.attendance && (
                      <span className="text-[10px] text-red-500 font-sans tracking-wide text-center">
                        {errors.attendance.message}
                      </span>
                    )}
                  </div>

                  {/* Next Step Button */}
                  <div className="pt-4">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNextStep}
                      isLoading={isSubmitting}
                      className="w-full py-3"
                    >
                      {attendance === 'declined' ? 'Submit RSVP' : 'Next Step'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Guest Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  {/* Guest Count */}
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                      Additional Guest Count
                    </label>
                    <select
                      {...register('guestsCount', { valueAsNumber: true })}
                      className="border border-border/60 bg-bg-light/20 rounded-none px-4 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value={0}>No additional guests (Just me)</option>
                      <option value={1}>1 additional guest</option>
                      <option value={2}>2 additional guests</option>
                      <option value={3}>3 additional guests</option>
                    </select>
                  </div>

                  {/* Guest Names list */}
                  {Number(guestsCount) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex flex-col space-y-2 overflow-hidden"
                    >
                      <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                        Guest Names
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe, Sarah Vance"
                        {...register('guestNames')}
                        className="border border-border/60 bg-bg-light/20 rounded-none px-4 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary/40"
                      />
                    </motion.div>
                  )}

                  {/* Dietary Restrictions */}
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                      Dietary Restrictions / Allergies
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetarian, Gluten-Free"
                      {...register('diet')}
                      className="border border-border/60 bg-bg-light/20 rounded-none px-4 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary/40"
                    />
                  </div>

                  {/* Blessing Message */}
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                      A Blessing for the Couple
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Leave a warm note for Aria and Julian..."
                      {...register('message')}
                      className="border border-border/60 bg-bg-light/20 rounded-none px-4 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary/40 resize-none"
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      className="w-full"
                    >
                      Submit RSVP
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success state */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mx-auto text-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                      <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-primary">Response Received</h3>
                    <p className="font-body text-xs text-text-secondary max-w-[300px] mx-auto leading-relaxed">
                      {attendance === 'attending'
                        ? "Thank you! Your response has been recorded. We cannot wait to celebrate with you in Florence!"
                        : "Thank you for letting us know. You will be dearly missed, but we carry your blessings in our hearts."}
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </div>
      </Container>
    </Section>
  )
}
