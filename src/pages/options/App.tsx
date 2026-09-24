import { useState, useEffect } from "react";

import { OptionsContent } from "@/components/page-content/OptionsContent";

import {
  saveSheetInfosUrl,
  loadSheetInfosUrl,
} from "@/shared/storage/sheetInfosUrl";

const App = () => {
  const [defaultValue, setDefaultValue] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const url = await loadSheetInfosUrl();
      setDefaultValue(url);
    };
    init();
  }, [setDefaultValue]);

  const handleSubmit = (value: string) => {
    saveSheetInfosUrl(value);
  };

  return <OptionsContent defaultValue={defaultValue} onSubmit={handleSubmit} />;
};

export default App;
