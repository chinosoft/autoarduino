import { SensorData } from "./../shared/sensordata.model";
import { SensorService } from "./sensor.service";
import { Vehicle } from "./../vehicles/vehicle.model";
import { AuthService } from "./auth.service";
import { VehicleService } from "./vehicle.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { take, exhaustMap, map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService,
    private sensorService: SensorService,
    private authService: AuthService
  ) {}

  storeVehicle() {
    const vehicles = this.vehicleService.getVehicles();

    this.http
      .put(`https://autoarduino-2b80f.firebaseio.com/Cars.json`, vehicles)
      .subscribe((response) => {
        console.log(response);
      });
  }

  storeSensor() {
    const sensors = this.sensorService.getSensors();
    this.http
      .put(`https://autoarduino-2b80f.firebaseio.com/Sensors.json`, sensors)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchVehicles() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Vehicle[]>(
          "https://autoarduino-2b80f.firebaseio.com/Cars.json"
        );
      }),
      map((vehicles) => {
        return vehicles.map((vehicle) => {
          return {
            ...vehicle,
          };
        });
      }),
      tap((vehicles) => {
        this.vehicleService.setVehicles(vehicles);
      })
    );
  }

  fetchSensors() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<SensorData[]>(
          "https://autoarduino-2b80f.firebaseio.com/Sensors.json"
        );
      }),
      map((sensors) => {
        return sensors.map((sensor) => {
          return {
            ...sensor,
          };
        });
      }),
      tap((sensors) => {
        this.sensorService.setSensors(sensors);
      })
    );
  }

  deleteVehicle(id: number) {
    return this.http
      .delete(`https://autoarduino-2b80f.firebaseio.com/Cars/${id}.json`)
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteSensor(id: number) {
    return this.http
      .delete(`https://autoarduino-2b80f.firebaseio.com/Sensors/${id}.json`)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
