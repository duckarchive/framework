"use client";

import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ITextFilterParams,
  themeQuartz,
  colorSchemeDark,
} from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Button } from "@heroui/button";

interface DuckTableProps<T> {
  appTheme?: string;
  columns: ColDef<T>[];
  rows: T[];
  filters?: {
    id: string;
    title: string;
    value: any;
  }[];
  activeFilterId?: string;
  setActiveFilterId: (id: string | undefined) => void;
  isLoading?: boolean;
  loadingPage?: number;
}

const DuckTable = forwardRef(
  <T,>(
    {
      appTheme = "light",
      columns,
      rows,
      isLoading,
      loadingPage,
      filters,
      activeFilterId,
      setActiveFilterId,
    }: DuckTableProps<T>,
    ref: React.Ref<AgGridReact<T> | null>
  ) => {
    const agGridRef = useRef<AgGridReact<T>>(null);

    console.log(activeFilterId, filters);

    useEffect(() => {
      if (!agGridRef.current?.api) {
        return;
      }
      if (activeFilterId) {
        agGridRef.current.api
          .setColumnFilterModel(
            "code",
            filters?.find(({ id }) => id === activeFilterId)?.value
          )
          .then(() => {
            agGridRef.current?.api.onFilterChanged();
          });
      } else {
        agGridRef.current.api.setColumnFilterModel("code", null).then(() => {
          agGridRef.current?.api.onFilterChanged();
        });
      }
    }, [activeFilterId]);

    // Optional: expose internal agGridRef to parent
    useImperativeHandle(ref, () => agGridRef.current!, []);

    const agGridTheme =
      appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;

    const handleFilterClick = (filterId: string) => () => {
      console.log("click filter", filterId);
      setActiveFilterId(activeFilterId === filterId ? undefined : filterId);
    };

    return (
      <>
        <div className="flex justify-between items-center h-10">
          <div className="flex gap-1">
            {filters?.map((filter) => (
              <Button
                key={filter.id}
                radius="full"
                color="primary"
                size="sm"
                variant={activeFilterId === filter.id ? "solid" : "bordered"}
                onPress={handleFilterClick(filter.id)}
              >
                {filter.title}
              </Button>
            ))}
            {/* {enabledFilters?.[QuickFilter.PRE_USSR_FUNDS] && (
              <Button
                radius="full"
                color="primary"
                size="sm"
                variant={
                  activeQuickFilter === QuickFilter.PRE_USSR_FUNDS
                    ? "solid"
                    : "bordered"
                }
                onPress={handleFilterClick(QuickFilter.PRE_USSR_FUNDS)}
              >
                Фонди до 1917
              </Button>
            )}
            {enabledFilters?.[QuickFilter.USSR_FUNDS] && (
              <Button
                radius="full"
                color="primary"
                size="sm"
                variant={
                  activeQuickFilter === QuickFilter.USSR_FUNDS
                    ? "solid"
                    : "bordered"
                }
                onPress={handleFilterClick(QuickFilter.USSR_FUNDS)}
              >
                Фонди після 1917
              </Button>
            )}
            {enabledFilters?.[QuickFilter.PART_FUNDS] && (
              <Button
                radius="full"
                color="primary"
                size="sm"
                variant={
                  activeQuickFilter === QuickFilter.PART_FUNDS
                    ? "solid"
                    : "bordered"
                }
                onPress={handleFilterClick(QuickFilter.PART_FUNDS)}
              >
                Фонди ПРУ
              </Button>
            )} */}
          </div>

          {/* {enabledFilters?.[QuickFilter.PART_FUNDS] && (
          <Button
            radius="full"
            color="secondary"
            size="sm"
            isDisabled
            variant={activeQuickFilter === QuickFilter.PART_FUNDS ? "solid" : "bordered"}
            onPress={handleFilterClick(QuickFilter.PART_FUNDS)}
          >
            🛠️ Доступні 🛠️
          </Button>
        )} */}
        </div>
        <div className="h-96 flex-grow">
          <AgGridReact
            ref={agGridRef}
            theme={agGridTheme}
            rowData={rows}
            suppressMovableColumns
            loading={isLoading}
            loadingOverlayComponent={() => <Loader progress={loadingPage} />}
            columnDefs={columns}
            suppressHorizontalScroll
            colResizeDefault="shift"
            localeText={AG_GRID_LOCALE_UK}
            pagination
            enableCellTextSelection
            paginationPageSize={50}
            alwaysShowVerticalScroll
            defaultColDef={{
              resizable: true,
              minWidth: 100,
              filterParams: {
                buttons: ["clear"],
              } as ITextFilterParams,
            }}
          />
        </div>
      </>
    );
  }
);

export default DuckTable;
