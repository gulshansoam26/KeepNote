import { JSX } from "@emotion/react/jsx-runtime";
import { Note } from "../../types/Note";
import { Box, Card, CardActions, CardContent, Container, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";


type NoteDetailProps={
   onEditNote:(note:Note)=> Promise<void>|void;
   onDeleteNote:(id:number)=> void;
}
export default function NoteDetail({onEditNote,onDeleteNote}:NoteDetailProps):JSX.Element{

const {id} = useParams<{id:string}>();
const navigate = useNavigate();
const userId = localStorage.getItem("userId");
const [formData,setFormData] = useState<Omit<Note,"id">>({
    title:"",
    description:"",
    category:"",
    priority:"High",
    status:"yet-to-start",
    userId: ""
})

const [err,setErrors]= useState<{[key:string]:string}>({});

const {
    data: note,
    loading,
    error,
} = useFetch<Note>(id ? `http://localhost:3000/notes/${id}`:"");

useEffect(()=>{
    if(note){
        setFormData({
            title:note.title,
            description:note.description,
            category:note.category,
            priority:note.priority,
            status:note.status,
            userId: userId || ""
        })
    }
},[note]);

const validateInput =(name: string,value:string)=>{
        const newErrors ={...err};
        if(name === "title"){
            if(!value || (typeof value === "string" && value.length < 3)){
            newErrors.title ="Title must be at least 3 characters.";
            }else delete newErrors.title;
        }

        if(name === "description"){
            if(!value || (typeof value === "string" && value.length<5)){
                newErrors.description="Description must be at least 5 characters."
            }else delete newErrors.description;
        }

        if(name === "category"){
            if(!value ){
                newErrors.category= "Category is required."
            }else delete newErrors.category;
        }

         setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    const {name ,value}= event.target;
    setFormData((prevData)=>({
        ...prevData,[name]:value
    }))
}

const handleSelectChange =(e:SelectChangeEvent<string>)=>{
    const {name,value} = e.target;
    if(name){
        setFormData({...formData,[name]:value});
    }
}

const deleteNote = async() => {
    if(note) {
     await onDeleteNote(note.id);
      navigate("/home");
    }
  };

const editNote = async (event:React.FormEvent)=>{
    event.preventDefault();
    if(!note) return;

    if(!validateInput("title",formData.title)|| !validateInput("description",formData.description)|| !validateInput("category",formData.category))return;

    try{
        const updatedNote : Note ={
            ...note,
            title:formData.title,
            description:formData.description,
            category:formData.category,
            priority:formData.priority,
            status:formData.status
        };

        await onEditNote(updatedNote);
        navigate("/home");
    }catch(error){
        console.error("Error submitting form:",error);
    }
}

if(loading){
    return (
        <Container maxWidth="sm">
               <Typography variant="h6" sx={{padding:5}}>
                Loading note details...
            </Typography>
        </Container>
    )
}

if (error) {
    return (
      <Container maxWidth="sm">
          <Typography variant="h6" sx={{ padding: 4, color: "red" }}>
          {error}
        </Typography> 
      </Container>
    );
  }

  if (!note) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ padding:4}}>
          Loading fruit details...
        </Typography>
      </Container>
    );
  }



return (
  <Container maxWidth="sm" sx={{minHeight:"80vh"}}>
    <Box sx={{padding:5}}>
    <Card
      sx={{
        maxWidth: 450,
        bgColor:"#fafafa",
        boxShadow:3,
      }}
    >
    <form onSubmit={editNote}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Edit Note
            </Typography>

            <TextField 
              label="Title"
              name="title"
              margin="normal"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              onBlur={()=>validateInput("title",formData.title)}
              error={!!err.title}
              helperText={err.title}
            />
            
            <TextField 
              label="Description"
              name="description"
              multiline
              rows={3}
              margin="normal"
              fullWidth
              value={formData.description}
              onChange={handleChange}
              onBlur={()=>validateInput("description",formData.description)}
              error={!!err.description}
              helperText={err.description}
            />

            <TextField 
              label="Category"
              name="category"
              margin="normal"
              fullWidth
              value={formData.category}
              onChange={handleChange}
              onBlur={()=>validateInput("category",formData.category)}
              error={!!err.category}
              helperText={err.category}
            />

            <TextField
              fullWidth
              margin="normal"
              select
              name="priority"
              label="Priority"
              value={formData.priority}
              onChange={handleChange}
            >
               <MenuItem value="High">High</MenuItem>
               <MenuItem value="Medium">Medium</MenuItem> 
               <MenuItem value="Low">Low</MenuItem>  
            </TextField>

            <FormControl 
               fullWidth margin="normal">
                <InputLabel 
                id="status"
                >Status
                </InputLabel>
                <Select
                    labelId="status"
                    name="status"
                    label="Status"
                    required
                    value={formData.status}
                    onChange={handleSelectChange}
                >
                  <MenuItem value="yet-to-start">Yet-To-Start</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
            </FormControl>

        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
            <IconButton color="success" size="large" type="submit">
              <SaveIcon />
            </IconButton>
            <IconButton color="error" size="large"
            onClick={deleteNote} >
              <DeleteIcon />
            </IconButton>
        </CardActions>
    </form>
    </Card>
    </Box>
  </Container>
)
}