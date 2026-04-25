import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { EditarComponent } from './pages/editar/editar.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'editar/:id', component: EditarComponent },
    { path: 'detalhes/:id', component: DetalhesComponent }
];
