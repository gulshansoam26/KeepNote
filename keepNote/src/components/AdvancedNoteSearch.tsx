import  { useState, type ChangeEvent } from "react";
import useFetch from "../hooks/useFetch";
import type { Note } from "../types/Note";
import ErrorMessage from "./ErrorMessage";
import NoteManager from "../pages/noteManager/NoteManager";
import { Box, Typography, TextField, Grid, Paper, MenuItem,Button } from "@mui/material";

export default function AdvancedNoteSearch(){
    const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  const buildSearchUrl = (): string => {
    if (!shouldSearch) return "";

    const url = "http://localhost:3000/notes?";
    const params: string[] = [];

    if (category.trim()) {
      params.push(`category=${encodeURIComponent(category)}`);
    }

    if (priority) {
      params.push(`priority=${priority}`);
    }

    return url + params.join("&");
  };
  
  const searchUrl = buildSearchUrl();
  const { data: fetchedResults, loading, error } = useFetch<Note[]>(searchUrl);



  const handleSearch = () => {
    if (category.trim() || priority) {
      setShouldSearch(true);
      setSearchCount((prev) => prev + 1);
      console.log(`Search triggered! URL will be: ${buildSearchUrl()}`);
    }
  };

  const handleClear = () => {
    setCategory("");
    setPriority("");
    setShouldSearch(false);
    console.log("Search cleared - no API call will be made");
  };

  const isSearchEnabled = category.trim().length >= 2 || priority;


  return (
    <Box sx={{
      maxWidth:"90%",
      padding: 5,
      margin: "0 auto",
    }}>
      <Paper sx={{
        width: { xs: "100%", md: "60%" },
        bgcolor:"rgba(128, 128, 128, 0.3)",
        padding: 2,
        marginBottom: "20px",
        borderRadius: 2,
        mx:"auto"
      }}>
        <Typography variant="h5" align="center" sx={{
          mb:2,
          fontWeight:"bold",
          color: "rgb(255, 196, 0)"
        }}>🔍 Advanced Note Search - By Category & Priority</Typography>
        {!shouldSearch && (
          <Typography variant="body2"  sx={{ mb: 2 ,color:"white"}}>Enter a category or priority and click "Search" to begin.</Typography>
        )}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid>
            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
              placeholder="e.g., academic,project..."
            />
          </Grid>
          <Grid size={4}>
            <TextField 
            select label="Priority"
            fullWidth 
            value={priority} 
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPriority(e.target.value)
              }>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 2
        }}>
          <Button
            sx={{bgcolor: "rgb(255, 196, 0)",
            color: "white",
             "&.Mui-disabled":{
              bgcolor: "#ccc",
              cursor: "not-allowed"
             }
            }}
            onClick={handleSearch}
            disabled={!isSearchEnabled}
            className="search-btn"
          >
            🔍 Search Notes
          </Button>
          <Button onClick={handleClear} 
          variant="contained" color="error">
            Clear
          </Button>
          <Typography variant="body2" sx={{
            color:"white"
          }}>
            Searches performed: {searchCount}
          </Typography>
        </Box>

        {shouldSearch && (
          <Box sx={{ fontSize: "0.85rem", color: "#e65100" }}>
            <strong>Current Search URL: </strong>
            <code>{searchUrl || "No active search"}</code>
          </Box>
        )}
      </Paper>

      {error && <ErrorMessage message={`Search failed: ${error}`} />}

      {shouldSearch && fetchedResults && !loading && (
        <Box>
          {Array.isArray(fetchedResults) ? (
            <NoteManager notes={fetchedResults} />
          ) : (
            <ErrorMessage message="We couldn’t load the search results. Please try again." />
          )}
        </Box>
      )}
    </Box>
  );


}