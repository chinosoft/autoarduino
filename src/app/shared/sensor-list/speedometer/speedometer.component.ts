import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-speedometer",
  templateUrl: "./speedometer.component.html",
  styleUrls: ["./speedometer.component.css"],
})
export class SpeedometerComponent implements OnInit {
  public canvasWidth = 230;
  public needleValue = 100;
  public centralLabel = "";
  public name = "Velocímetro";
  public bottomLabel = "180";
  public options = {
    hasNeedle: true,
    needleColor: "black",
    needleStartValue: 30,
    arcColors: ["rgb(61,204,91)", "rgb(239,214,19)", "rgb(255,84,84)"],
    arcDelimiters: [35, 75],
    rangeLabel: ["0", "180 Km/h"],
  };

  constructor() {}

  ngOnInit() {}
}
