import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mic, X, Check, Keyboard } from 'lucide-react'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { VoiceVisualizer } from './VoiceVisualizer'
import { SeveritySlider } from './SeveritySlider'

type CaptureStep = 'recording' | 'severity' | 'done'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { transcription: string; severity: number; bodyArea: string }) => void
}

export function CaptureOverlay({ isOpen, onClose, onSave }: Props) {
  const [step, setStep] = useState<CaptureStep>('recording')
  const [finalText, setFinalText] = useState('')
  const [textInput, setTextInput] = useState('')
  const [useTextMode, setUseTextMode] = useState(false)
  const speech = useSpeechRecognition()

  // Start recording when overlay opens
  useEffect(() => {
    if (isOpen && !useTextMode) {
      setStep('recording')
      setFinalText('')
      setTextInput('')
      if (speech.isSupported) {
        speech.start()
      } else {
        setUseTextMode(true)
      }
    }
    return () => {
      if (speech.isListening) speech.stop()
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStopRecording = () => {
    speech.stop()
    const text = useTextMode ? textInput : speech.fullTranscript
    if (text.trim()) {
      setFinalText(text.trim())
      setStep('severity')
    } else {
      onClose()
    }
  }

  const handleSeverity = (severity: number) => {
    onSave({
      transcription: finalText,
      severity,
      bodyArea: guessBodyArea(finalText),
    })
    setStep('done')
    setTimeout(() => {
      onClose()
      setStep('recording')
    }, 1200)
  }

  const handleSkipSeverity = () => {
    onSave({
      transcription: finalText,
      severity: 5,
      bodyArea: guessBodyArea(finalText),
    })
    setStep('done')
    setTimeout(() => {
      onClose()
      setStep('recording')
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-indigo-900 to-slate-900 flex flex-col items-center justify-center px-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            <X size={24} />
          </button>

          <AnimatePresence mode="wait">
            {step === 'recording' && (
              <motion.div
                key="recording"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6 w-full max-w-md"
              >
                {/* Pulsing mic */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Mic className="text-white" size={32} />
                </motion.div>

                <VoiceVisualizer isActive={speech.isListening} />

                {/* Real-time transcript */}
                {!useTextMode ? (
                  <div className="text-center min-h-[80px]">
                    <p className="text-white text-lg">
                      {speech.transcript}
                      <span className="text-white/50">{speech.interimTranscript && ' ' + speech.interimTranscript}</span>
                    </p>
                    {!speech.transcript && !speech.interimTranscript && (
                      <p className="text-white/40 text-sm">Listening... describe your symptom</p>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    placeholder="Describe your symptom..."
                    autoFocus
                    className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                )}

                <div className="flex gap-3">
                  {!useTextMode && (
                    <button
                      onClick={() => {
                        speech.stop()
                        setUseTextMode(true)
                      }}
                      className="px-4 py-2 rounded-lg text-white/60 hover:text-white/80 transition"
                    >
                      <Keyboard size={20} />
                    </button>
                  )}
                  <button
                    onClick={handleStopRecording}
                    className="px-8 py-3 rounded-full bg-white text-indigo-900 font-semibold hover:bg-white/90 transition"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'severity' && (
              <motion.div
                key="severity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-white/80 text-center mb-2 text-sm italic">"{finalText}"</p>
                <SeveritySlider onSelect={handleSeverity} onSkip={handleSkipSeverity} />
              </motion.div>
            )}

            {step === 'done' && (
              <motion.div
                key="done"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <Check className="text-white" size={36} />
                </motion.div>
                <p className="text-white font-medium">Logged!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Simple keyword-based body area guesser
function guessBodyArea(text: string): string {
  const lower = text.toLowerCase()
  if (/head|migraine|temple/.test(lower)) return 'head'
  if (/stomach|nausea|digest|belly|gut/.test(lower)) return 'stomach'
  if (/chest|heart|breath/.test(lower)) return 'chest'
  if (/back|spine|lumbar/.test(lower)) return 'back'
  if (/neck|stiff/.test(lower)) return 'neck'
  if (/knee|leg|ankle|foot|hip/.test(lower)) return 'legs'
  if (/arm|wrist|hand|shoulder|elbow/.test(lower)) return 'arms'
  if (/eye|vision|blur|sight/.test(lower)) return 'head'
  if (/dizz|vertigo|balance/.test(lower)) return 'head'
  if (/throat|cough|sore/.test(lower)) return 'throat'
  if (/fatigue|tired|exhaust|sleep/.test(lower)) return 'general'
  return 'general'
}
