// NOTE: デプロイしなくてもUI確認できるよう、こちらにはchrome拡張特有の処理は記述しない。※propsにはUI確認用のダミーの処理やデータを記述し、正式な処理はpagesのほうに記述する

import { useState, useEffect } from "react";

import { OptionsContent } from "@/components/page-content/OptionsContent";

const App = () => {
  const [defaultValue, setDefaultValue] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setDefaultValue("test");
    }, 2000);
  }, [setDefaultValue]);

  const handleSubmit = (value: string) => {
    // TODO: Storageに登録
    console.log(value);
  };

  return <OptionsContent defaultValue={defaultValue} onSubmit={handleSubmit} />;
};

export default App;
