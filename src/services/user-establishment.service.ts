import { api } from "@/lib/api";
import { UserEstablishmentResponseDTO } from "../types/user-establishment/user-establishment-response.type";
import { FunctionRole } from "../enum/function-role.enum";

export class UserEstablishmentService {
  public static async getEstablishmentRelationsByUserId(
    userId: number
  ): Promise<UserEstablishmentResponseDTO[]> {
    const response = await api.get(`/user-establishments/${userId}/establishments`);
    return response.data;
  }

  public static async addUserToEstablishment(payload: {
    userId: number;
    establishmentId: number;
    role: FunctionRole;
  }): Promise<UserEstablishmentResponseDTO[]> {
    const response = await api.post(`/user-establishments/add-user`, payload);
    return response.data;
  }
}
