import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { boardPosts } from "../../data/boardData";

import "ag-grid-community/styles/ag-theme-quartz.css";
import "./Grid.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function Grid() {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState(() => {
    const savedData =
      JSON.parse(localStorage.getItem("board-views")) || {};

    return boardPosts.map((post) => ({
      ...post,
      views: savedData[post.id] ?? post.views,
    }));
  });

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
    navigate(`/board/${event.data.id}`);
  };

  const handleExcelDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("게시글 목록");

    worksheet.columns = [
      { header: "번호", key: "id", width: 10 },
      { header: "제목", key: "title", width: 40 },
      { header: "작성자", key: "writer", width: 15 },
      { header: "작성일", key: "regDate", width: 18 },
      { header: "조회수", key: "views", width: 12 },
    ];

    rowData.forEach((row) => {
      worksheet.addRow({
        id: row.id,
        title: row.title,
        writer: row.writer,
        regDate: row.regDate,
        views: row.views,
      });
    });

    const headerRow = worksheet.getRow(1);

    headerRow.font = {
      bold: true,
    };

    headerRow.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "게시글_목록.xlsx");
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();

    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);

    const uploadedData = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      uploadedData.push({
        id: row.getCell(1).value,
        title: row.getCell(2).value,
        writer: row.getCell(3).value,
        regDate: row.getCell(4).value,
        views: row.getCell(5).value,
      });
    });

    setRowData(uploadedData);

    event.target.value = "";
  };

  const handleClearGrid = () => {
    const isConfirm = window.confirm(
      "그리드 데이터를 모두 삭제하시겠습니까?"
    );

    if (!isConfirm) {
      return;
    }

    setRowData([]);
  };

  return (
    <section className="grid-page">
      <div className="grid-header">
        <h1>AG Grid 연습</h1>
        <p>AG Grid 샘플 페이지입니다.</p>
      </div>

      <div className="grid-toolbar">
        <label className="excel-upload-btn">
          엑셀 업로드
          <input
            type="file"
            accept=".xlsx"
            onChange={handleExcelUpload}
            hidden
          />
        </label>

        <button
          type="button"
          className="excel-download-btn"
          onClick={handleExcelDownload}
        >
          엑셀 다운로드
        </button>

        <button
          type="button"
          className="grid-clear-btn"
          onClick={handleClearGrid}
        >
          데이터 비우기
        </button>
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