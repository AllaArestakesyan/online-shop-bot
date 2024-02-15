export interface LoginDTO { 
    email:string,
    password:string
}
export interface RegisterDTO { 
    name:string;
    surname:string;
    email:string;
    password:string;
    role:number;
}

export interface VerificationDto{
    email:string;
    token:string;
}