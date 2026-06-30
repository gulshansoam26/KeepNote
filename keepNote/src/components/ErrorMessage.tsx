import type { JSX } from "react";
import styled from "styled-components";
type ErrorMessageProps = {
  message: string;
};

const Error = styled.p`
color:red;
text-align:center;
margin:0;
padding:32px;
font-weight:bold
`;

export default function ErrorMessage({message}:ErrorMessageProps):JSX.Element{
    return(
        <Error >{message}</Error>
    )
}