// NOTE: デプロイしなくてもUI確認できるよう、chrome拡張特有の処理は記述しない。※propsで連携する

import { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  defaultValue?: string;
  onSubmit: (value: string) => void;
}

export const OptionsContent = ({ defaultValue, onSubmit }: Props) => {
  const [inputText, setInputText] = useState<string>();

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputText(value);
    },
    [setInputText],
  );

  const handleClick = useCallback(() => {
    if (!inputText) return;
    onSubmit(inputText);
  }, [inputText]);

  return (
    <div className="p-4">
      <div>
        <Input onChange={handleChangeInput} defaultValue={defaultValue} />
      </div>
      <div className="mt-6">
        <Button onClick={handleClick}>データ取得URLを登録</Button>
      </div>
    </div>
  );
};
