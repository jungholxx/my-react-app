import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { boardPosts } from "../../data/boardData";

import "ag-grid-community/styles/ag-theme-quartz.css";

import "./Grid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function Grid() {
  const navigate = useNavigate();

  const rowData = useMemo(() => {
    const savedData =
      JSON.parse(localStorage.getItem("board-views")) || {};

    return boardPosts.map((post) => ({
      ...post,
      views: savedData[post.id] ?? post.views,
    }));
  }, []);

  const columnDefs = useMemo(
    () => [
      { field: "id", headerName: "번호", width: 100 },
      { field: "title", headerName: "제목", flex: 1 },
      { field: "writer", headerName: "작성자", width: 140 },
      { field: "regDate", headerName: "작성일", width: 160 },
      { field: "views", headerName: "조회수", width: 120 },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const handleRowDoubleClick = (event) => {
    const rowData = event.data;
    navigate(`/board/${rowData.id}`);
  };

  return (
    <section className="grid-page">
      <div className="grid-header">
        <h1>AG Grid 연습</h1>
        <p>AG Grid 샘플 페이지입니다.</p>
      </div>

      <div className="grid-card ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="single"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onRowDoubleClicked={handleRowDoubleClick}
        />
      </div>
    </section>
  );
}

export default Grid;