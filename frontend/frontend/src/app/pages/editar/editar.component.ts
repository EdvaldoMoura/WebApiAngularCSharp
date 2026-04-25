import { Component } from '@angular/core';
import { FormularioComponent } from "../../componentes/formulario/formulario.component";
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosListar } from '../../Models/Usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

  btnAcao: string = "Atualizar";
  descricaoTitulo: string = "Editar Usuário";

  usuario!: UsuariosListar;

  constructor(private router: Router, private usuariosService: UsuariosService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.usuariosService.GetUsuarioId(id).subscribe((response) => {
      this.usuario = response.dados;
    });

  }

  EditarUsuario(usuario:UsuariosListar){
    this.usuariosService.EditarUsuario(usuario).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}
