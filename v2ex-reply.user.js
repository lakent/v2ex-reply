// ==UserScript==
// @name                V2ex 楼中楼
// @namespace           v2ex-reply
// @version             1.3.0
// @description         V2ex 楼中楼查看
// @author              lakent
// @match               *://*.v2ex.com/t/*
// @grant               none
// @homepageURL         https://github.com/lakent/v2ex-reply
// @fork-from           https://greasyfork.org/zh-CN/scripts/397787-v2ex-pro
// @original-author     https://greasyfork.org/zh-CN/users/457965-yjxjn
// ==/UserScript==

(function () {
    'use strict';
    function getContenes(x) {
        return Array.from(x, i => i.innerText)
    }

    let replyList = document.querySelectorAll("div.cell table tbody tr td:nth-child(3) div.reply_content")
    const userList = document.querySelectorAll("div.cell table tbody tr td:nth-child(3) strong a")
    const commentList = document.querySelectorAll("#Main div:nth-child(4) div[id].cell");

    const replyContents = getContenes(replyList)
    const users = getContenes(userList)
    const topReplyindex = Number(document.querySelector(".no").innerText);
    const indexRegex = RegExp(/\s#(\d+)/, 'g');

    let indexs = new Array();

    for (let i = 1; i < commentList.length; i++) {
        indexs = [...replyContents[i].matchAll(indexRegex)];
        if (indexs.length) {
            for (const index of indexs) {
                if (index[1] - topReplyindex >= 0) {
                    var commentClone = commentList[i].cloneNode(true);
                    replyList[index[1] - topReplyindex].appendChild(commentClone);
                }
            }
            commentList[i].remove();
            continue;
        }

        if (replyContents[i].match("楼上")) {
            replyList[i - 1].appendChild(commentList[i]);
        }

        for (var j = i - 1; j >= 0; j--) {
            if (replyContents[i].match(users[j])) {
                replyList[j].appendChild(commentList[i]);
                break;
            }
        }
    }
})();
