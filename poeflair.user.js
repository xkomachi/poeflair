// ==UserScript==
// @name         /r/pathofexile post flair colors
// @namespace    Vaal or no balls
// @version      1
// @description  Changes colors of post flairs.
// @author       Komachi
// @match        https://www.reddit.com/r/pathofexile/*
// @match        http://www.reddit.com/r/pathofexile/*
// @match        https://m.reddit.com/r/pathofexile/*
// @match        http://m.reddit.com/r/pathofexile/*
// @downloadURL  https://github.com/xkomachi/poeflair/raw/master/poeflair.user.js
// @updateURL    https://github.com/xkomachi/poeflair/raw/master/poeflair.user.js
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

var baseflairbehavior = 0; // 0 = do nothing. 1 = change colors. 2 = remove.
(function() {
    'use strict';
    function generateCss()
    {
        // missing af - probably affilate links? seemd to be disabled on the subreddit. Also missing QA - seems to be related to undownvoteable posts?
        var label_names = ["lab","spoiler","ggg","discussion","question","questionanswered","shitpost","itemshowcase"]; 
        var default_label_colors = ["#686f57","#333","#ae0b0b","#686f57","#027684","#017145","#533A3A","#490175"];
        var color_label = [];
        if(localStorage.getItem("poe_label_flair_remove") === null)
        {
             localStorage.setItem("poe_label_flair_remove","false");
        }
        for(var j=0;j<label_names.length;j++)
        {
            if(localStorage.getItem("poe_label_flair_color_"+label_names[j]) === null)
            {
                localStorage.setItem("poe_label_flair_color_"+label_names[j],default_label_colors[j]);
            }
            color_label.push(localStorage.getItem("poe_label_flair_color_"+label_names[j]));
        }
        var stylesheet = "";
        for(var i=0;i<label_names.length;i++)
        {
            stylesheet=stylesheet+".link.linkflair-"+label_names[i]+"{border-left: 7px solid "+color_label[i]+"!important} .linkflair-"+label_names[i]+" .linkflairlabel{ background-color: "+ color_label[i] +" !important; border-color: "+ color_label[i] + " !important;}";
            if(localStorage.getItem("poe_label_flair_remove") == "true")
            {
                stylesheet=stylesheet+".linkflair-"+label_names[i]+" .linkflairlabel{ display: none !important;}";
            }
        }
        return stylesheet;
    }
    if(window.location.href.indexOf("flairsettings") !== -1)
    {
       // document.addEventListener('DOMContentLoaded', function() {
       //     alert("hihi");document.innerHTML = "";
       // }, false);
        var settings_html = '<!DOCTYPE HTML> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <script> var label_names = ["lab","spoiler","ggg","discussion","question","questionanswered","shitpost","itemshowcase"]; function updatesettings() { for(var i=0;i<label_names.length;i++) { var x = document.forms["colorsform"][i].value; if (typeof x != \'undefined\' && x) { localStorage.setItem("poe_label_flair_color_"+label_names[i],x); } } return false; } function restoredefaults() { var default_label_colors = ["#686f57","#333","#ae0b0b","#686f57","#027684","#017145","#533A3A","#490175"]; for(var i=0;i<label_names.length;i++) { localStorage.setItem("poe_label_flair_color_"+label_names[i],default_label_colors[i]); } localStorage.setItem("poe_label_flair_remove","false"); return false; } function sideflairtoggle() { if(localStorage.getItem("poe_label_flair_remove") == "true") { localStorage.setItem("poe_label_flair_remove","false"); } else { localStorage.setItem("poe_label_flair_remove","true"); } return false; } </script> <title>Post Flair Color Settings</title> </head> <body> <h1> POE Post Flair Colors settings </h1> <h2> <p> Enter color values for labels: <br> </h2> supported inputs: <br> color by name: red, blue, cyan <br> color by hex value: #454545, #000f23 <br> color by rgb: rgb(0,20,150), rgb(90,110,250) <br> color by rgba: rgba(120,230,40,0.5), rgba(130,120,50,0.32) <br> You can use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool">https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool</a> for picking colors. <br> leave fields you don\'t want to modify empty. <br> </p> <form name="colorsform" onsubmit="return validateForm()" method="post"> <input type="text" name="lab" placeholder="Lab"><br> <input type="text" name="spoiler" placeholder="Spoiler"><br> <input type="text" name="ggg" placeholder="ggg"><br> <input type="text" name="discussion" placeholder="discussion"><br> <input type="text" name="question" placeholder="question"><br> <input type="text" name="questionanswered" placeholder="Question (answered)"><br> <input type="text" name="shitpost" placeholder="Shitpost"><br> <input type="text" name="itemshowcase" placeholder="Item showcase"><br> <br> <input type="button" value="Update Settings" onclick="updatesettings()"> <input type="button" value="Toggle sideflair only" onclick="sideflairtoggle()"> <input type="button" value="Restore Defaults" onclick="restoredefaults()"> </form> </body> </html>';
        window.onload = function (){document.open('text/html');document.write(settings_html);document.close();};
    }
    else
    {
        GM_addStyle(generateCss());
    }
    
    
    //{localStorage.setItem("2hu_suite_purchased_"+banner_id,"yes");
//    var allflairs = document.getElementsByClassName("linkflairlabel");
    
})();
