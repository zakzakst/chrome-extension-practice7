import type { SheetInfos } from "@/types/data";

const STORAGE_KEY = "chrome-input-form-sheet-infos-url";

export const saveSheetInfosUrl = async (value: string) => {
  await chrome.storage.local.set({
    [STORAGE_KEY]: value,
  });
};

export const loadSheetInfosUrl = async (): Promise<string> => {
  const result = await chrome.storage.local.get(STORAGE_KEY);

  return (result[STORAGE_KEY] as string) || "";
};

export const fetchSheetInfosFromUrl = async (
  url: string,
): Promise<SheetInfos> => {
  if (!url) {
    throw new Error("シートデータ取得URLが設定されていません。");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`データ取得に失敗しました (${response.status})`);
  }

  const data = await response.json();
  return data as SheetInfos;
};
