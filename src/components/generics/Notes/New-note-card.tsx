import { ChangeEvent, FormEvent, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

import { Modal } from "..";

export function NewNoteCard() {
  const [showOnboarding, setShowOnboarding] = useState(true);
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
    toast.success("Nota criada com sucesso!");
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
        <form className="flex flex-1 flex-col" onSubmit={handleSaveNote}>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              Adicionar nota
            </span>
            {showOnboarding ? (
              <p className="text-sm leading-6 text-slate-400">
                Comece{" "}
                <button className="font-medium text-lime-400 hover:underline">
                  gravando uma nota
                </button>{" "}
                em áudio ou se preferir{" "}
                <button
                  className="font-medium text-lime-400 hover:underline"
                  onClick={handleStartEditor}
                >
                  utilize apenas texto
                </button>
                .
              </p>
            ) : (
              <textarea
                autoFocus
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleContentChange}
              />
            )}
          </div>
          {!showOnboarding && content && (
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              disabled={!content}
            >
              Salvar nota
            </button>
          )}
        </form>
      </Modal>
    </Dialog.Root>
  );
}
