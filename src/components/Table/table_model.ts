export type AlignType = "left" | "right" | "center";

export interface ITableHead {
  key: string;
  header: string;
  align: AlignType;
  renderer?: any;
}

export interface ITableProps {
  className?: string;
  tableData: any[];
  totalData: number;
  tableHeader: ITableHead[];
  limit: number;
  page: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  editable?: boolean;
  onEdit?: (record: any) => void;
  onRemove?: (record: any) => void;
  loading?: boolean;
}
