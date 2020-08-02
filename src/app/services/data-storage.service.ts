import { SensorData } from "./../shared/sensordata.model";
import { SensorService } from "./sensor.service";
import { Vehicle } from "./../vehicles/vehicle.model";
import { AuthService } from "./auth.service";
import { VehicleService } from "./vehicle.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take, exhaustMap, map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { VehicleData } from "../shared/vehicledata.model";

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

  storeVehicleData(id: number, speed: number, fuel: number, capacity: number) {
    const vehicleData = new VehicleData(
      speed,
      fuel,
      capacity,
      new Date(Date.now()).toLocaleDateString("es-ES")
    );

    this.http
      .post(
        `https://autoarduino-2b80f.firebaseio.com/Cars/${id}/VehicleData.json`,
        vehicleData
      )
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

  updateSensorStatus(id: number, status: boolean) {
    this.http
      .put(
        `https://autoarduino-2b80f.firebaseio.com/Sensors/${id}/isEnable.json`,
        status
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getSensorData(): Observable<number> {
    return this.http.get<number>("http://localhost:3000/sensor");
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

  getSensor(id: number): Observable<SensorData> {
    return this.http.get<SensorData>(
      `https://autoarduino-2b80f.firebaseio.com/Sensors/${id}.json`
    );
  }

  getSaveEvery(): Observable<string> {
    return this.http.get<string>(
      `https://autoarduino-2b80f.firebaseio.com/saveEvery.json`
    );
  }

  saveEvery(number: string) {
    this.http
      .put(`https://autoarduino-2b80f.firebaseio.com/saveEvery.json`, number)
      .subscribe((response) => {
        console.log(response);
      });
  }

  saveTurnOnOrOffVehicle(onOrOff: boolean) {
    this.http
      .put(`https://autoarduino-2b80f.firebaseio.com/vehicleOn.json`, onOrOff)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getVehicleStatus(): Observable<string> {
    return this.http.get<string>(
      `https://autoarduino-2b80f.firebaseio.com/vehicleOn.json`
    );
  }

  savePanicStatus(onOrOff: boolean) {
    this.http
      .put(
        `https://autoarduino-2b80f.firebaseio.com/buttomPanicOn.json`,
        onOrOff
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPanicStatus() {
    return this.http.get<string>(
      `https://autoarduino-2b80f.firebaseio.com/buttomPanicOn.json`
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
