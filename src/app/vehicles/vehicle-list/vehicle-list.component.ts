import { VehicleService } from "./../../services/vehicle.service";
import { Vehicle } from "../vehicle.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"],
})
export class VehicleListComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[];
  subscription: Subscription;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.vehicleService.vehiclesChanged.subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      }
    );
    this.vehicles = this.vehicleService.getVehicles();
  }

  onNewCar() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
