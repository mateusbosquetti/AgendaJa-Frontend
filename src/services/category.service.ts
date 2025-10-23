import { api } from "@/lib/api";
import { CategoryRequest } from "../types/category/category-request.type";
import { CategoryResponse } from "../types/category/category-response.type";

export class CategoryService {
  public static async createCategory(dto: CategoryRequest): Promise<CategoryResponse> {
    const response = await api.post("/categories", dto);
    return response.data;
  }

  public static async getCategorys(): Promise<CategoryResponse[]> {
    const response = await api.get("/categories");
    return response.data;
  }

  public static async getCategoryById(id: number): Promise<CategoryResponse> {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }

  public static async updateCategory(id: number, dto: CategoryRequest): Promise<CategoryResponse> {
    const response = await api.put(`/categories/${id}`, dto);
    return response.data;
  }

  public static async disableCategory(id: number): Promise<void> {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
}
