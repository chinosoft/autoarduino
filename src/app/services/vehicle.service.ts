import { Subject } from "rxjs";
import { Vehicle } from "../vehicles/vehicle.model";
import { Injectable } from "@angular/core";
import { VehicleData } from "../shared/vehicledata.model";

@Injectable()
export class VehicleService {
  vehiclesChanged = new Subject<Vehicle[]>();

  constructor() {}

  private vehicles: Vehicle[] = [];

  setVehicles(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
    this.vehiclesChanged.next(this.vehicles.slice());
  }

  getVehicles() {
    return this.vehicles.slice();
  }

  getVehicle(index: number) {
    return this.vehicles[index];
  }

  getVehicleData(index: number) {
    return this.vehicles[index].data;
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    this.vehiclesChanged.next(this.vehicles.slice());
  }

  updateVehicle(index: number, newCar: Vehicle) {
    this.vehicles[index] = newCar;
    this.vehiclesChanged.next(this.vehicles.slice());
  }

  deleteVehicle(index: number) {
    this.vehicles.splice(index, 1);
    this.vehiclesChanged.next(this.vehicles.slice());
  }

  turnOnOffVehicle(onOrOff: boolean) {
    if (onOrOff === true) {
      console.log("Auto prendido.");
    } else {
      console.log("Auto Apagado.");
    }
  }
}
