import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/LoginForm/Login";
import { Box } from "@mui/material";
import ErrorMessage from "../components/ErrorMessage";
import NoteManager from "../pages/noteManager/NoteManager";
import AdvancedNoteSearch from "../components/AdvancedNoteSearch";
import NoteDetail from "../components/NoteDetail/NoteDetail";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { Note } from "../types/Note";
import RegistrationForm from "../pages/RegistrationForm";
import UserProfile from "../pages/UserProfile/UserProfile";
import ProtectedRoute from "./ProtectedRoute";


interface AppRouteProps {
    isAdvancedSearch:boolean;
    loading:boolean;
    error:string|null;
    filteredNotes:Note[];
    onAddNote:(note:Note)=>void;
    onDeleteNote:(id:number)=>void;
    onEditNote:(note:Note)=>void;
}

export default function AppRoutes({
    isAdvancedSearch,
    loading,
    error,
    filteredNotes,
    onAddNote,
    onDeleteNote,
    onEditNote,
}:AppRouteProps){
    return (
        <Routes>
          {/* Login route */}
            <Route path="/login" element={<Login />} />

           {/* Redirect "/" → "/login" */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/*Register route  */}
            <Route path="/register" element={<RegistrationForm />}/>

          {/* Home route with NoteManager */}
          <Route 
            path="/home"
            element={
              <ProtectedRoute >
               {  !isAdvancedSearch  ? (
            <Box>
              {(loading)&&<p style={{textAlign:"center"}}>Loading notes....</p>}
              {(error)?
              <ErrorMessage message={error}/>:
              <NoteManager 
                notes={filteredNotes} 
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
              />}
            </Box>
              ):(
              <AdvancedNoteSearch onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}/>
              )}
            </ProtectedRoute>
            }
          />

           {/* Note detail */}
          <Route 
           path="/notes/:id"
           element={
            <ProtectedRoute >
              <NoteDetail 
              onEditNote ={onEditNote}
              onDeleteNote ={onDeleteNote}
            />
            </ProtectedRoute>
           }
          />
          
          {/* userProfile */}
          <Route  
           path="/profile" element={
           <ProtectedRoute >
             <UserProfile />
           </ProtectedRoute>
           }
          />


          {/* wildcard */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}