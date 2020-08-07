import { SensorService } from "./../../../services/sensor.service";
import { ActivatedRoute, Params } from "@angular/router";
import { VehicleService } from "./../../../services/vehicle.service";
import { DataStorageService } from "./../../../services/data-storage.service";
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
} from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-speedometer",
  templateUrl: "./speedometer.component.html",
  styleUrls: ["./speedometer.component.css"],
})
export class SpeedometerComponent implements OnInit, OnDestroy, OnChanges {
  mySubscription: Subscription;
  isEnable: boolean;
  id: number;
  number: any;
  delay: any;
  sensor: any;
  intervalId;
  intervalId2;

  public canvasWidth = 230;
  public needleValue = 0;
  public centralLabel = "";
  public name = "Velocímetro";
  public bottomLabel = "0";
  public options = {
    hasNeedle: true,
    needleColor: "black",
    needleStartValue: 0,
    needleUpdateSpeed: 100,
    arcColors: ["rgb(61,204,91)", "rgb(239,214,19)", "rgb(255,84,84)"],
    arcDelimiters: [35, 75],
    rangeLabel: ["0", "220 Km/h"],
  };

  constructor(
    private dataStorageService: DataStorageService,
    private sensorService: SensorService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  saveVehicleData(id: number) {
    this.dataStorageService.getSaveEvery().subscribe((resp) => {
      this.delay = resp;
      this.delay = +this.delay * 1000;
      this.intervalId2 = setInterval(() => {
        this.dataStorageService.storeVehicleData(
          id,
          Math.round(this.sensorService.getSpeedSensor()),
          Math.round(this.sensorService.getFuelSensor()),
          Math.round(this.sensorService.getCapacitySensor())
        );
      }, +this.delay);
    });
  }

  loop() {
    const sensor = this.sensorService.getSensor(this.id);
    this.saveVehicleData(this.id);
    this.mySubscription = interval(1000).subscribe(() => {
      this.dataStorageService.getVehicleStatus().subscribe((response) => {
        this.isEnable = !!response;
      });
      this.dataStorageService.getSensorData().subscribe((response) => {
        this.number = response;
        if (this.isEnable) {
          if (this.number.speed <= +sensor.alarm && sensor.isEnable) {
            this.sensorService.limitSpeedExceeded("off");
          }
          this.sensorService.setSpeedSensor(this.number.speed);
          this.bottomLabel = String(Math.round(this.number.speed));
          this.needleValue = (Math.round(this.number.speed) * 100) / 220;
        }
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.loop();
    this.cd.detectChanges();
  }

  ngOnChanges() {
    this.sensorService.sendEmail(
      this.sensor.name,
      this.sensor.email,
      new Date(Date.now()),
      +this.sensor.alarm,
      Math.round(this.sensorService.getSpeedSensor())
    );
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    clearInterval(this.intervalId);
    clearInterval(this.intervalId2);
  }
}
