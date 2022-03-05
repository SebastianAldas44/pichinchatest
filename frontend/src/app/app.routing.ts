import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoComponent } from './components/listado/listado.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ErrorComponent } from './components/error/error.component';

const AppRoutes: Routes = [
	{ path: '', component: ListadoComponent },
	{ path: 'registro', component: FormularioComponent },
	{ path: 'registro/:id', component: FormularioComponent },
	{ path: '**', component: ErrorComponent }
];

export const AppRouterWithProviders: any[] = [];
export const AppRouting: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);