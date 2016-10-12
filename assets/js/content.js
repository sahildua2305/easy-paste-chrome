/*
 * @Author: sahildua2305
 * @Date:   2016-05-01 07:26:20
 * @Last Modified by:   Sahil Dua
 * @Last Modified time: 2016-05-10 00:24:47
 */


var element;

document.addEventListener("contextmenu", function (e) {
    element = e.target;
});

var textAcceptingInputTypes = [
    "text",
    "url",
    "search",
    "tel",
    "password"
];

var forbiddenTextAcceptingInputTypes = [
    "number",
    "email",
    "range",
    "date",
    "month",
    "week",
    "time",
    "datetime",
    "datetime-local",
    "color"
];

function getCaretPosition(field) {
    // initialize
    var caretPos = 0;

    if ($.inArray(field.type, textAcceptingInputTypes) > -1) {
        // Standard-compliant browsers
        caretPos = field.selectionStart;
    }
    else if ('selectionStart' in field && $.inArray(field.type, forbiddenTextAcceptingInputTypes) == -1) {
        // Standard-compliant browsers
        caretPos = field.selectionStart;
    }
    else if (document.selection) {
        // IE support

        // set focus on the element
        field.focus();

        // to get cursor position, get empty selection range
        var sel = document.selection.createRange();

        // move selection start to 0 position
        sel.moveStart('character', -field.value.length);

        // the caret position is selection length
        caretPos = sel.text.length;
    }

    return caretPos;
}


$(document).on('ready', function () {

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.status == "success" && message.type == "string") {
            var caretPos = getCaretPosition(element);
            var initialValue = element.value;
            var first_part = initialValue.substr(0, caretPos);
            var last_part = initialValue.substr(caretPos);
            var selected_text = initialValue.substring(element.selectionStart, element.selectionEnd);

            // if there is  selected text
            if (selected_text != '') {
                last_part = initialValue.substr(caretPos + selected_text.length);
            }
            // selected text remove
            element.value = first_part + message.link + last_part;
        }
    });

    chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function (response) {
        for (var key in response.data) {
            $('input').each(function (index, data) {
                if (data.type != 'hidden' && $.inArray(data.type, forbiddenTextAcceptingInputTypes) == -1) {
                    if (data.name.toUpperCase().search(key.toUpperCase()) != -1) {
                        $(`[name="${data.name}"]`).val(response.data[key]);
                    }
                    else if (data.id.toUpperCase().search(key.toUpperCase()) != -1) {
                        $(`[id="${data.id}"]`).val(response.data[key]);
                    }
                }
            });
        }
    });

});
