import { Note } from "../types/Note";

export type NotesState = {
    notes: Note[];
}

export type NotesAction = 
  |{type: "SET_NOTES",payload:Note[]}
  |{type:"ADD_NOTE",payload: Note}
  |{type: "EDIT_NOTE",payload: Note}
  |{type:"DELETE_NOTE",payload: number};

export  const initialNotesState : NotesState={
      notes : []
  } ;

  export function notesReducer(state: NotesState,action:NotesAction):NotesState{
    switch(action.type){
        case "SET_NOTES":
           return {...state,notes:action.payload};

        case  "ADD_NOTE":
            return {...state,notes:[...state.notes,action.payload]};

        case "EDIT_NOTE":
            return {...state,notes: state.notes.map((n)=> n.id === action.payload.id ? action.payload : n )};

        case "DELETE_NOTE":
            const filtered = state.notes.filter((n)=>n.id !== action.payload)
            return {...state,notes:filtered};

        default :return state;
    }
  }