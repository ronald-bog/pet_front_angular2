import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'house';
  showButton = false;

  @HostListener('window:scroll')
  scroll() {
    this.showButton = document.documentElement.scrollTop > 500 || window.scrollY > 500;
  }

  scrollTop() {
    document.documentElement.scrollTop = 0;
  }
}
