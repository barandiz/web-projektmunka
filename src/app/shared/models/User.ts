export interface User {
    id:string;
    email: string;
    //Jelszót ne itt tároljuk
    //password: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    }
    editorOrPlayer: string;
}