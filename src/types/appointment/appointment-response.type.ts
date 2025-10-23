import { ServiceResponse } from "../service/service-response.type";
import { UserResponse } from "../user/user-response.type";

export type AppointmentResponse = {
  id: number;
  client: UserResponse;
  professional: UserResponse;
  service: ServiceResponse;
  time: string;
  note?: string;
};
