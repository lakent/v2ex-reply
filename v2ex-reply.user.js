// ==UserScript==
// @name                V2ex 楼中楼
// @namespace           v2ex-reply
// @version             1.2.9
// @description         V2ex 楼中楼
// @author              lakent
// @match               *://*.v2ex.com/t/*
// @grant               none
// @homepageURL         https://github.com/lakent/v2ex-reply
// @fork-from           https://greasyfork.org/zh-CN/scripts/397787-v2ex-pro
// @original-author     https://greasyfork.org/zh-CN/users/457965-yjxjn
// ==/UserScript==

(function () {
    'use strict';

    var replyList = document.querySelectorAll("div.cell table tbody tr td:nth-child(3) div.reply_content")
    var replyContents = Array.from(replyList, i => i.innerHTML)
    var firstReplyNo = document.querySelector(".no").innerHTML;

    var userList = document.querySelectorAll("div.cell table tbody tr td:nth-child(3) strong a")
    var users = Array.from(userList, i => i.innerHTML)

    var commentList = document.querySelectorAll("#Main div:nth-child(4) div[id].cell");

    let i = 1;
    while (i < commentList.length) {
        if (replyContents[i].match("楼上")) {
            replyList[i - 1].appendChild(commentList[i]);
        }

        const regexp = / #(\d+) /g;
        if (replyContents[i].match(regexp)) {
            var nums = [...replyContents[i].matchAll(regexp)];
            for (const num of nums) {
                if (num[1] - firstReplyNo > 0) {
                    var commentClone = commentList[i].cloneNode(true);
                    replyList[num[1] - firstReplyNo].appendChild(commentClone);
                    commentList[i].remove();
                }
            }
        } else {
            for (var j = i - 1; j >= 0; j--) {
                if (replyContents[i].match(users[j])) {
                    replyList[j].appendChild(commentList[i]);
                    break;
                }
            }
        }
        i++;
    }
})();
