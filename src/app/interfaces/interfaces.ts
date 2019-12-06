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
export interface RespuestaPosts {
    _id?: string;
    id_usuario?: string;
    photo?: string;
    first_name?: string;
    last_name?: string;
    descripcion?: string;
    lugar?: string;
    ubicacion?: string;
    like?: Number;
    createdAt?: string;
  }

export interface Post {
    descripcion?: string;
    ubicacion?: string;
    id_usuario?: string;
    lugar?: string;
    like?: string;
}

