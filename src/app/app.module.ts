import { HeaderComponent } from "./header/header.component";
import { AuthComponent } from "./auth/auth.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { VehicleDetailComponent } from "./vehicles/vehicle-detail/vehicle-detail.component";
import { VehicleEditComponent } from "./vehicles/vehicle-edit/vehicle-edit.component";
import { VehicleListComponent } from "./vehicles/vehicle-list/vehicle-list.component";
import { AppRoutingModule } from "./app-routing-module";
import { VehicleStartComponent } from "./vehicles/vehicle-start/vehicle-start.component";
import { VehicleItemComponent } from "./vehicles/vehicle-list/vehicle-item/vehicle-item.component";
import { AdministratorComponent } from "./administrator/administrator.component";
import { VehicleService } from "./services/vehicle.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AdministratorComponent,
    VehiclesComponent,
    VehicleDetailComponent,
    VehicleEditComponent,
    VehicleListComponent,
    VehicleStartComponent,
    VehicleItemComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [VehicleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
