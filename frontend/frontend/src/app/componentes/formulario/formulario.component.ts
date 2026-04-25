import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UsuariosListar } from '../../Models/Usuarios';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

  @Input() btnAcao!: string;
  @Input() descricaoTitulo!: string;
  @Input() dadosUsuario: UsuariosListar | null = null;
  @Input() disabled: boolean = false;
  @Output() onSubmit = new EventEmitter<UsuariosListar>();

  usuarioForm!: FormGroup;

  ngOnInit(): void {

    this.usuarioForm = new FormGroup({

      id: new FormControl(this.dadosUsuario ? this.dadosUsuario.id : 0),
      nome: new FormControl(this.dadosUsuario ? this.dadosUsuario.nome : ''),
      email: new FormControl(this.dadosUsuario ? this.dadosUsuario.email : ''),
      cargo: new FormControl(this.dadosUsuario ? this.dadosUsuario.cargo : ''),
      salario: new FormControl(this.dadosUsuario ? this.dadosUsuario.salario : 0),
      cpf: new FormControl(this.dadosUsuario ? this.dadosUsuario.cpf : ''),
      situacao: new FormControl(this.dadosUsuario ? this.dadosUsuario.situacao : true),
      senha: new FormControl(this.dadosUsuario ? this.dadosUsuario.senha : '')

    });

    if (this.disabled) {
      this.usuarioForm.disable();
    }
  }

  submit() {
    const usuario = {
      ...this.usuarioForm.value,
      situacao: this.usuarioForm.value.situacao === 'true' || this.usuarioForm.value.situacao === true
    };
    this.onSubmit.emit(usuario);
  }


}
