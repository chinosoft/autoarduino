import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../../../services/data-storage.service";
import { SensorService } from "../../../services/sensor.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription, interval } from "rxjs";

@Component({
  selector: "app-capacity",
  templateUrl: "./capacity.component.html",
  styleUrls: ["./capacity.component.css"],
})
export class CapacityComponent implements OnInit {
  mySubscription: Subscription;
  id: number;
  number: any;
  intervalId;

  public canvasWidth = 230;
  public needleValue = 4;
  public centralLabel = "";
  public name = "Capacidad";
  public bottomLabel = "4";
  public options = {
    hasNeedle: true,
    needleColor: "gray",
    needleUpdateSpeed: 1000,
    arcColors: ["rgb(61,204,91)", "rgb(239,214,19)", "rgb(255,84,84)"],
    arcDelimiters: [45, 85],
    rangeLabel: ["0", "25 tons"],
    needleStartValue: 4,
  };

  constructor(
    private dataStorageService: DataStorageService,
    private sensorService: SensorService,
    private route: ActivatedRoute
  ) {}

  sendEmail(sensor: any) {
    this.intervalId = setInterval(() => {
      if (
        this.sensorService.getCapacitySensor() >= +sensor.alarm &&
        sensor.isEnable
      ) {
        this.sensorService.limitCapacityExceeded("on");
        this.sensorService.sendEmail(
          sensor.name,
          sensor.email,
          new Date(Date.now())
        );
      }
    }, 30000);
  }

  loop() {
    const sensor = this.sensorService.getSensor(2);
    this.sendEmail(sensor);
    this.mySubscription = interval(1000).subscribe(() => {
      this.dataStorageService.getSensorData().subscribe((response) => {
        this.number = response;
        if (this.number.capacity <= +sensor.alarm && sensor.isEnable) {
          this.sensorService.limitCapacityExceeded("off");
        }
        this.sensorService.setCapacitySensor(this.number.capacity);
        this.bottomLabel = String(Math.round(this.number.capacity));
        this.needleValue = (Math.round(this.number.capacity) * 100) / 25;
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
    clearInterval(this.intervalId);
  }
}
