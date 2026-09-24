// NOTE: デプロイしなくてもUI確認できるよう、こちらにはchrome拡張特有の処理は記述しない。※propsにはUI確認用のダミーの処理やデータを記述し、正式な処理はpagesのほうに記述する

import { SidePanelContent } from "@/components/page-content/SidePanelContent";
import type { FormItemInput } from "@/components/page-content/SidePanelContent";

const App = () => {
  const handleSubmit = (inputs: FormItemInput[]) => {
    console.log(inputs);
  };

  return <SidePanelContent onSubmit={handleSubmit} />;
};

export default App;
