import "./App.css";
import CRUDStore from "./flux-imm/CRUDStore";
import Logo from "./components/Logo";
import React from "react";
import Whinepad from "./components/Whinepad";
import schema from "./schema";

CRUDStore.init(schema);

function App() {
  return (
    <React.Fragment>
      <div>
        <div className="app-header">
          <Logo /> Whinepadにようこそ!
        </div>
      </div>
      <Whinepad />
    </React.Fragment>
  );
}

export default App;
