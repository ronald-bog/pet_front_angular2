import { Component, inject } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Router } from "@angular/router";
import { SecurityService } from 'src/app/services/security.service';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  title: any;
  session = 0;
  prueba = 'otro';
  bar: any = [];
  isBurgerOpen = false;
  isMenuOpen = false;
  theme: any = 'light';
  private general = inject(GeneralService);
  private security = inject(SecurityService);
  private router = inject(Router);
  private endpoint = inject(Location);

  ngOnInit() {
    setInterval(() => {
      if (sessionStorage.getItem('session') != null) {
        this.verif();
      }
    }, 300000);
  }

  verif() {
    this.security.verif()
      .pipe(
        catchError((error) => {
          this.logout();
          Swal.fire({
            title: "Su sesión ha finalizado.",
            icon: "error",
            timer: 5000,
          });
          throw error;
        })
      ).subscribe();
  }

  ngDoCheck() {
    this.title = this.general.getTitle();
    this.bar = this.general.getBar();
    this.session = sessionStorage.getItem('session') != null ? 1 : 0;
  }

  toggleMenu() {
    this.isBurgerOpen = !this.isBurgerOpen;
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
    this.session = 0;
  }

  logoutB() {
    this.toggleMenu();
    this.logout();
  }

  onSeleccionarOrden(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const option = selectedValue === 'antiguos' ? 1 : 2;
    localStorage.setItem('option', String(option));
    location.reload();
  }

  // onSeleccionarOrden(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   this.general.setOrder(selectedValue === 'antiguos' ? 1 : 2);
  //   const endpoint = this.endpoint.path();
  //   this.router.navigate(['spinner']);
  //   const time = (endpoint === '/galeria') ? 100 : 1000;
  //   setTimeout(() => {
      // switch (endpoint) {
      //   case '/catalog':
      //     this.router.navigate(['catalog']);
      //     break;
      //   case '/types':
      //     this.router.navigate(['types']);
      //     break;
      //   default:
      //     this.router.navigate(['galeria']);
      // }
  //   }, time);
  // }

  type(event: Event) {
    const option = (event.target as HTMLSelectElement).value;
    this.router.navigate(['types']);
    sessionStorage.setItem('type', option);
    setTimeout(() => {
      this.router.navigate(['spinner']);
      window.location.reload();
    }, 1000);
  }

  changeTheme(e: string) {
    document.body.classList.toggle('dark')
  }
}
