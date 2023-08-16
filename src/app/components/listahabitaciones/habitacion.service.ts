import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habitacion } from './habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private url = "Habitacion"

  constructor(private http: HttpClient) { }

  //peticiones a ApiMiHotel

  //lista de habitaciones
  public getHabitacion() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.baseUrl}/${this.url}`);
  }

  //peticion para crear nueva habitacion, se debe implementar en api
  public postHabitacion(habitacion: Habitacion) : Observable<Habitacion[]>{
    return this.http.post<Habitacion[]>( `${environment.baseUrl}/${this.url}`,habitacion);
  }


  //realizar reservacion
  public reservarHabitacion(id: number, reservado: boolean) : Observable<Habitacion[]>
  {
    return this.http.put<any>(`${environment.baseUrl}/${this.url}/ReservarHabitacion/${id}`,reservado).pipe(
      catchError(e => {
        return throwError(() => {
          Error(e);
        });
      })
    )
  }

  //peticion para eliminar habitacion, se debe implementar en api
  public deleteHabitacion(habitacion: Habitacion) : Observable<Habitacion[]>{
    return this.http.delete<Habitacion[]>(`${environment.baseUrl}/${this.url}/${habitacion.idHabitacion}`);
  }
}
