import { AddressResponse } from "../address/address-response.type";
import { ServiceResponse } from "../service/service-response.type";
import { UserInEstablishmentResponseDTO } from "../user-establishment/user-in-establishment-response.type";

export type EstablishmentResponse = {
  id: number;
  name: string;
  cnpj: string;
  address: AddressResponse;
  services: ServiceResponse[];
  usersRelated: UserInEstablishmentResponseDTO[];
};
