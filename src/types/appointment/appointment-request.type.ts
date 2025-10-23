export type AppointmentRequest = {
  clientId: number;
  professionalId: number;
  serviceId: number;
  time: string;
  note?: string;
};
