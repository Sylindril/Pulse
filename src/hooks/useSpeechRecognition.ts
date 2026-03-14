import { useState, useCallback, useRef } from 'react'
import { startSpeechRecognition, isSpeechSupported } from '../lib/speech'

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const sessionRef = useRef<{ stop: () => void; abort: () => void } | null>(null)

  const isSupported = isSpeechSupported()

  const start = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
    setError(null)
    setIsListening(true)

    sessionRef.current = startSpeechRecognition(
      (text, isFinal) => {
        if (isFinal) {
          setTranscript(prev => (prev + ' ' + text).trim())
          setInterimTranscript('')
        } else {
          setInterimTranscript(text)
        }
      },
      () => setIsListening(false),
      (err) => setError(err)
    )
  }, [])

  const stop = useCallback(() => {
    sessionRef.current?.stop()
    setIsListening(false)
  }, [])

  return {
    isListening,
    transcript,
    interimTranscript,
    fullTranscript: (transcript + ' ' + interimTranscript).trim(),
    error,
    isSupported,
    start,
    stop,
    setTranscript,
  }
}
