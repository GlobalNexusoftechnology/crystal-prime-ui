export interface IClientListProps {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
  email: string;
  contact_number: string;
  address: string;
  website: string;
  company_name: string;
  contact_person: string;
  lead_id: null;
}

export const clientListColumn = [
  {
    header: "CUSTOMER NAME",
    accessor: "name",
    headerClass: "min-w-[10rem] ",
  },
  {
    header: "COMPANY NAME",
    accessor: "company_name",
    headerClass: "min-w-[10rem] ",
  },
  {
    header: "CONTACT PERSON",
    accessor: "contact_person",
    headerClass: "min-w-[12rem] ",
  },
  {
    header: "PHONE NUMBER",
    accessor: "contact_number",
    headerClass: "min-w-[10rem] ",
  },
  {
    header: "CONTACT EMAIL",
    accessor: "email",
    headerClass: "min-w-[15rem] ",
  },
  {
    header: "GST NUMBER",
    accessor: "gst_number",
    headerClass: "min-w-[12rem] ",
  },
  {
    header: "WEBSITE URL",
    accessor: "website",
    headerClass: "min-w-[10rem] ",
  },
  {
    header: "ADDRESS",
    accessor: "address",
    headerClass: "min-w-[10rem] ",
  },
  {
    header: "CREATED AT",
    accessor: "created_at",
    headerClass: "min-w-[10rem] ",
  },
];

export const clientContactDetailsColumns = [
  { header: "CONTACT NAME", headerClass: "min-w-[10rem] " },
  { header: "DESIGNATION", headerClass: "min-w-[10rem] " },
  { header: "CONTACT NUMBER", headerClass: "min-w-[10rem] " },
  { header: "OTHER CONTACT", headerClass: "min-w-[10rem] " },
  { header: "EMAIL", headerClass: "min-w-[15rem] " },
];
