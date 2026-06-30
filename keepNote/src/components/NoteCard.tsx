import type { JSX } from "react";
import type { Note } from "../types/Note";
import { Card, CardContent, Typography, Box, Tooltip,Chip, CardActions, IconButton } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type cardProps={
  note:Note,
  onDeleteNote:(id:number)=>void;
}

export default function NoteCard({note,onDeleteNote}:cardProps):JSX.Element{
    const {title,description,status,category,priority,id}=note;

    const deleteNote = ()=>{
      console.log("Delete fruit with id:",id);
      onDeleteNote(id);
    }

    return (
        <Card sx={{
          backgroundColor: "rgba(128, 128, 128, 0.11)",
          width: 270,
          borderRadius: "5px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.715)" ,
          color:"white",
          "&:hover": {
          border: "1px solid white",
          transform: "scale(1.02)",
        }}}
        > 
        <CardContent sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      height:"100%",
      boxSizing: "border-box",
      p: 1
    }}>
         <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}>
              <Tooltip title={`${priority} priority`} arrow>
                  <CircleIcon
                    sx={{
                        color:
                        priority === "High"
                        ? "red"
                        : priority === "Medium"
                        ? "yellow"
                        : "green",
                        cursor: "pointer",
                       }}
                  />
               </Tooltip>
                <Typography variant="h6"> {title}</Typography> 
            </Box>
            <Box sx={{
              gap:2
            }}>
                <Typography sx={{fontSize:"16px"}}>{description}</Typography>
               <Chip
               label={category}
               variant="outlined"
               sx={{bgcolor:"grey" ,
                color:"white",
                fontWeight:"bold",
                width: "fit-content",
                mt:1
               }}
              />
            </Box>
               <Typography 
                  sx={{
    color:
      status === "completed"
        ? "success.main"
        : "warning.main",
        fontWeight:"bold",
        mt:"auto"
  }}
                >{status}</Typography> 
        </CardContent>
        <CardActions sx={{justifyContent:"flex-end"}}>
          <Link to={`/notes/${id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

            <IconButton color="error" onClick={deleteNote}>
              <DeleteIcon />
            </IconButton>
        </CardActions>
        </Card>
    )
}