interface CategoriesParams {
  limit: any;
  page: any;
}

export interface CategoryList {
  id?: number;
  category: string;
  image: any;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export default interface CategoryListProps {
  data: CategoryList[];
  total: number;
  params: CategoriesParams;
  setParams: (any) => any;
}

export interface CategoryFormProps {
  id: number;
  category: string;
  image: string;
}
