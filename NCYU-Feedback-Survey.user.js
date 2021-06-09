// ==UserScript==
// @name         NCYU-Feedback-Survey
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  End boring survey quickly
// @author       yanzugu
// @match        https://web085004.adm.ncyu.edu.tw/Survey/Srv_StuSel.aspx
// @updateURL    https://github.com/yanzugu/Tempermonkey/blob/main/NCYU-Feedback-Survey.user.js
// @downloadURL  https://github.com/yanzugu/Tempermonkey/blob/main/NCYU-Feedback-Survey.user.js
// @grant        none
// ==/UserScript==
var options = {
    '0': [null, null, null],
    '1': ['1,5', '1,-1', '1,0'],
    '2': ['2,4', '2,-1', '2,0'],
    '3': ['3,3', '3,0', '3,0'],
    '4': ['2,1', '4,-10', '4,0'],
    '5': ['5,1', '5,-10', '5,0']
};

var optionsText = {
    '0': '0',
    '1': '1: 非常同意',
    '2': '2: 同意',
    '3': '3: 普通',
    '4': '4: 不同意',
    '5': '5: 非常不同意'
};

(function() {
    'use strict';
    var body = document.body;
    var selects = document.getElementsByTagName('select');
    var select = document.createElement('select');
    select.setAttribute('style', 'left:20%; height:40px; width:120px; position:fixed; top:20%')
    select.addEventListener("change", function() {
    	for (let i = 0; i < selects.length; i++) {
            for (let j = 0; j < selects[i].options.length; j++) {
                if (selects[i].options[j].value == options[select.value][0]) {
                    selects[i].value = options[select.value][0];
                    break;
                }
                else if (selects[i].options[j].value == options[select.value][1]) {
                    selects[i].value = options[select.value][1];
                    break;
                }
                else if (selects[i].options[j].value == options[select.value][2]) {
                    selects[i].value = options[select.value][2];
                    break;
                }
            }
        }
        window.scrollTo({
            top: 1000,
            behavior: "smooth"
        });
    });
    Object.keys(options).forEach(function(key) {
        let option = document.createElement("option");
        option.text = optionsText[key];
        option.value = key;
        select.add(option);
    });
    body.appendChild(select);
    // Your code here...
})();
