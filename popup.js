// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {

  // create a new tab with an html page that resides in extension domain:
  chrome.tabs.create({
    'url': chrome.extension.getURL("page.html"),
    'active': false
  }, function (tab) {
    var selfTabId = tab.id;
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status == "complete" && tabId == selfTabId) {
        // send the data to the page's script:
        var tabs = chrome.extension.getViews({ type: "tab" });

        fetch('https://trello.com/1/card/5d2b6ab5ba70c623a13ca7db?fields=id,closed,isTemplate,cover&list=true&list_fields=closed&stickers=true&sticker_fields=id')
          .then(response => tabs[0].doSomething(response));

      }

    });
  });




};
