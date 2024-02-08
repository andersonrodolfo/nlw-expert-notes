import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/50" />
      <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
        <Dialog.DialogClose className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
          <X className="size-5" />
        </Dialog.DialogClose>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
