import { type ChangeEvent, type JSX } from "react";
import { Box,TextField,InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";



type searchNoteProps ={
    onSearchNotes : (e:ChangeEvent<HTMLInputElement>) => void;
    onClearSearchNotes : ()=> void;
    searchText:string;
}

export default function SearchNote({onSearchNotes,onClearSearchNotes,searchText}:searchNoteProps):JSX.Element{
    return (
        <Box >
            <TextField size="small"   placeholder="Search For Notes"  
            value={searchText} 
            onChange={onSearchNotes} 
             sx={{
          backgroundColor: "white","& .MuiOutlinedInput-notchedOutline": {border: "none",},
        }}
          slotProps={{
            input: {
                endAdornment:searchText !== "" &&(
                    <InputAdornment position="end">
                        <IconButton onClick={onClearSearchNotes} edge="end">
                            <ClearIcon/>
                        </IconButton>
                    </InputAdornment>
                ) 
            }
            }}
             />
        </Box>
    )
}