// NOTE: デプロイしなくてもUI確認できるよう、こちらにはchrome拡張特有の処理は記述しない。※propsにはUI確認用のダミーの処理やデータを記述し、正式な処理はpagesのほうに記述する

import { SidePanelContent } from "@/components/page-content/SidePanelContent";

const App = () => {
  return <SidePanelContent />;
};

export default App;
