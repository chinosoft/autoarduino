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

  fetchVehicles() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Vehicle[]>(
          "https://autoarduino-2b80f.firebaseio.com/Cars.json",
          {
            params: new HttpParams().set("auth", user.token),
          }
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

  deleteVehicle(id: number) {
    return this.http
      .delete(`https://autoarduino-2b80f.firebaseio.com/Cars/${id}.json`)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
