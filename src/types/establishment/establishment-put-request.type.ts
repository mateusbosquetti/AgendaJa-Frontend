import { AddressRequest } from "../address/address-request.type";

export type EstablishmentPUTRequest = {
  name: string;
  cnpj: string;
  address: AddressRequest;
};
