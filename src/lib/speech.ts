// Web Speech API wrapper — works in Chrome/Edge, graceful fallback elsewhere

type SpeechCallback = (transcript: string, isFinal: boolean) => void

interface SpeechSession {
  stop: () => void
  abort: () => void
}

export function isSpeechSupported(): boolean {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}

export function startSpeechRecognition(
  onResult: SpeechCallback,
  onEnd: () => void,
  onError?: (error: string) => void
): SpeechSession {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

  if (!SpeechRecognition) {
    onError?.('Speech recognition not supported in this browser')
    onEnd()
    return { stop: () => {}, abort: () => {} }
  }

  const recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'

  recognition.onresult = (event: any) => {
    let interim = ''
    let final = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        final += transcript
      } else {
        interim += transcript
      }
    }

    if (final) onResult(final, true)
    if (interim) onResult(interim, false)
  }

  recognition.onerror = (event: any) => {
    if (event.error !== 'aborted') {
      onError?.(event.error)
    }
  }

  recognition.onend = onEnd

  recognition.start()

  return {
    stop: () => recognition.stop(),
    abort: () => recognition.abort(),
  }
}
