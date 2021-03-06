import { AuthComponent } from "./auth/auth.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { VehicleStartComponent } from "./vehicles/vehicle-start/vehicle-start.component";
import { VehicleDetailComponent } from "./vehicles/vehicle-detail/vehicle-detail.component";
import { VehicleEditComponent } from "./vehicles/vehicle-edit/vehicle-edit.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/vehicles", pathMatch: "full" },
  {
    path: "vehicles",
    component: VehiclesComponent,
    children: [
      { path: "", component: VehicleStartComponent },
      { path: "new", component: VehicleEditComponent },
      { path: ":id", component: VehicleDetailComponent },
      { path: ":id/edit", component: VehicleEditComponent },
    ],
  },
  { path: "admin-view", component: AdministratorComponent },
  { path: "auth", component: AuthComponent },
  { path: "**", redirectTo: "/vehicles" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
