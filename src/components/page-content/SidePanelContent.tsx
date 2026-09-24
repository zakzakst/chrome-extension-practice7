// NOTE: デプロイしなくてもUI確認できるよう、chrome拡張特有の処理は記述しない。※propsで連携する

import { useState, useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";
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

  const handleClick = useCallback(() => {
    toast("ボタンクリック");
  }, []);

  return (
    <div className="p-4">
      <div>{JSON.stringify(formItems)}</div>
      <Select onValueChange={(value) => setSelectedSheet(value)}>
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

      <div>
        <Button onClick={handleClick}>ボタン</Button>
      </div>
    </div>
  );
};
