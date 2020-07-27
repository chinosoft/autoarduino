import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { SensorData } from "./../shared/sensordata.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SensorService {
  sensorChanged = new Subject<SensorData[]>();
  speedSensor: number;
  fuelSensor: number;
  capacitySensor: number;

  constructor(private http: HttpClient) {}

  private sensors: SensorData[] = [];

  setSensors(sensors: SensorData[]) {
    this.sensors = sensors;
    this.sensorChanged.next(this.sensors.slice());
  }

  setSpeedSensor(speed: number) {
    this.speedSensor = speed;
  }

  setFuelSensor(fuel: number) {
    this.fuelSensor = fuel;
  }

  setCapacitySensor(capacity: number) {
    this.capacitySensor = capacity;
  }

  getSpeedSensor() {
    return this.speedSensor;
  }

  getFuelSensor() {
    return this.fuelSensor;
  }

  getCapacitySensor() {
    return this.capacitySensor;
  }

  getSensors() {
    return this.sensors.slice();
  }

  getSensor(index: number) {
    return this.sensors[index];
  }

  addSensor(sensors: SensorData) {
    this.sensors.push(sensors);
    this.sensorChanged.next(this.sensors.slice());
  }

  updateSensor(index: number, newSensor: SensorData) {
    this.sensors[index] = newSensor;
    this.sensorChanged.next(this.sensors.slice());
  }

  deleteSensor(index: number) {
    this.sensors.splice(index, 1);
    this.sensorChanged.next(this.sensors.slice());
  }

  getStatus(index: number) {
    const sensor = this.getSensor(index);
    return sensor.isEnable;
  }

  limitExceeded(message: string) {
    this.http
      .get(`http://localhost:3000/led/${message}`, { responseType: "text" })
      .subscribe((resp) => {});
  }
}
