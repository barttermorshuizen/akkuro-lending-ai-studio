"use client";

import useAudioCacheStore from "@/stores/useAudioCacheStore";
import React, { useEffect, useRef, useState } from "react";
import removeMd from "remove-markdown";

interface TextToSpeechProps {
  text: string;
  autoPlay?: boolean;
  isFinal?: boolean;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  autoPlay = false,
  isFinal = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getAudioCacheUrl, setAudioCacheUrl } = useAudioCacheStore();
  const cachedAudioUrl = getAudioCacheUrl(text);

  // Gọi API khi text thay đổi
  useEffect(() => {
    const fetchAudio = async () => {
      if (!text) return;

      if (cachedAudioUrl) {
        setAudioUrl(cachedAudioUrl);
        return;
      }

      try {
        setIsLoading(true);
        if (!isFinal) return;
        const res = await fetch("/api/openai-tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: removeMd(text) }),
        });

        const url = URL.createObjectURL(await res.blob());
        setAudioUrl(url);
        setAudioCacheUrl(text, url);
      } catch (error) {
        console.error("TTS error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudio();
  }, [cachedAudioUrl, isFinal, setAudioCacheUrl, text]);

  // Tự động phát nếu autoPlay
  useEffect(() => {
    if (autoPlay && audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioUrl, autoPlay]);

  const toggleSpeech = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        onEnded={() => setIsPlaying(false)}
        hidden
      />
      <button
        onClick={toggleSpeech}
        className={`rounded-full p-2 transition-colors shadow-sm ${
          isPlaying ? "bg-primary text-white" : "bg-white text-gray-700"
        }`}
        title={isPlaying ? "Stop speaking" : "Read aloud"}
        disabled={isLoading || !isFinal}
      >
        {isLoading ? (
          <div className="sound-loader"></div>
        ) : (
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
        )}
      </button>
    </>
  );
};

export default TextToSpeech;
