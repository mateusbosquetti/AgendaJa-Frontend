import { AddressResponse } from "../address/address-response.type";

export type EstablishmentSummaryResponse = {
  id: number;
  name: string;
  cnpj: string;
  address: AddressResponse;
};

export type EstablishmentAllResponse = {
  content: EstablishmentSummaryResponse[];
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
