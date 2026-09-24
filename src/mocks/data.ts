export type FormItem = {
  page: string;
  label: string;
  selector: string;
  type: "text" | "checkbox";
  defaultValue: string | boolean;
};

export type ApiData = {
  sheetName: string;
  formItems: FormItem[];
}[];

export const DummyApiData: ApiData = [
  {
    sheetName: "申し込み",
    formItems: [
      {
        page: "契約者情報",
        label: "名前",
        selector: "#main .name-input",
        type: "text",
        defaultValue: "山田太郎",
      },
      {
        page: "契約者情報",
        label: "住所",
        selector: "#main .address-input",
        type: "text",
        defaultValue: "東京都",
      },
      {
        page: "重要事項確認",
        label: "確認しました",
        selector: "#main .confirm-check",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
  {
    sheetName: "解約",
    formItems: [
      {
        page: "解約者情報",
        label: "名前",
        selector: "#main .name-input",
        type: "text",
        defaultValue: "山田太郎",
      },
      {
        page: "解約者情報",
        label: "住所",
        selector: "#main .address-input",
        type: "text",
        defaultValue: "東京都",
      },
      {
        page: "重要事項確認",
        label: "確認しました",
        selector: "#main .confirm-check",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
];
