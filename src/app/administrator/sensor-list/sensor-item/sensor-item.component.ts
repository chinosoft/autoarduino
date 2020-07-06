import { SensorData } from "./../../../shared/sensordata.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sensor-item",
  templateUrl: "./sensor-item.component.html",
  styleUrls: ["./sensor-item.component.css"],
})
export class SensorItemComponent implements OnInit {
  @Input()
  sensor: SensorData;
  @Input()
  index: number;

  ngOnInit() {}
}
