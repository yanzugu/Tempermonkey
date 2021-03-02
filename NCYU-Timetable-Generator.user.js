// ==UserScript==
// @name         NCYU-Timetable-Generator
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://github.com/yanzugu/Tempermonkey/blob/main/NCYU-Timetable-Generator.meta.js
// @downloadURL  https://github.com/yanzugu/Tempermonkey/blob/main/NCYU-Timetable-Generator.user.js
// @description  Create school timetable
// @author       yanzugu
// @include      /^https://web08503.\.adm\.ncyu\.edu\.tw/stu_selq02\.aspx*/
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var body = document.body;
    var table = body.getElementsByTagName('table')[2];
    var trs = table.getElementsByTagName('tr');
    var classTimes = ['08:10-09:00', '09:10~10:00', '10:10~11:00', '11:10~12:00', '12:10~13:00', '13:20~14:10', '14:20~15:10', '15:20~16:10', '16:20~17:10'];
    var days = ['一', '二', '三', '四', '五', '六', '日'];
    var day2Num = {
        '一': 0,
        '二': 1,
        '三': 2,
        '四': 3,
        '五': 4,
        '六': 5,
        '日': 6
    };
    var period2Num = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        'F': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8
    };
    var classes = new Array(9);
    for (let i = 0; i < classes.length; i++) {
        classes[i] = new Array(7);
    }

    for (let i = 1; i < trs.length; i++) {
        let tds = trs[i].getElementsByTagName('td');
        let className = tds[3].innerHTML;
        let day = tds[13].innerHTML;
        let period = tds[14].innerHTML;
        let classRoom = tds[16].innerHTML;

        for (let t = 0; t < Math.trunc(day.length / 2); t++) {
            for (let p = period2Num[period[t * 4 + 0]]; p <= period2Num[period[t * 4 + 2]]; p++) {
                classes[p][day2Num[day[t * 2]]] = className + '\n\n' + classRoom;
            }
        }
    }

    table = document.createElement('table');
    table.classList.add('mytable');

    var el = '<thead><tr class="mytr"><th class="myth"></th>';
    for (let i = 0; i < days.length; i++) {
        el += '<th class="myth">';
        el += '星期' + days[i];
        el += '</th>';
    }
    el += '</tr></thead>';

    el += '<tbody>';

    for (let i = 0; i < 9; i++) {
        el += '<tr class="mytr">';
        for (let j = 0; j < 8; j++) {
            el += '<td class="mytd">';
            if (j === 0) {
                el += '第';
                if (i === 4) {
                    el += 'F';
                } else if (i < 4) {
                    el += (i + 1).toString();
                } else {
                    el += i.toString();
                }
                el += '節\n\n';
                el += classTimes[i];
            } else {
                if (classes[i][j - 1] !== undefined) {
                    el += classes[i][j - 1];
                }
            }
            el += '</td>'
        }
        el += '</tr>';
    }
    table.innerHTML = el;

    var div = document.createElement('div');
    div.setAttribute('id', 'tab');
    div.appendChild(table);

    var button = document.createElement('BUTTON');
    button.innerHTML = "輸出課表";
    button.setAttribute('style', 'magrin: auto; margin-top: 10px');
    button.addEventListener('click', function () {
        var sTable = document.getElementById('tab').innerHTML;

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=1000, width=1000');
        var title = '<title>課表_' + Date.now() + '</title>';

        win.document.write('<html><head>');
        win.document.write(title); // <title> FOR PDF HEADER.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);
        win.document.write('</body></html>');

        win.document.close(); // CLOSE THE CURRENT WINDOW.

        win.print(); // PRINT THE CONTENTS.
    });

    body.appendChild(div);
    body.appendChild(button);


    var style = 'border: 2px solid #000; width: 12.5%; font-size: 13px; text-align: center; white-space: pre-line;';
    $('.mytr').attr('style', style);
    $('.mytr').attr('dir', 'ltr');
    $('.myth').attr('style', style + 'height: 50px;');
    $('.mytd').attr('style', style + 'height: 80px;');  
    $('.mytable').attr('style', 'border-collapse:collapse; margin:auto; width: 100%;');
    $('.mytable').attr('dir', 'rtl');
    $('#tab').attr('style', 'width:50%; margin: auto');

    // Your code here...
})();
