import { RouterModule, Routes } from '@angular/router';
import { ListahabitacionesComponent } from './components/listahabitaciones/listahabitaciones.component';

const APP_ROUTES: Routes = [
  {path: 'listaHabitaciones', component: ListahabitacionesComponent},
  {path: '**', pathMatch: 'full', redirectTo:'listaHabitaciones'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);