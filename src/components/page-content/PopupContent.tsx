// NOTE: デプロイしなくてもUI確認できるよう、chrome拡張特有の処理は記述しない。※propsで連携する

import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const PopupContent = () => {
  const handleClick = useCallback(() => {
    toast("ボタンクリック");
  }, []);

  return (
    <div className="p-4">
      <h1>ポップアップ</h1>
      <div>
        <Button onClick={handleClick}>ボタン</Button>
      </div>
    </div>
  );
};
