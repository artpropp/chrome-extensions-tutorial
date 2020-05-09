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
  // let color = element.target.value;
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
  // });

  fetch('https://trello.com/1/card/5d2b6ab5ba70c623a13ca7db?fields=id,closed,isTemplate,cover&list=true&list_fields=closed&stickers=true&sticker_fields=id')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(JSON.stringify(data));
      chrome.tabs.create({ 'url': chrome.extension.getURL('webapp.html') }, function (tab) {
        // Tab opened.
        console.log('test');
        alert('checkpoint');
        chrome.tabs.executeScript(
          tab,
          {
            code: 'alert("test");document.getElementById("msg").innerHTML = "' + JSON.stringify(data) +
              '";' + 'console.log("' + JSON.stringify(data) + '"' +
              ';'
          }
        );
      });
    });



};
