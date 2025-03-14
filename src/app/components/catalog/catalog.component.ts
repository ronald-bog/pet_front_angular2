import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { GeneralService } from 'src/app/services/general.service';
import { SecurityService } from 'src/app/services/security.service';
import { catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';

declare let Masonry: any;

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  catalog: any = [];
  page: any = 1;
  galleryType = 0;
  showMask = false;
  showCount = false;
  previewImage = false;
  currentIndex: any = 0;
  currentLightboxImage: any;
  controls = true;
  totalImageCount: any = 0;
  likes: any = []
  liked = 0;
  spinner = 1;
  general = inject(GeneralService);
  backend = inject(BackendService);
  router = inject(Router);
  security = inject(SecurityService);
  option: any = 0;

  ngOnInit() {
    this.list();
    this.masonry();
    this.general.setBar([1, 1, 1]);
    this.general.setTitle('MASONRY');
    this.likes = JSON.parse(localStorage.getItem('likes') ?? '[]');
    // setTimeout(() => {
    //   this.spinner = 0;
    // }, 1600);
  }

  list(): void {
    this.backend.catalog(this.page, this.option).pipe(tap(data => {
      this.catalog = data;
      this.totalImageCount = this.catalog.length;
    }),
      catchError(error => {
        this.error();
        throw error;
      })
    ).subscribe();
  }

  onScrollDown(): void {
    this.page++;
    this.backend.catalog(this.page, this.option).pipe(tap((data) => {
      this.catalog = this.catalog.concat(data);
      this.totalImageCount = this.catalog.length;

    }),
      catchError((error) => {
        this.error();
        throw error;
      })
    ).subscribe();
    this.masonry();
  }

  error() {
    sessionStorage.clear();
    this.router.navigate(['']);
    Swal.fire({
      title: "Su sesión ha finalizado.",
      icon: "error",
      timer: 5000,
    });
  }

  masonry() {
    setTimeout(() => {
      let elem = document.querySelector('.masonry');
      let msnry = new Masonry(elem, {
        itemSelector: '.masonry-item',
        gutter: 20,
        fitWidth: true
      });
      this.spinner = 0;
    }, 1000);

  }

  onPreviewImage(index: any): void {
    document.body.style.overflow = 'hidden';
    this.showMask = true;
    this.showCount = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.catalog[index].id;
  }

  onClosePreview() {
    document.body.style.overflow = 'auto';
    this.previewImage = false;
    this.showMask = false;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalImageCount;
    this.currentImage();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalImageCount) % this.totalImageCount;
    this.currentImage();
  }

  currentImage(): void {
    this.currentLightboxImage = this.catalog[this.currentIndex].id;
  }

  like(i: any) {
    this.liked = i;
    this.likes = JSON.parse(localStorage.getItem('likes') ?? '[]');
    if (!this.likes.includes(i)) {
      this.backend.like(i).subscribe();
      this.likes.push(i);
      localStorage.setItem('likes', JSON.stringify(this.likes));
    }
  }

  visit(i: any) {
    this.backend.visit(i).subscribe();
  }
}
