/**
 * Browser SpeechSynthesis API helper for Indonesian Voice Guidance
 */

export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const stopSpeech = () => {
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore if cancel fails
    }
  }
};

export const speakIndonesian = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) => {
  if (!isSpeechSupported()) {
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // Sedikit lebih tenang dan ramah warga
    utterance.pitch = 1.0;

    // Try to find native Indonesian voice if present
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(
      (v) => v.lang.startsWith('id') || v.lang.includes('ID')
    );
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    if (onStart) {
      utterance.onstart = onStart;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('Speech synthesis error:', error);
    if (onEnd) onEnd();
  }
};
