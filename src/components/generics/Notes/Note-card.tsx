import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Modal } from "..";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  handleNoteDelete: (id: string) => void;
}

export function NoteCard({ note, handleNoteDelete }: Readonly<NoteCardProps>) {
  const formattedDate = formatDistanceToNow(note.date, {
    locale: ptBR,
    addSuffix: true,
  });
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formattedDate}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Modal>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-sm font-medium text-slate-300">
            {formattedDate}
          </span>
          <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        </div>
        <button
          type="button"
          className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          onClick={() => handleNoteDelete(note.id)}
        >
          Deseja{" "}
          <span className="text-red-400 group-hover:underline">
            apagar essa nota
          </span>
          <span className="text-slate-200">?</span>
        </button>
      </Modal>
    </Dialog.Root>
  );
}
