/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ITableColumn<T> {
  header: string;
  // accept either a key of T or a function that returns value for this column
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor: keyof T | ((row: T) => any);
  sortable?: boolean;
  width?: string;
  headerClassName?: string;

  // cell receives resolved value (any)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell?: (props: { row: T; value: any }) => React.ReactNode;
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
  paginationData?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

export interface ITableHeaderProps<T> {
  column: any;
  sortBy: any;
  sortOrder: any;
  onSort: any;
}

// export interface ITableHeaderProps<T> {
//   column: ITableColumn<T>;
//   sortBy: keyof T | null;
//   sortOrder: "asc" | "desc";
//   onSort: (accessor: keyof T) => void;
// }
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
