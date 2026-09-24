import { useState, useEffect } from "react";

import { SidePanelContent } from "@/components/page-content/SidePanelContent";
import type { FormItemInput } from "@/components/page-content/SidePanelContent";

const App = () => {
  const [sheetInfos, setSheetInfos] = useState([]);

  useEffect(() => {
    // TODO: Storageからデータ取得
    setSheetInfos([]);
  }, [setSheetInfos]);

  const handleSubmit = (inputs: FormItemInput[]) => {
    // TODO: 表示しているページのフォームに反映
    console.log(inputs);
  };

  return <SidePanelContent sheetInfos={sheetInfos} onSubmit={handleSubmit} />;
};

export default App;
