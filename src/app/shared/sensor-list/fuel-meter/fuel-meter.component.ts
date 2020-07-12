import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fuel-meter",
  templateUrl: "./fuel-meter.component.html",
  styleUrls: ["./fuel-meter.component.css"],
})
export class FuelMeterComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}
}
