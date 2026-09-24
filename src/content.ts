import type { FormItemInput } from "@/components/page-content/SidePanelContent";

console.log("Content Script Loaded");

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SUBMIT") {
    const inputs = message.inputs as FormItemInput[];

    inputs.forEach((input) => {
      const targetEl = document.querySelector(
        input.selector,
      ) as HTMLInputElement;
      if (targetEl) {
        if (input.type === "text") {
          targetEl.value = input.value as string;
        }
        if (input.type === "checkbox") {
          targetEl.checked = input.value as boolean;
        }
      }
    });
  }
});
