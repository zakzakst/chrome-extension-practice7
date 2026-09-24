// サイドパネル表示有効化
chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch(console.error);

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type !== "SUBMIT") return;

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) return;

  chrome.tabs.sendMessage(tab.id, {
    type: "SUBMIT",
    inputs: message.inputs,
  });
});
