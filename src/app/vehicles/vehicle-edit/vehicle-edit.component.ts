import { DataStorageService } from "./../../services/data-storage.service";
import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-vehicle-edit",
  templateUrl: "./vehicle-edit.component.html",
  styleUrls: ["./vehicle-edit.component.css"],
})
export class VehicleEditComponent implements OnInit {
  id: number;
  editMode = false;
  vehicleForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.vehicleService.updateVehicle(this.id, this.vehicleForm.value);
    } else {
      this.vehicleService.addVehicle(this.vehicleForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onSaveData() {
    this.dataStorageService.storeVehicle();
  }

  private initForm() {
    let vehicleModel = "";
    let vehicleColor = "";
    let vehicleMatricula = "";

    if (this.editMode) {
      const vehicle = this.vehicleService.getVehicle(this.id);
      vehicleModel = vehicle.model;
      vehicleColor = vehicle.color;
      vehicleMatricula = vehicle.matricula;
    }

    this.vehicleForm = new FormGroup({
      model: new FormControl(vehicleModel, Validators.required),
      color: new FormControl(vehicleColor, Validators.required),
      matricula: new FormControl(vehicleMatricula, Validators.required),
    });
  }
}
