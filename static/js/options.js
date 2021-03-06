var extension;
var block_list;
var block_words;

function init() {
    extension = chrome.extension.getBackgroundPage();
    loadSettings();
    // App = extension.App;
    // ProfileManager = extension.ProfileManager;
    // RuleManager = extension.RuleManager;
    // Settings = extension.Settings;
    // Utils = extension.Utils;
    // I18n = extension.I18n;
    // autoEnabled = RuleManager.isEnabled();
    // I18n.process(document);
    // document.body.style.visibility = "visible";

    // buildMenuItems();
    // initUI();
}

function loadSettings() {
    block_list = Settings.getObject("block_list", []);
    block_words = Settings.getObject("block_words", []);
    $.each(block_list, function(index, val) {
        switch (val) {
            case "taobao":
                $("#block_taobao_checkbox").attr("checked", "checked");
                break;
            case "tmall":
                $("#block_tmall_checkbox").attr("checked", "checked");
                break;
            case "jd":
                $("#block_jd_checkbox").attr("checked", "checked");
                break;
            case "yixun":
                $("#block_yixun_checkbox").attr("checked", "checked");
                break;
            case "amazon":
                $("#block_amazon_checkbox").attr("checked", "checked");
                break;
            case "dangdang":
                $("#block_dangdang_checkbox").attr("checked", "checked");
                break;
        }

    });

    $.each(block_words, function(index, val) {
        $("#block_words_content").append('<div class="col-md-2 block_word_item">' + val + '</div>');
    });

}

function saveBlock() {
    block_list = [];
    if ($("#block_taobao_checkbox").is(':checked'))
        block_list.push("taobao");
    if ($("#block_tmall_checkbox").is(':checked'))
        block_list.push("tmall");
    if ($("#block_jd_checkbox").is(':checked'))
        block_list.push("jd");
    if ($("#block_yixun_checkbox").is(':checked'))
        block_list.push("yixun");
    if ($("#block_amazon_checkbox").is(':checked'))
        block_list.push("amazon");
    if ($("#block_dangdang_checkbox").is(':checked'))
        block_list.push("dangdang");

    Settings.setObject("block_list", block_list);
    Settings.setObject("block_words", block_words);

    extension.loadSettings();
    alert("保存成功！");
    location.reload();

}

function saveNewWord() {
    var newWord = $("#new_word_input").val();
    if (!newWord) {
        alert("请输入屏蔽关键词");
    } else if ($.inArray(newWord, block_words) != -1) {
        alert("已存在该关键词");
    } else {
        block_words.push(newWord);
        $("#new_word_input_group").before('<div class="col-md-2 block_word_item">' + newWord + '</div>');
        $("#new_word_input").val("");
    }

}

$(document).ready(function() {
    init();
    $("#block_save_button").click(saveBlock);
    $("#new_word_button").click(saveNewWord);
    
});
