import { api } from "@/lib/api";
import { EstablishmentRequest } from "../types/establishment/establishment-request.type";
import { EstablishmentResponse } from "../types/establishment/establishment-response.type";
import { EstablishmentAllResponse } from "../types/establishment/establishment-all-response.type";
import { EstablishmentPUTRequest } from "../types/establishment/establishment-put-request.type";

export class EstablishmentService {
  public static async createEstablishment(
    dto: EstablishmentRequest
  ): Promise<EstablishmentResponse> {
    const response = await api.post("/establishments", dto);
    return response.data;
  }

  public static async getEstablishments(
    page: number,
    size: number,
    name?: string
  ): Promise<EstablishmentAllResponse> {
    const response = await api.get("/establishments", { params: { page, size, name } });
    return response.data;
  }

  public static async getEstablishmentById(id: number): Promise<EstablishmentResponse> {
    const response = await api.get(`/establishments/${id}`);
    return response.data;
  }

  public static async updateEstablishment(
    id: number,
    dto: EstablishmentPUTRequest
  ): Promise<EstablishmentResponse> {
    const response = await api.put(`/establishments/${id}`, dto);
    return response.data;
  }

  public static async disableEstablishment(id: number): Promise<void> {
    const response = await api.delete(`/establishments/${id}`);
    return response.data;
  }
}
