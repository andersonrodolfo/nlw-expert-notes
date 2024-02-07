export function NoteCard() {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">Há 2 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ut
        illum ex assumenda consequuntur mollitia nostrum inventore ab ipsa
        dolores, blanditiis provident deleniti eius aperiam eveniet, veritatis,
        quam ea hic. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Possimus ut illum ex assumenda consequuntur mollitia nostrum inventore
        ab ipsa dolores, blanditiis provident deleniti eius aperiam eveniet,
        veritatis, quam ea hic.
      </p>
      <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  );
}