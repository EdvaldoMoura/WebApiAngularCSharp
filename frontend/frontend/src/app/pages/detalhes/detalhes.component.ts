import { Component } from '@angular/core';
import { UsuariosListar } from '../../Models/Usuarios';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';  
import { CommonModule } from '@angular/common';
import { FormularioComponent } from '../../componentes/formulario/formulario.component';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, FormularioComponent],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {

  btnAcao: string = "Detalhes do Usuário";
  descricaoTitulo: string = "Detalhes do Usuário";
  disabled: boolean = true;
  usuario!: UsuariosListar;

  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.usuariosService.GetUsuarioId(id).subscribe((response) => {
        this.usuario = response.dados;
      });
    }
  }
}
