import "./App.css";
import React from "react";
import { Table } from "antd";
import BoardHeader from "./components/BoardHeader";
function App() {
  const columns = [
    { key: "name", title: "name", dataIndex: "name" },
    {
      key: "link",
      title: "link",
      dataIndex: "link",
    },
    {
      key: "logo",
      title: "logo",
      dataIndex: "logo",
    },
    {
      key: "status",
      title: "status",
      dataIndex: "status",
    },
  ];

  return (
    <div className="App">
      {/* header of list, including the title */}
      <BoardHeader />
      {/* a list of programs */}
      <Table></Table>
    </div>
  );
}

export default App;
