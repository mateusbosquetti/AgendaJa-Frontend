import { AddressResponse } from "../address/address-response.type";

export type EstablishmentAllResponse = {
  content: {
    id: number;
    name: string;
    cnpj: string;
    address: AddressResponse;
  }[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  last: boolean;
  first: boolean;
  empty: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
};
