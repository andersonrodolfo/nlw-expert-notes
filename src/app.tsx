import { ChangeEvent, useState } from "react";

import { toast } from "sonner";

import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard, NoteCard } from "./components";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    return notesOnStorage ? JSON.parse(notesOnStorage) : [];
  });

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearch(value);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  function handleNoteCreate(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
  function handleNoteDelete(id: string) {
    const notesArray = notes.filter((note) => note.id !== id);
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));

    toast.success("Nota excluída com sucesso!");
  }

  return (
    <div className="mx-auto max-w-6xl my-6 space-y-3 px-5 md:my-12">
      <img src={logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-2xl md:text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard handleNoteCreate={handleNoteCreate} />

        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            handleNoteDelete={handleNoteDelete}
          />
        ))}
      </div>
    </div>
  );
}
