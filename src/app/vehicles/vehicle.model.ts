import { VehicleData } from "../shared/vehicledata.model";

export class Vehicle {
  constructor(
    public matricula: string,
    public color: string,
    public model: string,
    public data: VehicleData[]
  ) {}
}
