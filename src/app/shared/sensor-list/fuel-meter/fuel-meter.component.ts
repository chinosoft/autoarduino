import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { SensorService } from "../../../services/sensor.service";
import { DataStorageService } from "../../../services/data-storage.service";

@Component({
  selector: "app-fuel-meter",
  templateUrl: "./fuel-meter.component.html",
  styleUrls: ["./fuel-meter.component.css"],
})
export class FuelMeterComponent implements OnInit, OnDestroy {
  mySubscription: Subscription;
  id: number;
  number: any;

  public canvasWidth = 230;
  public needleValue = 90;
  public centralLabel = "";
  public name = "Combustible";
  public bottomLabel = "90";
  public options = {
    hasNeedle: true,
    needleColor: "gray",
    needleUpdateSpeed: 1000,
    arcColors: ["rgb(255,84,84)", "rgb(239,214,19)", "rgb(61,204,91)"],
    arcDelimiters: [4, 35],
    rangeLabel: ["E", "F"],
    needleStartValue: 20,
  };

  constructor(
    private dataStorageService: DataStorageService,
    private sensorService: SensorService,
    private route: ActivatedRoute
  ) {}

  loop() {
    const sensor = this.sensorService.getSensor(1);
    this.mySubscription = interval(1000).subscribe(() => {
      this.dataStorageService.getSensorData().subscribe((response) => {
        this.number = response;
        if (this.number.fuel >= +sensor.alarm && sensor.isEnable) {
          this.sensorService.limitExceeded("on");
        }
        this.sensorService.setFuelSensor(this.number.fuel);
        this.bottomLabel = String(Math.round(this.number.fuel));
        this.needleValue = (Math.round(this.number.fuel) * 100) / 100;
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
