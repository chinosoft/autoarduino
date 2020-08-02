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

  public chartWidth = 230;
  public needleValue = 90;
  public name = "Capacidad";
  public bottomLabel = "20";

  public options = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: "rgb(166,206,227)",
    rangeLabel: ["0", "25 Tons"],
    centralLabel: "2",
  };

  constructor(
    private dataStorageService: DataStorageService,
    private sensorService: SensorService,
    private route: ActivatedRoute
  ) {}

  loop() {
    const sensor = this.sensorService.getSensor(2);
    this.mySubscription = interval(1000).subscribe(() => {
      this.dataStorageService.getSensorData().subscribe((response) => {
        this.number = response;
        if (this.number.capacity >= +sensor.alarm && sensor.isEnable) {
          this.sensorService.limitExceeded("on");
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
  }
}
