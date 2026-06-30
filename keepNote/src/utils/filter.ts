import type { Note } from "../types/Note";

export default function filterNotes(notes:Note[],searchText:string):Note[]{
  if(!searchText) return notes;
  else {
  const result = notes.filter((note)=> 
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return result;
  }
 }
