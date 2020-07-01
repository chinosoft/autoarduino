import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ISensor } from './../interfaces/sensor';


import { Board, Led } from 'johnny-five'; 

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private sensor: ISensor) { }

  public board = new Board().on('ready', () => { const led = new Led(13); led.blink(500); })
 
   
  
}
