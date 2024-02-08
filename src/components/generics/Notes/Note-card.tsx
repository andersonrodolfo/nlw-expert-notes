import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Modal } from "..";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {note.date.toISOString()}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Modal>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-sm font-medium text-slate-300">
            {formatDistanceToNow(note.date, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
          <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        </div>
        <button
          type="button"
          className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
        >
          Deseja{" "}
          <span className="text-red-400 group-hover:underline">
            apagar essa nota
          </span>
          ?
        </button>
      </Modal>
    </Dialog.Root>
  );
}