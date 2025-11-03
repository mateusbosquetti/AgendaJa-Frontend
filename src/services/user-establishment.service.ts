import { api } from "@/lib/api";
import { UserEstablishmentResponseDTO } from "../types/user-establishment/user-establishment-response.type";

export class UserEstablishmentService {
  public static async getEstablishmentRelationsByUserId(
    userId: number
  ): Promise<UserEstablishmentResponseDTO[]> {
    const response = await api.get(`/user-establishments/${userId}/establishments`);
    return response.data;
  }
}
