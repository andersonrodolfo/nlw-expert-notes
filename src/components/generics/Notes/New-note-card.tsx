import { ChangeEvent, FormEvent, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

import { Modal } from "..";

interface NewNoteCardProps {
  handleNoteCreate: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ handleNoteCreate }: Readonly<NewNoteCardProps>) {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShowOnboarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setContent(value);
    if (value === "") setShowOnboarding(true);
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    handleNoteCreate(content);
    setContent("");
    setShowOnboarding(true);
    toast.success("Nota criada com sucesso!");
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning(
        "Infelizmente seu navegador não suporta gravação de áudio."
      );
      return;
    }
    setIsRecording(true);
    setShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();
    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    if (speechRecognition !== null) speechRecognition.stop();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Modal>
        <form className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              Adicionar nota
            </span>
            {showOnboarding ? (
              <p className="text-sm leading-6 text-slate-400">
                Comece{" "}
                <button
                  type="button"
                  className="font-medium text-lime-400 hover:underline"
                  onClick={handleStartRecording}
                >
                  gravando uma nota
                </button>{" "}
                em áudio ou se preferir{" "}
                <button
                  type="button"
                  className="font-medium text-lime-400 hover:underline"
                  onClick={handleStartEditor}
                >
                  utilize apenas texto.
                </button>
              </p>
            ) : (
              <textarea
                autoFocus
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleContentChange}
                value={content}
              />
            )}
          </div>
          {isRecording && (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              onClick={handleStopRecording}
            >
              <div className="inline-block size-3 rounded-full bg-red-500 animate-pulse" />
              Gravando! (clique p/ interromper)
            </button>
          )}
          {!showOnboarding && !isRecording && content && (
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              disabled={!content}
              onClick={handleSaveNote}
            >
              Salvar nota
            </button>
          )}
        </form>
      </Modal>
    </Dialog.Root>
  );
}
