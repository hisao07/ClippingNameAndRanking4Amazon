(() => {
  function messageTab(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      replacement: "Message from the extension!"
    });
  }
  
  browser.browserAction.onClicked.addListener((tab) => {
    var querying = browser.tabs.query({
        active: true,
        currentWindow: true
    });
    querying.then(messageTab);
  });
})();
