import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { GoldLine, AtmosphericBackground } from '@/components/shared'
import { rsvpSchema, type RSVPFormData } from './rsvp.schema'
import { submitRSVP } from '@/services'
import { useUIStore } from '@/store'
import { weddingConfig } from '@/config/wedding.config'

// ── Input Field ──────────────────────────────────────────────────
const InputField: React.FC<{
  label:        string
  tamilLabel?:  string
  error?:       string
  children:     React.ReactNode
}> = ({ label, tamilLabel, error, children }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex items-baseline space-x-2">
      <label className="font-body text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
        {label}
      </label>
      {tamilLabel && (
        <span className="font-tamil text-primary/50 text-[10px]">{tamilLabel}</span>
      )}
    </div>
    {children}
    {error && (
      <span className="text-[10px] font-body tracking-wide" style={{ color: '#C0392B' }}>{error}</span>
    )}
  </div>
)

const inputCls = `
  border bg-bg-light/20 rounded-none px-4 py-3 font-body text-xs text-text-primary
  focus:outline-none transition-colors placeholder:text-text-secondary/40
`
const inputStyle = {
  borderColor: 'rgba(201,169,110,0.3)',
}

export const RSVP: React.FC = () => {
  const { language } = useUIStore()
  const sectionRef = React.useRef<HTMLElement>(null)
  const [step,        setStep]        = useState<1 | 2 | 3>(1)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestsCount: 0, attendance: undefined },
  })

  const attendance  = watch('attendance')
  const guestsCount = watch('guestsCount')

  const handleNextStep = async () => {
    const isValid = await trigger(['name', 'phone', 'attendance'])
    if (isValid) {
      if (attendance === 'declined') handleSubmit(onSubmit)()
      else setStep(2)
    }
  }

  const onSubmit = (data: RSVPFormData) => {
    setIsSubmitting(true)
    try {
      submitRSVP(data)
      setStep(3)
    } catch (error) {
      console.error("Submission failed", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const radioActive = (val: string) =>
    attendance === val
      ? { border: '2px solid #C9A96E', background: 'rgba(201,169,110,0.08)', color: '#A07850' }
      : { border: '1px solid rgba(201,169,110,0.2)', background: 'transparent', color: '#5C5550' }

  const rsvpData = weddingConfig.rsvp

  return (
    <Section
      ref={sectionRef}
      id="rsvp"
      className="py-20 md:py-36 relative overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <AtmosphericBackground type="rsvp" targetRef={sectionRef} />
      {/* Background marigold pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute text-primary" style={{ left: `${(i * 47 + 10) % 100}%`, top: `${(i * 61 + 8) % 100}%`, fontSize: 40 }}>✿</div>
        ))}
      </div>

      <Container size="reading" className="relative z-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <p className="font-tamil text-primary/60 text-sm mb-2">
            {language === 'ta' ? 'விருந்தினர் பதிவு' : 'GUEST REGISTRATION'}
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] text-[#5C5550] uppercase block mb-3">
            {language === 'ta' ? 'அழைப்பை உறுதி செய்யவும்' : 'RSVP INVITATION'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-primary font-light">
            RSVP Invitation
          </h2>
          <GoldLine className="mx-auto" />

          {/* Decorative row */}
          <div className="flex items-center justify-center space-x-3 mt-5 text-primary/40">
            <span>🌸</span><span>✦</span><span className="font-serif text-lg">ॐ</span><span>✦</span><span>🌸</span>
          </div>

          <p className="font-body text-xs text-text-secondary max-w-[400px] mx-auto mt-4 leading-relaxed">
            {language === 'ta'
              ? 'தயவுசெய்து அக்டோபர் 1, 2026-க்குள் தங்கள் பதிவை உறுதி செய்யவும். உங்கள் வருகை எங்களை மகிழ்ச்சியடையச் செய்யும்.'
              : `Kindly respond by October 1, 2026. Your presence will make our celebration complete.`}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-10 relative z-10">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-body text-[10px] font-semibold transition-all duration-300"
                style={
                  step >= s
                    ? { background: 'linear-gradient(135deg, #C9A96E, #A07850)', color: '#FAF7F2' }
                    : { background: 'transparent', border: '1px solid rgba(201,169,110,0.3)', color: '#A07850' }
                }
              >
                {s}
              </div>
              {s < 2 && <div className="w-8 h-[1px]" style={{ background: step > s ? '#C9A96E' : 'rgba(201,169,110,0.2)' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div
          className="relative z-10 p-8 md:p-12 rounded-sm"
          style={{
            background:    'rgba(255,255,255,0.8)',
            backdropFilter:'blur(20px)',
            border:        '1px solid rgba(201,169,110,0.25)',
            boxShadow:     '0 20px 60px rgba(201,169,110,0.12)',
          }}
        >
          {/* Corner ornaments */}
          {['top-3 left-3','top-3 right-3 rotate-90','bottom-3 right-3 rotate-180','bottom-3 left-3 -rotate-90'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} text-primary/20`}>
              <svg viewBox="0 0 16 16" width="12" height="12"><path d="M 0 0 L 10 0 L 10 1.5 L 1.5 1.5 L 1.5 10 L 0 10 Z" fill="currentColor" /></svg>
            </div>
          ))}

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
                  <InputField label="Guest Name" tamilLabel="பெயர்" error={errors.name?.message}>
                    <input
                      type="text"
                      placeholder={language === 'ta' ? "உங்கள் பெயர்" : "Your full name"}
                      {...register('name')}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </InputField>

                  <InputField label="Phone Number" tamilLabel="தொலைபேசி எண்" error={errors.phone?.message}>
                    <input
                      type="text"
                      placeholder={language === 'ta' ? "10-இலக்க எண்" : "10-digit mobile number"}
                      {...register('phone')}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </InputField>

                  <div className="flex flex-col space-y-3">
                    <div className="flex items-baseline space-x-2">
                      <label className="font-body text-[10px] tracking-wider text-text-secondary uppercase font-semibold">
                        {language === 'ta' ? 'விழாவில் கலந்து கொள்வீர்களா?' : 'Will you attend?'}
                      </label>
                      <span className="font-tamil text-primary/50 text-[10px]">கலந்துகொள்வீர்களா?</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Attending */}
                      <label className="cursor-pointer" style={{ ...radioActive('attending'), padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2, transition: 'all 0.3s' }}>
                        <input type="radio" value="attending" {...register('attendance')} className="sr-only" />
                        <span className="text-xl mb-1">🙏</span>
                        <span className="font-display text-sm">{language === 'ta' ? 'வருகிறேன்' : 'Joyfully Attend'}</span>
                      </label>
                      {/* Declined */}
                      <label className="cursor-pointer" style={{ ...radioActive('declined'), padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2, transition: 'all 0.3s' }}>
                        <input type="radio" value="declined" {...register('attendance')} className="sr-only" />
                        <span className="text-xl mb-1">💐</span>
                        <span className="font-display text-sm">{language === 'ta' ? 'வர இயலவில்லை' : 'Regretfully Decline'}</span>
                      </label>
                    </div>
                    {errors.attendance && (
                      <span className="text-[10px] font-body tracking-wide" style={{ color: '#C0392B' }}>{errors.attendance.message}</span>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button type="button" variant="primary" onClick={handleNextStep} isLoading={isSubmitting} className="w-full py-3">
                      {attendance === 'declined' ? '🙏 Submit RSVP' : (language === 'ta' ? 'தொடரவும் →' : 'Continue →')}
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
                  <InputField label="Total Guest Count" tamilLabel="மொத்த விருந்தினர்கள்">
                    <select
                      {...register('guestsCount', { valueAsNumber: true })}
                      className={inputCls}
                      style={inputStyle}
                    >
                      <option value={0}>{language === 'ta' ? 'நான் மட்டும்' : 'Just myself'}</option>
                      <option value={1}>{language === 'ta' ? '2 நபர்கள் (நானும் + 1)' : '2 guests (myself + 1)'}</option>
                      <option value={2}>{language === 'ta' ? '3 நபர்கள் (நானும் + 2)' : '3 guests (myself + 2)'}</option>
                      <option value={3}>{language === 'ta' ? '4 நபர்கள் (நானும் + 3)' : '4 guests (myself + 3)'}</option>
                      <option value={4}>{language === 'ta' ? '5+ நபர்கள்' : '5+ guests (contact family)'}</option>
                    </select>
                  </InputField>

                  {Number(guestsCount) > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <InputField label="Guest Names" tamilLabel="உடன் வருவோர் பெயர்கள்">
                        <input
                          type="text"
                          placeholder="e.g. Kavitha, Ravi"
                          {...register('guestNames')}
                          className={inputCls}
                          style={inputStyle}
                        />
                      </InputField>
                    </motion.div>
                  )}

                  <InputField label="Special Message / Blessings" tamilLabel="ஆசீர்வாத செய்தி">
                    <textarea
                      rows={4}
                      placeholder={language === 'ta' ? "மணமக்களை வாழ்த்தி எழுதவும்..." : "Share a warm blessing or note for Iyappan & Priya..."}
                      {...register('message')}
                      className={`${inputCls} resize-none`}
                      style={inputStyle}
                    />
                  </InputField>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">
                      {language === 'ta' ? '← பின்செல்ல' : '← Back'}
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full">
                      {language === 'ta' ? '🙏 சமர்ப்பிக்க' : '🙏 Submit'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  {/* Animated Om */}
                  <motion.div
                    animate={{ filter: ['drop-shadow(0 0 8px rgba(201,169,110,0.5))', 'drop-shadow(0 0 24px rgba(201,169,110,1.0))', 'drop-shadow(0 0 8px rgba(201,169,110,0.5))'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-primary font-serif text-6xl"
                  >
                    ॐ
                  </motion.div>

                  {/* Falling confetti petals */}
                  <div className="relative h-12 overflow-hidden">
                    {['🌸','✿','🌼','🌺','💐'].map((e, i) => (
                      <motion.span
                        key={i}
                        className="absolute"
                        style={{ left: `${15 + i * 18}%`, fontSize: 16 }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 60, opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                      >
                        {e}
                      </motion.span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-3xl text-primary">
                      {attendance === 'attending' ? (language === 'ta' ? 'வாழ்க! வளமுடன்!' : 'Vaazhga! Blessings!') : 'Thank You'}
                    </h3>
                    <p className="font-body text-sm text-text-secondary max-w-[340px] mx-auto leading-relaxed">
                      {attendance === 'attending'
                        ? rsvpData.successMessageAttending[language]
                        : rsvpData.successMessageDeclined[language]}
                    </p>
                  </div>

                  {/* Decorative */}
                  <div className="flex items-center justify-center space-x-3 text-primary/40">
                    <span>🪔</span><span>✦</span><span>🌸</span><span>✦</span><span>🪔</span>
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
