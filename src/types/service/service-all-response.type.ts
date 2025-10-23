import { ServiceResponse } from "./service-response.type";

export type ServiceAllResponse = {
  content: ServiceResponse[];
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
