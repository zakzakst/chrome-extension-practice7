// NOTE: デプロイしなくてもUI確認できるよう、chrome拡張特有の処理は記述しない。※propsで連携する

import { useState, useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { DummyApiData } from "@/mocks/data";
import type { FormItem } from "@/mocks/data";

export const SidePanelContent = () => {
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const sheetNames = useMemo<string[]>(() => {
    const result = DummyApiData.map((data) => data.sheetName);
    return result;
  }, []);

  const pageNames = useMemo<string[]>(() => {
    const sheetData = DummyApiData.find(
      (data) => data.sheetName === selectedSheet,
    );
    if (!sheetData) return [];
    const pages = [...new Set(sheetData.formItems.map((item) => item.page))];
    return pages;
  }, [selectedSheet]);

  const formItems = useMemo<FormItem[]>(() => {
    if (!selectedSheet || !selectedPage) return [];
    const sheetData = DummyApiData.find(
      (data) => data.sheetName === selectedSheet,
    );
    if (!sheetData) return [];
    const result = sheetData.formItems.filter(
      (item) => item.page === selectedPage,
    );
    return result;
  }, [selectedSheet, selectedPage]);

  const handleChangeSelectedSheet = useCallback(
    (value: string) => {
      setSelectedSheet(value);
      setSelectedPage(null);
    },
    [setSelectedSheet, setSelectedPage],
  );

  const handleClick = useCallback(() => {
    // TODO: 現在の入力値を取得して実行するデータを作成（セレクタと値の配列）
    toast("ボタンクリック");
  }, []);

  return (
    <div className="p-4">
      {/* <div>{JSON.stringify(formItems)}</div> */}
      <div className="grid grid-cols-1 gap-2">
        <Select onValueChange={handleChangeSelectedSheet}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="シート名" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sheetNames.map((sheetName) => (
                <SelectItem key={sheetName} value={sheetName}>
                  {sheetName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedPage(value)}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="ページ名" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageNames.map((pageName) => (
                <SelectItem key={pageName} value={pageName}>
                  {pageName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2">
        {formItems.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[max-content_1fr] items-center gap-2"
          >
            {/* TODO: 横着してtitle属性につけているが、インフォメーションアイコンをクリックするとポップオーバーとかにしたい */}
            <div title={item.selector}>{item.label}</div>
            <div>
              {item.type === "text" && (
                <Input defaultValue={item.defaultValue.toString()} />
              )}
              {item.type === "checkbox" && (
                <Checkbox defaultChecked={Boolean(item.defaultValue)} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={handleClick}>現在表示しているフォームに反映</Button>
      </div>
    </div>
  );
};
