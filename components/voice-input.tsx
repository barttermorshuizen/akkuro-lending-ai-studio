"use client";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

export interface VoiceInputRef {
  start: () => void;
  stop: () => void;
}

const VoiceInput = forwardRef(
  (
    { onTranscript, isListening, setIsListening }: VoiceInputProps,
    ref: Ref<VoiceInputRef>,
  ) => {
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(
      null,
    );

    useEffect(() => {
      if (window) {
        // Initialize Web Speech API
        const SpeechRecognition =
          (window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: {
            results:
              | Iterable<SpeechRecognitionResult>
              | ArrayLike<SpeechRecognitionResult>;
          }) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0] as SpeechRecognitionAlternative)
              .map((result) => result.transcript)
              .join("");

            onTranscript(transcript);
          };

          recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === "not-allowed") {
              alert(
                "Please enable microphone access in your browser settings to use voice input.",
              );
            }
            setIsListening(false);
          };

          recognition.onend = () => {
            setIsListening(false);
          };

          setRecognition(recognition);
        }
      }
    }, [onTranscript, setIsListening]);

    useEffect(() => {
      if (recognition) {
        if (isListening) {
          recognition?.start();
        } else {
          recognition?.stop();
        }
      }
    }, [isListening, recognition]);

    useImperativeHandle<VoiceInputRef, VoiceInputRef>(ref, () => ({
      start: () => {
        recognition?.start();
      },
      stop: () => {
        recognition?.stop();
      },
    }));

    return (
      <button
        onClick={() => setIsListening(!isListening)}
        className={`rounded-full p-2 transition-colors shadow-md ${
          isListening ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
        } ${isListening ? "voice-bubble" : ""}`}
        title={isListening ? "Stop recording" : "Start recording"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scale-75"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    );
  },
);

VoiceInput.displayName = "VoiceInput";

export default VoiceInput;
