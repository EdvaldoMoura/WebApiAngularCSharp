import { Component } from '@angular/core';
import { FormularioComponent } from '../../componentes/formulario/formulario.component';
import { UsuariosListar } from '../../Models/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
  btnAcao: string = "Cadastrar";
  descricaoTitulo: string = "Cadastro de Usuários";

  constructor(private usuariosService: UsuariosService, private router: Router) {

  }
  criarUsuario(usuario: UsuariosListar) {
    this.usuariosService.CriarUsuario(usuario).subscribe((response) => {
      
      if(response.dados){
        alert("Usuario cadastrado com sucesso");
      }else{
        alert("Erro ao cadastrar usuario");
      }
      this.router.navigate(['/']);
    });
  }

}
