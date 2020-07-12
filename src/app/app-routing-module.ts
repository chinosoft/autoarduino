import { SaveEveryEditComponent } from "./administrator/save-every-edit/save-every-edit.component";
import { SensorDetailComponent } from "./administrator/sensor-detail/sensor-detail.component";
import { SensorEditComponent } from "./administrator/sensor-edit/sensor-edit.component";
import { SensorStartComponent } from "./administrator/sensor-start/sensor-start.component";
import { AuthComponent } from "./auth/auth.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { VehicleStartComponent } from "./vehicles/vehicle-start/vehicle-start.component";
import { VehicleDetailComponent } from "./vehicles/vehicle-detail/vehicle-detail.component";
import { VehicleEditComponent } from "./vehicles/vehicle-edit/vehicle-edit.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from "./auth/admin.guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "/vehicles", pathMatch: "full" },
  {
    path: "vehicles",
    component: VehiclesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: VehicleStartComponent },
      { path: "new", component: VehicleEditComponent },
      { path: ":id", component: VehicleDetailComponent },
      { path: ":id/edit", component: VehicleEditComponent },
    ],
  },
  {
    path: "admin-view",
    component: AdministratorComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: "", component: SensorStartComponent },
      { path: "new", component: SensorEditComponent },
      { path: "save-every", component: SaveEveryEditComponent },
      { path: ":id", component: SensorDetailComponent },
      { path: ":id/edit", component: SensorEditComponent },
    ],
  },
  { path: "auth", component: AuthComponent },
  { path: "**", redirectTo: "/vehicles" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
