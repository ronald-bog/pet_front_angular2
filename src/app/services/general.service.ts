import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  bar: number[] = [];
  title!: string;
  // order!: number;

  constructor() { }

  setBar(value: number[]): void {
    this.bar = value;
  }
  getBar(): number[] {
    return this.bar;
  }
  setTitle(value: string): void {
    this.title = value;
  }
  getTitle(): string {
    return this.title;
  }
  // setOrder(value: number): void {
  //   localStorage.setItem('order', String(value));
  // }
  // getOrder():number{
  //   return Number(localStorage.getItem('order'));
  // }
}
