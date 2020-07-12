import { DataStorageService } from "./../../services/data-storage.service";
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
  panicButtomOn: boolean;

  constructor(
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.vehicleService.vehiclesChanged.subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      }
    );
    this.dataStorageService.getPanicStatus().subscribe((response) => {
      this.panicButtomOn = !!response;
    });
    this.vehicles = this.vehicleService.getVehicles();
    this.dataStorageService.fetchVehicles().subscribe();
  }

  onNewCar() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  switchMode() {
    this.panicButtomOn = !this.panicButtomOn;
    if (this.panicButtomOn === true) {
      this.dataStorageService.saveTurnOnOrOffVehicle(false);
    }
  }

  onPanic() {
    this.switchMode();
    this.dataStorageService.savePanicStatus(this.panicButtomOn);
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
