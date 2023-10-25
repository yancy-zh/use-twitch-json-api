import "./App.css";
import React from "react";
import BoardHeader from "./components/BoardHeader";
import ProgramTable from "./components/ProgramTable";
function App() {
  return (
    <div className="App">
      {/* header of list, including the title */}
      <BoardHeader />
      {/* a list of programs */}
      <ProgramTable />
    </div>
  );
}

export default App;
