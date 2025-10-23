import { api } from "@/lib/api";
import { ServiceResponse } from "../types/service/service-response.type";
import { ServiceAllResponse } from "../types/service/service-all-response.type";
import { ServiceRequest } from "../types/service/service-request.type";
import { ServicePUTRequest } from "../types/service/service-put-request.type";

export class ServiceService {
  public static async createService(dto: ServiceRequest): Promise<ServiceResponse> {
    const response = await api.post("/services", dto);
    return response.data;
  }

  public static async getServices(page: number, size: number): Promise<ServiceAllResponse> {
    const response = await api.get("/services", { params: { page, size } });
    return response.data;
  }

  public static async getServicesByEstablishment(
    establishmentId: number
  ): Promise<ServiceResponse[]> {
    const response = await api.get(`/services/establishment/${establishmentId}`);
    return response.data;
  }

  public static async getServiceById(id: number): Promise<ServiceResponse> {
    const response = await api.get(`/services/${id}`);
    return response.data;
  }

  public static async updateService(id: number, dto: ServicePUTRequest): Promise<ServiceResponse> {
    const response = await api.put(`/services/${id}`, dto);
    return response.data;
  }

  public static async disableService(id: number): Promise<void> {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  }
}
