import { CategoryList } from "@/content/ProductCategory/models/product_category_list";
import categoryServices from "services/category";
import { apiSlice } from "../api/apiSlice";

const services = categoryServices;

export const categoryManagementApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Category"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<
        { data: { data: CategoryList[]; total: number } },
        string
      >({
        query: (query) => `${services.getAll.url}?${query}`,
        providesTags: ["Category"],
      }),
      getCategory: builder.query<
        { data: CategoryList; success: boolean },
        string
      >({
        query: (name) => `${services.getAll.url}/${name}`,
      }),
      createCategory: builder.mutation<void, CategoryList>({
        query: (params) => ({
          url: services.createCategory.url,
          method: services.createCategory.method,
          body: JSON.stringify(params),
        }),
        invalidatesTags: ["Category"],
      }),
      updateCategory: builder.mutation<void, CategoryList>({
        query: (params) => ({
          url: services.updateCategory.url,
          method: services.updateCategory.method,
          body: JSON.stringify(params),
        }),
        invalidatesTags: ["Category"],
      }),
      deleteCategory: builder.mutation<any, string>({
        query: (id) => ({
          url: `${services.deleteCategory.url}/${id}`,
          method: services.deleteCategory.method,
        }),
        invalidatesTags: ["Category"],
      }),
    }),
  });

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryManagementApiSlice;
