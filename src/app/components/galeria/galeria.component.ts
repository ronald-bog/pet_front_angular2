import { Component, inject } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
})
export class GaleriaComponent {
  catalog: any = [];
  page = 1;
  lightbox = 0;
  currentIndex = 0;
  totalImages = 0;
  likes: any = [];
  private general = inject(GeneralService);
  private backend = inject(BackendService);
  option= JSON.parse(localStorage.getItem('option') ?? '0');
  spinner = 1;

  ngOnInit() {
    this.list();
    this.general.setBar([1, 1, 1]);
    this.general.setTitle('GALERIA');
    this.likes = JSON.parse(localStorage.getItem('likes') ?? '[]');
  }

  list() {
    this.backend.galeria(this.page, this.option).subscribe(data => {
      this.catalog = data;
      this.totalImages = this.catalog.length;
      this.spinner = 0;
      console.log(this.catalog)
    });
  }

  onScrollDown() {
    //this.spinner = 1;
    this.page++;
    this.backend.galeria(this.page, this.option).subscribe(data => {
      this.catalog = this.catalog.concat(data);
      this.totalImages = this.catalog.length;
      //this.spinner = 0;
    });
  }

  onLightbox(index: any, id: any) {
    document.body.style.overflow = 'hidden';
    this.lightbox = 1;
    this.currentIndex = index;
    this.backend.visit(id).subscribe(() => this.list());
  }

  offLightbox() {
    document.body.style.overflow = 'auto';
    this.lightbox = 0;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
  }

  like(i: any) {
    this.backend.like(i).subscribe(() => {
      this.likes.push(i);
      this.list();
      localStorage.setItem('likes', JSON.stringify(this.likes));
    });
  }
}
