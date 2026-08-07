import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ColDef } from "ag-grid-community";
import DuckTable from "../components/duck-table";

interface DuckCase {
  code: string;
  title: string;
  year: number;
  archive: string;
}

const rows: DuckCase[] = [
  { code: "Р-1234", title: "Справа про реєстрацію товариства", year: 1923, archive: "ЦДІАК" },
  { code: "Ф-5821", title: "Метричні книги парафії", year: 1901, archive: "ДАКО" },
  { code: "Н-0098", title: "Наказ про призначення", year: 1937, archive: "ЦДАВО" },
  { code: "П-4471", title: "Протокол засідання ради", year: 1919, archive: "ДАЛО" },
  { code: "К-3302", title: "Клопотання про поновлення", year: 1945, archive: "ЦДІАК" },
];

const columns: ColDef<DuckCase>[] = [
  { field: "code", headerName: "Код", width: 130, filter: "agTextColumnFilter" },
  { field: "title", headerName: "Назва справи", flex: 1 },
  { field: "year", headerName: "Рік", width: 100 },
  { field: "archive", headerName: "Архів", width: 130 },
];

// DuckTable always applies `filters[].value` as the filter model for the "code"
// column (see components/duck-table.tsx), so these must be ag-grid text filter
// models, not filters on an arbitrary field.
const filters = [
  { id: "r-codes", title: "Р-справи", value: { filterType: "text", type: "startsWith", filter: "Р" } },
  { id: "k-codes", title: "К-справи", value: { filterType: "text", type: "startsWith", filter: "К" } },
];

const meta = {
  title: "Components/DuckTable",
  component: DuckTable,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    setActiveFilterId: { table: { disable: true } },
  },
} satisfies Meta<typeof DuckTable<DuckCase>>;

export default meta;
type Story = StoryObj<typeof meta>;

const DuckTableDemo = (args: Partial<React.ComponentProps<typeof DuckTable<DuckCase>>>) => {
  const [activeFilterId, setActiveFilterId] = useState<string | undefined>(args.activeFilterId);
  return (
    <div className="flex flex-col p-6 h-full bg-blue-100 dark:bg-blue-900">
      <DuckTable<DuckCase>
        id="storybook-duck-table"
        columns={columns}
        rows={rows}
        persistColWidth={false}
        {...args}
        activeFilterId={activeFilterId}
        setActiveFilterId={setActiveFilterId}
      />
    </div>
  );
};

// Every story reads `appTheme` from the "Theme" toolbar control instead of a
// hardcoded arg, so the ag-grid theme follows the same light/dark switch as
// the rest of the page.
export const Default: Story = {
  render: (args, { globals }) => <DuckTableDemo {...args} appTheme={globals.theme} />,
  args: {
    columns,
    rows,
    setActiveFilterId: () => {},
  },
};

export const WithFilters: Story = {
  render: (args, { globals }) => <DuckTableDemo {...args} appTheme={globals.theme} />,
  args: {
    columns,
    rows,
    filters,
    setActiveFilterId: () => {},
  },
};

export const Loading: Story = {
  render: (args, { globals }) => <DuckTableDemo {...args} appTheme={globals.theme} />,
  args: {
    columns,
    rows: [],
    isLoading: true,
    loadingPage: 2,
    setActiveFilterId: () => {},
  },
};
