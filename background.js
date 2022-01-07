chrome.runtime.onInstalled.addListener(() => {
  var sampleTodo = [
    {
      todo: "CS2100 Assignment",
      isChecked: false,
    },
    {
      todo: "EE2026 Report 1",
      isChecked: false,
    },
    {
      todo: "Module Feedback Survey",
      isChecked: false,
    },
    {
      todo: "Flower the plants",
      isChecked: true,
    },
    {
      todo: "Buy bubble teas",
      isChecked: true,
    },
  ];

  chrome.storage.sync.set({ todolist: sampleTodo });
});

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "popup") {
    port.onDisconnect.addListener(function () {
      alert("popup has been closed");
    });
  }
});
