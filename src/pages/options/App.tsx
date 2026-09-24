import { useState, useEffect } from "react";

import { OptionsContent } from "@/components/page-content/OptionsContent";

import {
  saveSheetInfosUrl,
  loadSheetInfosUrl,
} from "@/shared/storage/sheetInfosUrl";
import { toast } from "sonner";

const App = () => {
  const [defaultValue, setDefaultValue] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const url = await loadSheetInfosUrl();
      setDefaultValue(url);
    };
    init();
  }, [setDefaultValue]);

  const handleSubmit = async (value: string) => {
    try {
      await saveSheetInfosUrl(value);
      toast("URLを登録しました");
    } catch {
      toast("URLの登録に失敗しました");
    }
  };

  return <OptionsContent defaultValue={defaultValue} onSubmit={handleSubmit} />;
};

export default App;
