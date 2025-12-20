import { useState, useEffect, useCallback } from 'react';

// Define types for Web Speech API
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
}

interface SpeechRecognitionErrorEvent {
    error: string;
}

declare global {
    interface Window {
        SpeechRecognition: { new(): SpeechRecognition };
        webkitSpeechRecognition: { new(): SpeechRecognition };
    }
}

export function useVoiceInput() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = true;
                recognitionInstance.interimResults = true;
                recognitionInstance.lang = 'en-US';

                recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                    let currentTranscript = '';
                    for (let i = 0; i < event.results.length; i++) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                    setTranscript(currentTranscript);
                };

                recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error('Speech recognition error', event.error);
                    setError(event.error);
                    setIsListening(false);
                };

                recognitionInstance.onend = () => {
                    setIsListening(false);
                };

                setRecognition(recognitionInstance);
            } else {
                setError("Browser doesn't support speech recognition.");
            }
        }
    }, []);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
                setIsListening(true);
                setError(null);
            } catch (e) {
                console.error(e);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return { isListening, transcript, startListening, stopListening, error, resetTranscript };
}
