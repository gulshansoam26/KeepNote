import { JSX } from "@emotion/react/jsx-runtime";
import { Container, Typography } from "@mui/material";

export default function NotFound():JSX.Element{
    return(
        <Container>
            <Typography variant="h3" align="center" sx={{paddingTop:5}}>Page Not found</Typography>
            <Typography variant="body2" align="center" sx={{mt:2}}>Requested page not found !!!</Typography>
        </Container>
    )
}