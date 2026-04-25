export interface UsuariosListar{

  id?:number;
  nome:string;
  email:string;
  cargo: string;
  salario:number;
  cpf:string;
  situacao:boolean; // 1 = ativo e 0 = inativo
  senha:string;

}
