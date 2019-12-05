export interface Componente{
    icon: string;
    name: string;
    redirectTo: string;
}

export interface login{
    id: string;
    ok: boolean;
    message?: string[];
}

export interface Usuarios{
    _id?: string;
    photo?: string;
    first_name?: string;
    last_name?: string;
    cedula?: string;
    date_nacimiento?: string;
    direccion?: string;
    celular?: string
    genero?: string;
    ocupacion?:string
    carrera?: string;
    codigo?: string; 
    password?: string; 
      
}

