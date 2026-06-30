import { authReducer, LoggedActions, LoggedState } from "./AuthReducer"
import { NotesAction, notesReducer, NotesState } from "./NotesReducer";
import { initialLoggedState} from "./AuthReducer";
import {initialNotesState} from "./NotesReducer";

export type RootState ={
    auth: LoggedState;
    notes: NotesState;
}

export type RootActions = LoggedActions | NotesAction;

export const initialRootState : RootState ={
    auth : initialLoggedState,
    notes : initialNotesState
};

export function rootReducer(state:RootState,action :RootActions):RootState{
    return {
        auth : authReducer(state.auth,action as LoggedActions),
        notes : notesReducer(state.notes,action as NotesAction)
    }
}