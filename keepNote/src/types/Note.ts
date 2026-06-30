
export  interface Note  {
id:number,
title: string,
description: string,
status:"completed"|"yet-to-start"  ,
priority:"High"|"Medium"|"Low",
category:string,
userId:string
}