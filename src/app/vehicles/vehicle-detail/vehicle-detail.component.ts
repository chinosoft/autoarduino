import { SensorData } from "./../../shared/sensordata.model";
import { Subscription } from "rxjs";
import { DataStorageService } from "./../../services/data-storage.service";
import { VehicleService } from "./../../services/vehicle.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Vehicle } from "../vehicle.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vehicle-detail",
  templateUrl: "./vehicle-detail.component.html",
  styleUrls: ["./vehicle-detail.component.css"],
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle;
  id: number;
  subscription: Subscription;
  sensors: SensorData[];
  isEnable = true;
  panicStatus: boolean;
  delay: any;
  isVelocimetroEnable = false;
  isCapacidadEnable = false;
  isCombustibleEnable = false;

  constructor(
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.vehicle = this.vehicleService.getVehicle(this.id);
    });
    this.getPanicStatus();
    this.dataStorageService.getVehicleStatus().subscribe((response) => {
      this.isEnable = !!response;
    });
    this.dataStorageService.fetchSensors().subscribe((response) => {
      this.sensors = response;
      this.updateStatus();
    });
  }

  switchMode() {
    this.isEnable = !this.isEnable;
  }

  getPanicStatus() {
    this.dataStorageService.getPanicStatus().subscribe((response) => {
      this.panicStatus = !!response;
    });
  }

  onTurnOnOffVehicle() {
    this.switchMode();
    this.dataStorageService.saveTurnOnOrOffVehicle(this.isEnable);
  }

  updateStatus() {
    for (let i = 0; i < this.sensors.length; i++) {
      if (this.sensors[i].name === "Velocimetro") {
        this.isVelocimetroEnable = this.sensors[i].isEnable;
      } else if (this.sensors[i].name === "Combustible") {
        this.isCombustibleEnable = this.sensors[i].isEnable;
      } else if (this.sensors[i].name === "Capacidad") {
        this.isCapacidadEnable = this.sensors[i].isEnable;
      }
    }
  }

  onDeleteVehicle() {
    this.vehicleService.deleteVehicle(this.id);
    this.dataStorageService.deleteVehicle(this.id);
    this.router.navigate(["/vehicles"]);
  }

  onEditVehicle() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
