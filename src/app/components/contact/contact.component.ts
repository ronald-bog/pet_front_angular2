import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  nombre: FormControl = new FormControl('', Validators.required);
  apellido: FormControl = new FormControl();
  email: FormControl = new FormControl('', [Validators.required, Validators.email, this.validateEmailExtension()]);
  asunto: FormControl = new FormControl('', Validators.required);
  mensaje: FormControl = new FormControl('', Validators.required)

  constructor(private general: GeneralService, private router: Router,
    private backend: BackendService) { }

  ngOnInit() {
    this.general.setBar([1, 0, 0]);
    this.general.setTitle('Contacto');
  }

  validateEmailExtension(): ValidatorFn {
    return (control: any) => {
      const email = control.value;
      const extensionRegex = /\.([a-zA-Z]{2,})$/;
      if (email && !extensionRegex.test(email)) {
        return { invalidExtension: true };
      }
      return null;
    };
  }

  contact(): void {
    let contact: Contact = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      email: this.email.value,
      asunto: this.asunto.value,
      mensaje: this.mensaje.value
    };

    this.backend.contact(contact).pipe(
      tap((data) => {
        Swal.fire({
          icon: 'success',
          title: "Mensaje Enviado",
          text: "Gracias por su mensaje. Lo revisaremos y le responderemos a la brevedad.",
          timer: 5000,
        });
        this.nombre.reset();
        this.apellido.reset();
        this.email.reset();
        this.asunto.reset();
        this.mensaje.reset();

      }),
      catchError((error) => {
        Swal.fire({
          title: "No fue posible enviar su mensaje.",
          text: "Por favor reintente.",
          icon: "error",
          timer: 5000,
        });
        this.router.navigate(['contact']);
        throw error;
      })
    ).subscribe();
  }
}

