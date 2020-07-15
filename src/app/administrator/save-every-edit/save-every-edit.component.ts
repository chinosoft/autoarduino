import { DataStorageService } from "./../../services/data-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Params } from "@angular/router";

@Component({
  selector: "app-save-every-edit",
  templateUrl: "./save-every-edit.component.html",
  styleUrls: ["./save-every-edit.component.css"],
})
export class SaveEveryEditComponent implements OnInit {
  saveEveryForm: FormGroup;
  saveNumberData: string = "";

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.initForm();
    });
  }

  onSubmit() {
    let saveNumber = this.saveEveryForm.value;
    this.dataStorageService.saveEvery(saveNumber.saveEvery);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let sensorSaveEvery = "";

    this.dataStorageService.getSaveEvery().subscribe((response) => {
      this.saveNumberData = response;
      sensorSaveEvery = response;
    });

    this.saveEveryForm = new FormGroup({
      saveEvery: new FormControl(sensorSaveEvery, Validators.required),
    });
  }
}
