import {  Box, Button, Card, CardContent, Collapse, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Note } from "../types/Note";
import { JSX } from "@emotion/react/jsx-runtime";


type AddNoteFormProps ={
    onAddNote:(note:Note)=>void;
}

export default function AddNoteForm({onAddNote}:AddNoteFormProps):JSX.Element{
    const [expanded,setExpanded]= useState<boolean>(false);
    const userId = localStorage.getItem("userId") || "";
    const [formData,setFormData]=useState<Omit<Note,"id">>({
        title:"",
        description:"",
        category:"",
        priority:"High" ,
        status:"yet-to-start" ,
        userId:userId
    })
    const [errors,setErrors]=useState<{[key:string]:string}>({});




    const validateInput =(name: string,value:string)=>{
        const newErrors ={...errors};
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

        if(name === "priority"){
            if(!value){newErrors.priority = "Priority is required"}
            else delete newErrors.priority;
        }

        // if(name === "status"){
        //     if(!value){newErrors.status = "Status is required"}
        //     else delete newErrors.status;
        // }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
     const {name,value} = e.target;
     setFormData({...formData,[name]:value})
    };

    const handleSelectChange=(e:SelectChangeEvent<string>)=>{
        const {name,value} = e.target;
     setFormData({...formData,[name]:value})
    }

    const clearFormData=()=>{
        setFormData({
            title:"",
            description:"",
            category:"",
            priority:"High",
            status:"yet-to-start",
            userId:userId
        })

        setErrors({});
    }
    
    const handleSubmit =async (e:React.FormEvent)=>{
        e.preventDefault();
        if(!validateInput("title",formData.title)|| !validateInput("description",formData.description)|| !validateInput("category",formData.category) || !validateInput("priority",formData.priority))return;

        try{
            const newNote :Note={
                id:(Date.now()),
                title: formData.title,
                description: formData.description,
                category: formData.category,
                priority: formData.priority,
                status:formData.status,
                userId:userId
            }
            onAddNote(newNote);
            clearFormData();
        } catch(error){
            console.error("Error submitting form:", error);
            clearFormData();
        }
    }
    function handleExpandClick(){
        setExpanded(!expanded);
    };

    return(
        <Container maxWidth="sm" >
            <Card sx={{ bgcolor: "whitesmoke", boxShadow: 3 }}>
                <CardContent onClick={handleExpandClick}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                        Add Note Details
                    </Typography>
                    <ExpandMoreIcon sx= {{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}/>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={() => validateInput("title", formData?.title)}
                    error={!!errors.title}
                    helperText={errors.title}
                    fullWidth
                    margin="normal"

                     />
                    <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={()=>{validateInput("description",formData.description)}}
                    error={!!errors.description}
                    helperText={errors.description}
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                    />
                    
                    <TextField 
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={()=>{validateInput("category",formData.category)}}
                    error={!!errors.category}
                    helperText={errors.category}
                    fullWidth
                    margin="normal"
                    />
                
                    <TextField
                        fullWidth
                        margin="normal"
                        select
                        name="priority"
                        label="Priority"
                        value={formData.priority}
                        onChange={handleChange}
                        onBlur={()=>{validateInput("priority",formData.priority)}}
                        error={!!errors.priority}
                        helperText={errors.priority}
                    >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem> 
                        <MenuItem value="Low">Low</MenuItem>  
                    </TextField>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                        labelId="status"
                        name="status"
                        label="Status"
                        value={formData.status}
                        onChange={handleSelectChange}
                        required
                        >
                            <MenuItem value="yet-to-start">Yet-To-Start</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{display:"flex",justifyContent:"space-between",mt:3}}>
                        <Button 
                        type="button"
                        variant="outlined"
                        onClick={clearFormData}
                        >Reset</Button>
                        <Button
                        type="submit"
                        variant="contained">Add Note</Button>
                    </Box>
                    </form>
                </CardContent>
                </Collapse>
            </Card>
        </Container>
    )
}