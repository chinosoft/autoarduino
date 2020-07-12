import { Subject } from "rxjs";
import { SensorData } from "./../shared/sensordata.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SensorService {
  sensorChanged = new Subject<SensorData[]>();

  constructor() {}

  private sensors: SensorData[] = [];

  setSensors(sensors: SensorData[]) {
    this.sensors = sensors;
    this.sensorChanged.next(this.sensors.slice());
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
}
