import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-capacity",
  templateUrl: "./capacity.component.html",
  styleUrls: ["./capacity.component.css"],
})
export class CapacityComponent implements OnInit {
  public chartWidth = 230;
  public needleValue = 90;
  public name = "Capacidad";

  public options = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: "rgb(166,206,227)",
    rangeLabel: ["0", "25 Tons"],
    centralLabel: "2",
  };
  constructor() {}

  ngOnInit() {}
}
