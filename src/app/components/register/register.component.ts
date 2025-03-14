import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(private general: GeneralService) { }
  ngOnInit() {
    this.general.setBar([1, 0, 0]);
    this.general.setTitle('Registro');
  }
}
