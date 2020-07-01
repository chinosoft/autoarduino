export interface ISensor {

  id: number;
  sensor: {
    A0: number;
    A1: number;
    A2: number;
    P1: boolean;
    P2: boolean;
    date: Date;
  };
}