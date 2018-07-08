/*
   Copyright 2018 Hisao Oshita
  
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
(() => {
  "use strict"
  function copyToClipboard(format, text) {
    const CMD_COPY = "copy";
    function oncopy(event) {
        document.removeEventListener(CMD_COPY, oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData(format, text);
    }
    document.addEventListener(CMD_COPY, oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand(CMD_COPY);
  }

  function onError(error) {
    console.error(`Error: ${error}`);
  }

  // clipping data
  function parseSalesRank(salesRank) {
    var ret =  salesRank.match(/売れ筋ランキング:?\s+(.+)\s\(/);
    return ret[1];
  }

  function formatMessage(res) {
    return `${res.product.trim()}\n${parseSalesRank(res.ranking)}`;
  }

  function messageTab(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      replacement: "Message from the extension!"
    }).then(res => {
      const msg = formatMessage(res);
      console.log(msg);
      copyToClipboard("text/plain", msg);
      browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/icon.svg"),
        "title": "You get info",
        "message": msg
      });
    }).catch(onError);
  }
  
  browser.browserAction.onClicked.addListener((tab) => {
    var querying = browser.tabs.query({
        active: true,
        currentWindow: true
    });
    querying.then(messageTab).catch(onError);
  });
})();
