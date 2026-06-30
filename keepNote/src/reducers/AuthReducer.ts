export type LoggedState ={
    isLoggedIn: boolean;
}

export type LoggedActions = 
    | {type:"LOGIN"} | {type:"LOGOUT"};


export const initialLoggedState : LoggedState ={
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true"
}    

export function authReducer (state:LoggedState,action:LoggedActions):LoggedState{
    switch(action.type){
        case "LOGIN": {
            return {isLoggedIn:true}
        }
        case "LOGOUT":{
            return {isLoggedIn:false}
        }
        default : return state;
    }
}