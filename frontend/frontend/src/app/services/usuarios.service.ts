import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosListar } from '../Models/Usuarios';
import { Response } from '../Models/Response';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  

  urlApi = environment.urlApi;

  constructor(private http : HttpClient) {}

  GetUsuarios():Observable<Response<UsuariosListar[]>>{

    return this.http.get<Response<UsuariosListar[]>>(this.urlApi);

  }
  DeletarUsuario(id:number | undefined):Observable<Response<UsuariosListar[]>>{

    return this.http.delete<Response<UsuariosListar[]>>(`${this.urlApi}/${id}`);
  }

  CriarUsuario(usuario:UsuariosListar):Observable<Response<UsuariosListar[]>>{

    return this.http.post<Response<UsuariosListar[]>>(`${this.urlApi}`,usuario);
  }

  GetUsuarioId(id: number):Observable<Response<UsuariosListar>>{
    return this.http.get<Response<UsuariosListar>>(`${this.urlApi}/${id}`);
  }

  EditarUsuario(usuario:UsuariosListar):Observable<Response<UsuariosListar[]>>{
    return this.http.put<Response<UsuariosListar[]>>(`${this.urlApi}`,usuario);
  }
}
