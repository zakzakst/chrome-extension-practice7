// NOTE: デプロイしなくてもUI確認できるよう、chrome拡張特有の処理は記述しない。※propsで連携する

import { useState, useMemo, useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import type { FormItem, SheetInfos } from "@/types/data";

const FormItemIdPrefix = "form-item-";

export type FormItemInput = {
  type: string;
  selector: string;
  value: string | boolean;
};

interface Props {
  sheetInfos: SheetInfos;
  onSubmit: (inputs: FormItemInput[]) => void;
}

export const SidePanelContent = ({ sheetInfos, onSubmit }: Props) => {
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const formElRef = useRef<HTMLDivElement>(null);

  const sheetNames = useMemo<string[]>(() => {
    const result = sheetInfos.map((data) => data.sheetName);
    return result;
  }, [sheetInfos]);

  const pageNames = useMemo<string[]>(() => {
    const sheetData = sheetInfos.find(
      (info) => info.sheetName === selectedSheet,
    );
    if (!sheetData) return [];
    const pages = [...new Set(sheetData.formItems.map((item) => item.page))];
    return pages;
  }, [sheetInfos, selectedSheet]);

  const formItems = useMemo<FormItem[]>(() => {
    if (!selectedSheet || !selectedPage) return [];
    const sheetData = sheetInfos.find(
      (info) => info.sheetName === selectedSheet,
    );
    if (!sheetData) return [];
    const result = sheetData.formItems.filter(
      (item) => item.page === selectedPage,
    );
    return result;
  }, [sheetInfos, selectedSheet, selectedPage]);

  const handleChangeSelectedSheet = useCallback(
    (value: string) => {
      setSelectedSheet(value);
      setSelectedPage(null);
    },
    [setSelectedSheet, setSelectedPage],
  );

  const handleClick = useCallback(() => {
    const formItemInputs: FormItemInput[] = [];
    formItems.forEach((item) => {
      const id = `#${FormItemIdPrefix}${item.label}`;
      const targetEl = formElRef.current?.querySelector(id) as
        | HTMLInputElement
        | HTMLButtonElement;
      const dataSlot = targetEl.dataset.slot;
      if (dataSlot === "input") {
        formItemInputs.push({
          type: item.type,
          selector: item.selector,
          value: targetEl.value,
        });
      }
      if (dataSlot === "checkbox") {
        formItemInputs.push({
          type: item.type,
          selector: item.selector,
          value: targetEl.getAttribute("aria-checked") === "true",
        });
      }
    });
    onSubmit(formItemInputs);
  }, [formElRef, formItems]);

  return (
    <div className="p-4">
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

      <div className="mt-6 grid grid-cols-1 gap-2" ref={formElRef}>
        {formItems.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[max-content_1fr] items-center gap-4"
          >
            <div className="flex items-center gap-1">
              {item.label}
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  {item.selector}
                </HoverCardContent>
              </HoverCard>
            </div>
            <div>
              {item.type === "text" && (
                <Input
                  id={`${FormItemIdPrefix}${item.label}`}
                  defaultValue={item.defaultValue.toString()}
                />
              )}
              {item.type === "checkbox" && (
                <Checkbox
                  id={`${FormItemIdPrefix}${item.label}`}
                  defaultChecked={Boolean(item.defaultValue)}
                />
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
