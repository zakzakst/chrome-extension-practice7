import { useState, useEffect } from "react";

import { SidePanelContent } from "@/components/page-content/SidePanelContent";
import type { FormItemInput } from "@/components/page-content/SidePanelContent";
import type { SheetInfos } from "@/types/data";
import { DummySheetInfos } from "@/mocks/data";

const App = () => {
  const [sheetInfos, setSheetInfos] = useState<SheetInfos>([]);

  useEffect(() => {
    // TODO: Storageからデータ取得URL取得し、それを利用してデータ取得
    setSheetInfos(DummySheetInfos);
  }, [setSheetInfos]);

  const handleSubmit = async (inputs: FormItemInput[]) => {
    // TODO: 表示しているページのフォームに反映
    console.log(inputs);
    await chrome.runtime.sendMessage({
      type: "SUBMIT",
      inputs,
    });
  };

  return <SidePanelContent sheetInfos={sheetInfos} onSubmit={handleSubmit} />;
};

export default App;
