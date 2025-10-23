import { AddressRequest } from "../address/address-request.type";

export type EstablishmentRequest = {
  name: string;
  cnpj: string;
  ownerId: number;
  address: AddressRequest;
};
