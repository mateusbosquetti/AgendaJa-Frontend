import { AddressResponse } from "../address/address-response.type";
import { ServiceResponse } from "../service/service-response.type";
import { UserEstablishmentResponseDTO } from "../user-establishment/user-establishment-response.type";
import { UserInEstablishmentResponseDTO } from "../user-establishment/user-in-establishment-response.type";

export type EstablishmentResponse = {
  id: number;
  name: string;
  description: string;
  cnpj: string;
  address: AddressResponse;
  services: ServiceResponse[];
  usersRelated: UserEstablishmentResponseDTO[];
};
