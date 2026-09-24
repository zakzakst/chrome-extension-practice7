import { useState, useEffect } from "react";

import { OptionsContent } from "@/components/page-content/OptionsContent";

const App = () => {
  const [defaultValue, setDefaultValue] = useState<string>();

  useEffect(() => {
    // TODO: Storageから取得
    setDefaultValue("test");
  }, [setDefaultValue]);

  const handleSubmit = (value: string) => {
    // TODO: Storageに登録
    console.log(value);
  };

  return <OptionsContent defaultValue={defaultValue} onSubmit={handleSubmit} />;
};

export default App;
