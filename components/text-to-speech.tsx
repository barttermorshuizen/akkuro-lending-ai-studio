import React, { useEffect, useRef, useState } from 'react';

interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.onend = () => setIsPlaying(false);

      if (autoPlay) {
        window.speechSynthesis.speak(utteranceRef.current);
        setIsPlaying(true);
      }
    }

    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, autoPlay]);

  const toggleSpeech = () => {
    if (!utteranceRef.current) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.speak(utteranceRef.current);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleSpeech}
      className={`rounded-full p-2 transition-colors shadow-sm ${
        isPlaying ? 'bg-primary text-white' : 'bg-white text-gray-700'
      }`}
      title={isPlaying ? 'Stop speaking' : 'Read aloud'}
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
        {isPlaying ? (
          <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        )}
      </svg>
    </button>
  );
};

export default TextToSpeech;
