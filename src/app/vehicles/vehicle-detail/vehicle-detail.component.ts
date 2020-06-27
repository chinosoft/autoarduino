import { VehicleService } from "./../../services/vehicle.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Vehicle } from "../vehicle.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vehicle-detail",
  templateUrl: "./vehicle-detail.component.html",
  styleUrls: ["./vehicle-detail.component.css"],
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle;
  id: number;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.vehicle = this.vehicleService.getVehicle(this.id);
    });
  }

  onDeleteVehicle() {
    this.vehicleService.deleteVehicle(this.id);
    this.router.navigate(["/vehicles"]);
  }

  onEditVehicle() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
