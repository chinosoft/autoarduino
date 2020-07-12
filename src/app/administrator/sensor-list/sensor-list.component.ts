import { ActivatedRoute } from "@angular/router";
import { DataStorageService } from "./../../services/data-storage.service";
import { SensorService } from "./../../services/sensor.service";
import { Subscription } from "rxjs";
import { SensorData } from "./../../shared/sensordata.model";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sensor-list",
  templateUrl: "./sensor-list.component.html",
  styleUrls: ["./sensor-list.component.css"],
})
export class SensorListComponent implements OnInit {
  sensors: SensorData[];
  subscription: Subscription;

  constructor(
    private sensorService: SensorService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.sensorService.sensorChanged.subscribe(
      (sensors: SensorData[]) => {
        this.sensors = sensors;
      }
    );
    this.sensors = this.sensorService.getSensors();
    this.dataStorageService.fetchSensors().subscribe();
  }

  onNewSensor() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onEditSaveEvery() {
    this.router.navigate(["save-every"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
