export interface ITableColumn<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  width?: string;
  headerClassName?: string;
}

export interface ITableAction<T> {
  label: string;
  onClick: (row: T) => void;
  className?: string;
}

export interface ITableProps<T> {
  data: T[];
  columns: ITableColumn<T>[];
  pageSize?: number;
  actions?: ITableAction<T>[]; 

}

export interface ITableHeaderProps<T> {
  column: ITableColumn<T>;
  sortBy: keyof T | null;
  sortOrder: "asc" | "desc";
  onSort: (accessor: keyof T) => void;
}
// interface ITableRowProps<T extends { id: string }> {

export interface ITableRowProps<T extends { id: string | number }> {
  row: T;
  columns: ITableColumn<T>[];
  actions?: ITableAction<T>[];
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
