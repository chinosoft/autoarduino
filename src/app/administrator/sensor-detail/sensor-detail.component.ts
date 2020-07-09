import { ActivatedRoute, Router, Params } from "@angular/router";
import { DataStorageService } from "./../../services/data-storage.service";
import { SensorService } from "./../../services/sensor.service";
import { SensorData } from "./../../shared/sensordata.model";
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";

@Component({
  selector: "app-sensor-detail",
  templateUrl: "./sensor-detail.component.html",
  styleUrls: ["./sensor-detail.component.css"],
})
export class SensorDetailComponent implements OnInit {
  sensor: SensorData;
  id: number;
  velocimetroSelected = false;
  fuelSelected = false;
  capacitySelected = false;
  isEnable = true;

  constructor(
    private sensorService: SensorService,
    private dataStorageService: DataStorageService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.sensor = this.sensorService.getSensor(this.id);
      this.onSwitchMode(this.sensor);
    });
  }

  switchMode() {
    this.isEnable = !this.isEnable;
  }

  onSwitchMode(sensor: SensorData) {
    if (sensor.name === "Velocimetro") {
      this.velocimetroSelected = true;
      this.fuelSelected = false;
      this.capacitySelected = false;
    } else if (sensor.name === "Combustible") {
      this.velocimetroSelected = false;
      this.fuelSelected = true;
      this.capacitySelected = false;
    } else if (sensor.name === "Capacidad") {
      this.velocimetroSelected = false;
      this.fuelSelected = false;
      this.capacitySelected = true;
    } else {
      this.velocimetroSelected = false;
      this.fuelSelected = false;
      this.capacitySelected = false;
    }
  }

  onDeleteSensor() {
    this.sensorService.deleteSensor(this.id);
    this.dataStorageService.deleteSensor(this.id);
    this.router.navigate(["/admin-view"]);
  }

  onEditSensor() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onTurnOnOffVehicle() {
    this.switchMode();
    this.vehicleService.turnOnOffVehicle(this.isEnable);
  }
}
