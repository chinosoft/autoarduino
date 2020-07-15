import { SensorService } from "./../../../services/sensor.service";
import { ActivatedRoute, Params } from "@angular/router";
import { VehicleService } from "./../../../services/vehicle.service";
import { DataStorageService } from "./../../../services/data-storage.service";
import { Component, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-speedometer",
  templateUrl: "./speedometer.component.html",
  styleUrls: ["./speedometer.component.css"],
})
export class SpeedometerComponent implements OnInit {
  mySubscription: Subscription;
  isEnable: boolean;
  id: number;

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

  loop() {
    let numb = 0;
    const sensor = this.sensorService.getSensor(this.id);
    this.mySubscription = interval(100).subscribe((test) => {
      this.dataStorageService.getVehicleStatus().subscribe((response) => {
        this.isEnable = !!response;
      });
      if (numb !== 220 && this.isEnable) {
        if (numb === +sensor.alarm) {
          this.sensorService.limitExceeded(sensor.name);
        }
        numb++;
        this.bottomLabel = String(numb);
        this.needleValue = (numb * 100) / 180;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.loop();
  }
}
