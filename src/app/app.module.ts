import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { HeaderComponent } from "./header/header.component";
import { AuthComponent } from "./auth/auth.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { GaugeChartModule } from "angular-gauge-chart";

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
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { SpeedometerComponent } from "./shared/sensor-list/speedometer/speedometer.component";
import { FuelMeterComponent } from "./shared/sensor-list/fuel-meter/fuel-meter.component";
import { CapacityComponent } from './shared/sensor-list/capacity/capacity.component';

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
    LoadingSpinnerComponent,
    SpeedometerComponent,
    FuelMeterComponent,
    CapacityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    GaugeChartModule,
  ],
  providers: [
    VehicleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
