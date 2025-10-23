export type AppointmentPUTRequest = {
  professionalId: number;
  serviceId: number;
  time: string;
  note?: string;
};
