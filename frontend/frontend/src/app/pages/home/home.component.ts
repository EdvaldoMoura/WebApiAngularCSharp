import { Component, OnInit } from '@angular/core';
import { UsuariosListar } from '../../Models/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usuarios: UsuariosListar[] = [];
  usuariosGeral: UsuariosListar[] = [];

  constructor(private usuarioService: UsuariosService) {

  }
  ngOnInit(): void {

    this.usuarioService.GetUsuarios().subscribe(response => {

      if (response.status) {

        this.usuarios = response.dados; this.usuariosGeral = response.dados;
        console.log(this.usuarios);

      } else {
        console.log(response.mensagem);
      }
    });

  }

  pesquisar(event: Event) {

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    console.log("TARGET", target);
    console.log("VALUE", value);

    this.usuarios = this.usuariosGeral.filter(usuario => {
      return usuario.nome.toLowerCase().includes(value);
    })
  }

  deletar(id: number | undefined) {
    this.usuarioService.DeletarUsuario(id).subscribe(response => {
      alert(response.mensagem);
      window.location.reload();
      console.log(response)

    });
  }
}
