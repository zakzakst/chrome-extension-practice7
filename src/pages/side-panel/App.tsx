import { useState, useEffect } from "react";

import { SidePanelContent } from "@/components/page-content/SidePanelContent";
import type { FormItemInput } from "@/components/page-content/SidePanelContent";
import type { SheetInfos } from "@/types/data";
// import { DummySheetInfos } from "@/mocks/data";

import {
  loadSheetInfosUrl,
  fetchSheetInfosFromUrl,
} from "@/shared/storage/sheetInfosUrl";
import { toast } from "sonner";

const App = () => {
  const [sheetInfos, setSheetInfos] = useState<SheetInfos>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      try {
        const url = await loadSheetInfosUrl();
        const fetchedSheetInfos = await fetchSheetInfosFromUrl(url.trim());
        setSheetInfos(fetchedSheetInfos);
        // setSheetInfos(DummySheetInfos);
        setIsLoading(false);
      } catch {
        toast("データ取得に失敗しました");
      }
    };
    init();
  }, [setSheetInfos]);

  const handleSubmit = async (inputs: FormItemInput[]) => {
    await chrome.runtime.sendMessage({
      type: "SUBMIT",
      inputs,
    });
  };

  if (isLoading) return <div className="p-4">データ取得中...</div>;

  return <SidePanelContent sheetInfos={sheetInfos} onSubmit={handleSubmit} />;
};

export default App;
