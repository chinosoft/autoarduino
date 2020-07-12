import { Component, OnInit } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-speedometer",
  templateUrl: "./speedometer.component.html",
  styleUrls: ["./speedometer.component.css"],
})
export class SpeedometerComponent implements OnInit {
  mySubscription: Subscription;
  isEnable = true;

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
    rangeLabel: ["0", "180 Km/h"],
  };

  constructor() {}

  onSwitchMode() {
    this.isEnable = !this.isEnable;
  }

  isSensorEnabled() {
    return this.isEnable;
  }

  loop() {
    let numb = 0;
    this.mySubscription = interval(100).subscribe((test) => {
      if (numb !== 180) {
        numb++;
        this.bottomLabel = String(numb);
        this.needleValue = (numb * 100) / 180;
      }
    });
  }

  ngOnInit() {
    this.loop();
  }
}
