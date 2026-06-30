import { useCallback, useContext, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Footer } from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import type { Note } from "./types/Note";
import SearchNote from "./components/searchNote/SearchNote";
import filterNotes from "./utils/filter";
import useFetch from "./hooks/useFetch";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import axios from "axios";
import AppRoute from "./routes/AppRoute.tsx";
import AuthContext from "./context/AuthContext.tsx";
import { useLocation } from "react-router-dom";
// import { initialNotesState, notesReducer } from "./reducers/NotesReducer.ts";


function App() {
  const renderCount = useRef(0);
  renderCount.current++;
  console.log(`App render count: ${renderCount.current}`);


  const [searchText,setSearchText] = useState<string>("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);

  const {isLoggedIn,rootDispatch,rootState}=useContext(AuthContext)!;
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    msg: string;
  }>({
    open: false,
    type: "success",
    msg: "",
  });

  const location = useLocation();

const showSearchControls =
  isLoggedIn && location.pathname === "/home";

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

//  const [state,dispatch]= useReducer(notesReducer,initialNotesState)

 const userId = localStorage.getItem("userId")
 const { data: notes, loading, error } = useFetch<Note[]>(`http://localhost:3000/notes?userId=${userId}`);

 useEffect(()=>{
  if(notes){
  rootDispatch({
    type:"SET_NOTES",
    payload:notes
  })}
 },[notes,rootDispatch])
 
 const filteredNotes =useMemo(()=>
   !isAdvancedSearch ? filterNotes(rootState.notes.notes,searchText) : rootState.notes.notes
 ,[rootState.notes.notes,searchText,isAdvancedSearch]) 


  // Update document title
  useEffect(() => {
    if (isAdvancedSearch) {
      document.title = "Advanced Search - Keep Note";
    } else if (searchText.trim()) {
      document.title = `Searching for: ${searchText}`;
    } else {
      document.title = "Keep Note";
    }
  }, [searchText, isAdvancedSearch]);

function handleSearchNote(e:ChangeEvent<HTMLInputElement>):void{
        setSearchText(e.target.value);
    }
function handleClearSearchNote(): void {
    setSearchText("");
  }

const handleAddNote = useCallback(async (newNote: Note)=>{
  console.log("same refernce");
    try {
      const response = await axios.post("http://localhost:3000/notes", newNote);
      console.log("Submitted:", response.data);
      rootDispatch({
        type:"ADD_NOTE",
        payload:response.data
      })
      setSnackbar({
        open: true,
        type: "success",
        msg: "Note added successfully!",
      });
    } catch (error) {
      console.error("Error submitting note:", error);
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to add Note. Try again.",
      });

    } 
},[rootDispatch])



const handleEditNote= useCallback((note:Note)=>{
  const editNote = async ()=>{
    try {
      const response = await axios.put(
        `http://localhost:3000/notes/${note.id}`,note
      );

    console.log("Note edited successfully:",response.data);

    rootDispatch({
      type:"EDIT_NOTE",
      payload:response.data
    })
    setSnackbar({
      open:true,
      type:"success",
      msg:"Note updated successfully!",
    });
    } catch(error){
      console.log("Error editing note:",error);
      setSnackbar({
        open:true,
        type: "error",
        msg: "Failed to edit note.Try again.",
      });
    }
  }
  editNote();
},[rootDispatch])

const handleDeleteNote = useCallback(async (id:number)=>{
  try {
    await axios.delete(`http://localhost:3000/notes/${id}`);
    rootDispatch({
      type:"DELETE_NOTE",
      payload:id
    })
    console.log("Deleted note with id:",id);
    setSnackbar({
      open:true,
      type:"success",
      msg:"Note deleted successfully",
    });
  }catch(error){
   console.log("Error deleting note:",error);
   setSnackbar({
    open: true,
    type: "error",
    msg:"Failed to delete note. Try again.",
   })
  }
},[rootDispatch])
  return (
    <Box>
      <Header>
        {showSearchControls && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {isLoggedIn && (
            <>
               {!isAdvancedSearch && (
              <SearchNote searchText={searchText} onSearchNotes={handleSearchNote}
              onClearSearchNotes={handleClearSearchNote}
              />
          )}
          <Button variant="contained"
            onClick={() => {setIsAdvancedSearch((prev) => !prev);
            }
            }
            sx={{
              padding :"8px",
              borderRadius: "5px",
              backgroundColor: !isAdvancedSearch ?"rgb(255, 196, 0)":"whitesmoke",
              color: !isAdvancedSearch ?"white":"black",
              fontWeight: "bold"
            }}
            >
            {isAdvancedSearch ? '⬅ Back to Basic View' : '🔍 Advanced Search'}
          </Button>
          </>
          )}
        </Box>
        )}
      </Header>
      <Box component = "main"
       sx={{
        backgroundColor: "#333333",
        minHeight: "90vh",
        color: "white",
      }}>
        <AppRoute 
          isAdvancedSearch={isAdvancedSearch}
          loading={loading}
          error={error}
          filteredNotes={filteredNotes}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          onEditNote ={handleEditNote}
        />
      </Box>
      <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.type}
            sx={{ width: "100%", fontSize: "1.2rem" }}
          >
            {snackbar.msg}
          </Alert>
        </Snackbar>

      <Footer />
    </Box>
  );
}

export default App;
