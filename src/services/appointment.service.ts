import { api } from "@/lib/api";
import { AppointmentRequest } from "../types/appointment/appointment-request.type";
import { AppointmentResponse } from "../types/appointment/appointment-response.type";
import { AppointmentPUTRequest } from "../types/appointment/appointment-put-request.type";

export class AppointmentService {
  public static async createAppointment(dto: AppointmentRequest): Promise<AppointmentResponse> {
    const response = await api.post("/appointments", dto);
    return response.data;
  }

  public static async getAppointmentById(id: number): Promise<AppointmentResponse> {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  }

  public static async getAppointmentsByEstablishment(
    establishmentId: number
  ): Promise<AppointmentResponse[]> {
    const response = await api.get(`/appointments/establishment/${establishmentId}`);
    return response.data;
  }

  public static async getAppointmentsByClient(clientId: number): Promise<AppointmentResponse[]> {
    const response = await api.get(`/appointments/client/${clientId}`);
    return response.data;
  }

  public static async getAppointmentsByProfessional(
    professionalId: number
  ): Promise<AppointmentResponse[]> {
    const response = await api.get(`/appointments/professional/${professionalId}`);
    return response.data;
  }

  public static async updateAppointment(
    id: number,
    dto: AppointmentPUTRequest
  ): Promise<AppointmentResponse> {
    const response = await api.put(`/appointments/${id}`, dto);
    return response.data;
  }

  public static async disableAppointment(id: number): Promise<void> {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }
}
