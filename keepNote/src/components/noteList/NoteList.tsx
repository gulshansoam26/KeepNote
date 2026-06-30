import type { JSX } from "react/jsx-runtime";
import NoteCard from "../NoteCard";
import type { Note } from "../../types/Note";
import { useMemo, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";


type NoteProps ={
    notes: Note[];
    onDeleteNote: (id:number)=>void;
}

export function NoteList({notes,onDeleteNote}:NoteProps) :JSX.Element{
    let [sortBy,setSortBy] = useState<string>("");
function handleSortChange(e: SelectChangeEvent){
    setSortBy(e.target.value);
}
console.log("Sort By:")
// let sorted = [...notes].sort((note1,note2)=> {
//     if(sortBy === "status") return note1.status.localeCompare(note2.status);

//     if(sortBy === "priority") return note1.priority.localeCompare(note2.priority)

//     return 0;
// })
const sortedNotes = useMemo(()=>{
    console.log("Sorting by:",sortBy);
    if(!sortBy) return notes;
    const copy = [...notes];
    copy.sort((a,b)=>{
        if(sortBy === "status") return a.status.localeCompare(b.status);

        if(sortBy === "priority") return a.priority.localeCompare(b.priority);

        return 0;
    })
    return copy;
},[sortBy,notes]);
  
    return (
        <>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "fit-content",
            margin: "20px auto"
        }}>
            <FormControl size="small" sx={{ minWidth: 160}}>
                <InputLabel id="sort-label" sx={{color:"white"}}>Sort By</InputLabel>
                <Select 
                labelId="sort-label"
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort by"
                >
                    <MenuItem value=""><em>--Select--</em></MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="priority">Priority</MenuItem>
                </Select>
            </FormControl> 
        </Box>
        <Grid 
        container
        spacing={2}
        sx={{
             justifyContent:"center",
             paddingBottom: "20px"
        }}
        >
            {sortedNotes.length !=0 ?sortedNotes.map((note:Note)=>(
                <Grid key={note.id}>
                     <NoteCard  note={note} onDeleteNote={onDeleteNote}/>
                </Grid>
            )):<p>No notes Found</p>}
        </Grid>
        </>
    );
}