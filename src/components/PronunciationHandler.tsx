import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

type PronunciationHandlerProps = {
  enabled: boolean;
  targetSelector: string;
};

const PronunciationHandler = ({ enabled, targetSelector }: PronunciationHandlerProps) => {
  const { toast } = useToast();
  const highlightRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const restoreHighlight = () => {
      const node = highlightRef.current;
      if (node && node.parentNode) {
        const text = node.textContent ?? "";
        node.replaceWith(document.createTextNode(text));
      }
      highlightRef.current = null;
    };

    const cleanupAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.load();
      }
      audioRef.current = null;

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      audioUrlRef.current = null;
    };

    if (!enabled) {
      restoreHighlight();
      cleanupAudio();
      return;
    }

    const container = document.querySelector<HTMLElement>(targetSelector);
    if (!container) {
      console.warn("[Pronounce] Target container not found for selector", targetSelector);
      return;
    }

    const handleClick = async () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        return;
      }

      const selectionText = selection.toString();
      const trimmed = selectionText.trim();
      if (!trimmed || trimmed.length > 160) {
        return;
      }

      const range = selection.getRangeAt(0);
      if (range.collapsed) {
        return;
      }

      if (!container.contains(range.commonAncestorContainer as Node)) {
        return;
      }

      restoreHighlight();
      cleanupAudio();

      const mark = document.createElement("mark");
      mark.className = "pronounce-highlight pronounce-loading";
      mark.dataset.pronounce = "true";

      try {
        const fragment = range.extractContents();
        mark.appendChild(fragment);
        range.insertNode(mark);
        selection.removeAllRanges();
        highlightRef.current = mark;
      } catch (error) {
        console.warn("[Pronounce] Failed to wrap selection", error);
        selection.removeAllRanges();
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/speech/pronounce`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ word: trimmed }),
        });

        if (!response.ok) {
          throw new Error(`Pronunciation request failed (${response.status})`);
        }

        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(blob);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audioUrlRef.current = audioUrl;

        mark.classList.remove("pronounce-loading");
        mark.classList.add("pronounce-playing");

        const reset = () => {
          mark.classList.remove("pronounce-playing");
          restoreHighlight();
          cleanupAudio();
        };

        audio.addEventListener("ended", reset, { once: true });
        audio.addEventListener("error", reset, { once: true });

        await audio.play();
      } catch (error: any) {
        restoreHighlight();
        cleanupAudio();
        toast({
          title: "Pronunciation failed",
          description: error?.message || "Could not generate pronunciation",
          variant: "destructive",
        });
      }
    };

    container.addEventListener("mouseup", handleClick);
    container.addEventListener("touchend", handleClick);

    return () => {
      container.removeEventListener("mouseup", handleClick);
      container.removeEventListener("touchend", handleClick);
      restoreHighlight();
      cleanupAudio();
    };
  }, [enabled, targetSelector, toast]);

  return null;
};

export default PronunciationHandler;
