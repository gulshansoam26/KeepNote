import type { JSX } from "react";
import { NoteList } from "../../components/noteList/NoteList";
// import notes from "../data/notes";
import type { Note } from "../../types/Note";
import styles from './NoteManager.module.css';
import AddNoteForm from '../../components/AddNoteForm'
type NotesProps ={
    notes: Note[];
    onAddNote:(note:Note)=>void;
    onDeleteNote:(id:number)=>void;
}

export default function NoteManager({notes,onAddNote,onDeleteNote}:NotesProps):JSX.Element{
    return (
        <div>
            <h2 className={styles.heading}>Checklist Chronicles: Conquering Tasks One Tick at a Time</h2>
               <AddNoteForm onAddNote={onAddNote}></AddNoteForm>
            <NoteList notes={notes} onDeleteNote={onDeleteNote}/>
        </div>
    )
}