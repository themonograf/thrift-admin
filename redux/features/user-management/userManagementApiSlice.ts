import { UserList } from "@/content/UserManagement/models/user_list";
import userServices from "services/user";
import { apiSlice } from "../api/apiSlice";

const services = userServices;

export const userManagementApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query<
        { data: { data: UserList[]; total: number } },
        string
      >({
        query: (query) => `${services.getAll.url}?${query}`,
        providesTags: ["User"],
      }),
      getUser: builder.query<{ data: UserList; success: boolean }, string>({
        query: (username) => `${services.getAll.url}/${username}`,
      }),
      createUser: builder.mutation<void, UserList>({
        query: (params) => ({
          url: services.createUser.url,
          method: services.createUser.method,
          body: JSON.stringify(params),
        }),
        invalidatesTags: ["User"],
      }),
      updateUser: builder.mutation<void, UserList>({
        query: (params) => ({
          url: services.updateUser.url,
          method: services.updateUser.method,
          body: JSON.stringify(params),
        }),
        invalidatesTags: ["User"],
      }),
      deleteUser: builder.mutation<any, string>({
        query: (id) => ({
          url: `${services.deleteUser.url}/${id}`,
          method: services.deleteUser.method,
        }),
        invalidatesTags: ["User"],
      }),
    }),
  });

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userManagementApiSlice;
