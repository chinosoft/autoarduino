import { SensorService } from "./../../../services/sensor.service";
import { ActivatedRoute, Params } from "@angular/router";
import { VehicleService } from "./../../../services/vehicle.service";
import { DataStorageService } from "./../../../services/data-storage.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-speedometer",
  templateUrl: "./speedometer.component.html",
  styleUrls: ["./speedometer.component.css"],
})
export class SpeedometerComponent implements OnInit, OnDestroy {
  mySubscription: Subscription;
  isEnable: boolean;
  id: number;
  number: any;
  delay: any;

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
    private route: ActivatedRoute
  ) {}

  saveVehicleData(id: number) {
    this.dataStorageService.getSaveEvery().subscribe((resp) => {
      this.delay = resp;
      this.delay = +this.delay * 1000;
      setInterval(() => {
        this.dataStorageService.storeVehicleData(
          id,
          this.sensorService.getSpeedSensor(),
          this.sensorService.getFuelSensor(),
          this.sensorService.getCapacitySensor()
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
      this.dataStorageService.getSpeedSensorData().subscribe((response) => {
        this.number = response;
        if (this.number.data !== 220 && this.isEnable) {
          if (this.number.data >= +sensor.alarm && sensor.isEnable) {
            this.sensorService.limitExceeded(sensor.name);
          }
          this.sensorService.setSpeedSensor(this.number.data);
          this.bottomLabel = String(this.number.data);
          this.needleValue = (this.number.data * 100) / 180;
        }
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.loop();
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}
