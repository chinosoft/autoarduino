import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SensorService } from "./../../services/sensor.service";
import { DataStorageService } from "./../../services/data-storage.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sensor-edit",
  templateUrl: "./sensor-edit.component.html",
  styleUrls: ["./sensor-edit.component.css"],
})
export class SensorEditComponent implements OnInit {
  id: number;
  editMode = false;
  sensorForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private sensorService: SensorService,
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
      this.sensorService.updateSensor(this.id, this.sensorForm.value);
    } else {
      this.sensorService.addSensor(this.sensorForm.value);
    }
    this.dataStorageService.storeSensor();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let sensorName = "";
    let sensorAlarm = "";
    let sensorEmail = "";

    if (this.editMode) {
      const sensor = this.sensorService.getSensor(this.id);
      sensorName = sensor.name;
      sensorAlarm = sensor.alarm;
      sensorEmail = sensor.email;
    }

    this.sensorForm = new FormGroup({
      name: new FormControl(sensorName, Validators.required),
      alarm: new FormControl(sensorAlarm, Validators.required),
      isEnable: new FormControl(true),
      email: new FormControl(sensorEmail, Validators.required),
    });
  }
}
