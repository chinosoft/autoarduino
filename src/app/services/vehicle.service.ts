import { Subject } from "rxjs";
import { Vehicle } from "../vehicles/vehicle.model";
import { Injectable } from "@angular/core";
import { VehicleData } from "../shared/vehicledata.model";

@Injectable()
export class VehicleService {
  vehiclesChanged = new Subject<Vehicle[]>();

  constructor() {}

  private vehicles: Vehicle[] = [
    new Vehicle("ABC132", "Rojo", "Toyota", [
      new VehicleData(
        320,
        15,
        100,
        new Date("1994/12/31").toLocaleDateString("es-ES")
      ),
      new VehicleData(
        150,
        90,
        400,
        new Date(Date.now()).toLocaleDateString("es-ES")
      ),
      new VehicleData(
        60,
        20,
        200,
        new Date("2028/08/25").toLocaleDateString("es-ES")
      ),
    ]),
  ];

  getVehicles() {
    return this.vehicles.slice();
  }

  getVehicle(index: number) {
    return this.vehicles[index];
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
}
