import { Component, OnInit } from '@angular/core';
import { HabitacionService } from './habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from './habitacion.model';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listahabitaciones',
  templateUrl: './listahabitaciones.component.html',
  styleUrls: ['./listahabitaciones.component.scss']
})
export class ListahabitacionesComponent implements OnInit {

  //variables calendario
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
	toDate: NgbDate | null = null;

  //variables locales para utilizar en modal
  idHabitacionReservado: number;
  tipoHabitacionReservado: string;
  fotoHabitacionReservado: string;
  descripHabitacionReservado: string;
  precioHabitacionReservado: number;
  reservado: boolean;

  //definir nueva habitacion
  habitacion: Habitacion = new Habitacion;
  //definir lista de habitaciones
  habitaciones: any[] = []

  //recibir dependencias
  constructor(private calendar: NgbCalendar,private HabitacionService: HabitacionService,public formatter: NgbDateParserFormatter, private router: Router, private activatedRoute: ActivatedRoute) {
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  //revisar habitacion.service
  //mostrar lista de habitaciones 
  ngOnInit(): void {
    this.HabitacionService.getHabitacion().subscribe((result: Habitacion[]) => (this.habitaciones = result));
  }

  //realizar reservacion
  realizarReservacion() : void
  {
    this.reservado = false;

    Swal.fire({
      title: 'Reservar',
      text: `Esta seguro de reservar esta habitación`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
      }).then(resultado =>{
        if(resultado.isConfirmed){
          this.HabitacionService.reservarHabitacion(this.idHabitacionReservado,this.reservado).subscribe(
            response => {
              const mensaje = `La habitacion se ha reservado con exito`;
              Swal.fire({
                icon: 'success',
                title: 'Habitaciones',
                text: mensaje,
                }).then(result =>{
                  window.location.reload();
                });
              },
              e => {
                Swal.fire({icon: 'error', title: 'Habitaciones ', text: e});
                
              }
          )
        }
      });
    
  }
  //recibir datos en modal
  reservar(habitacion: Habitacion)
  {
    this.idHabitacionReservado = habitacion.idHabitacion;
    this.tipoHabitacionReservado = habitacion.tipo;
    this.descripHabitacionReservado = habitacion.descripcion;
    this.precioHabitacionReservado = habitacion.precio;
    this.fotoHabitacionReservado = habitacion.foto;

  }

  //metodos necesarios para calendario
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

}
