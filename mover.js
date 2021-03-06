// ==UserScript==
// @name         CopyCPtest
// @version      0.1
// @include      *ui/Content/Tests/TestDetail*
// @description  enter something useful
// @author       DAVID LUI
// @match        http://tampermonkey.net/faq.php?version=3.11&ext=dhdg&updated=true
// @grant        none
// ==/UserScript==

// === START CREATE BUTTON ON THE PAGE START ===
var div = document.createElement("div");
div.id = "divid";
div.style= "margin-top: 30px; border-style:none;";
div.className = "pc-main-cont";


var text = document.createElement("textarea");
text.id = "text";
text.rows = "40";
text.cols = "50";

var btn = document.createElement("BUTTON");
btn.id = "test2";
btn.type = "button";
btn.textContent = "Generate\n";
btn.style= "height: 20px;margin-right: 5px;";
btn.className = "btn-save";

$('.pc-main-cont').append(div);

div.appendChild(btn);

var btn2 = document.createElement("BUTTON");
btn2.id = "test";
btn2.type = "button";
btn2.textContent = "Populate\n";
btn2.style= "height:20px;";
btn2.className = "btn-save";
div.appendChild(btn2);
div.appendChild(text);

// === END CREATE BUTTON ON THE PAGE END ===
$(document).on("click", "#test", function(event){
    var array = JSON.parse(document.getElementById("text").value);
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (i == 0) { //textArray
                document.getElementById(array[i][j][0]).value = array[i][j][1];
            }
            else if (i == 1) { //selectArray
                document.getElementById(array[i][j][0]).checked = array[i][j][1];
            }
            else if (i == 2) { //dropdownArray
               // console.log(document.getElementById(array[i][j][0]));
                document.getElementById(array[i][j][0]).selectedIndex = array[i][j][1];
            }
            else if (i == 3) { //scriptArray
                
               //var script = document.getElementsByClassName("tse-viewport")[0].getElementsByClassName("tse-cnt");
               //var line = script[i].innerHTML = array[i][j];
                  
               
            }
        }

    }
});
// === START BUTTON FUNCTION START ===
$(document).on("click", "#test2", function(event){
    //Name
    var bigArray = [];
    var textArray = []; 
    var selectArray = [];
    var dropdownArray = [];
    var scriptArray = [];

    var testName = ["NameInput", document.getElementById("NameInput").value];
    textArray.push(testName);
    var description = ["DescriptionInput", document.getElementById("DescriptionInput").value];
    textArray.push(description);
    if (document.getElementById("Status_0").checked) {
        selectArray.push(["Status_0", "true"]);
    } else {
        selectArray.push(["Status_1", "true"]);
    }

    //Monitor Type
    var monitor = -1; //var monitorArray = [];
    var y = document.getElementById("MonitorInput");
    var x = y.getElementsByTagName("input");
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked == true) {
            //monitor = x[i].value;
            selectArray.push([x[i].id, "true"]);
            break;
        }
    }

    //document.getElementById("MonitorInput").querySelectorAll( '[value="18"]');

    //Additional monitor
    //var additionalArray = [];
    var additional = document.getElementById("AdditionalMonitorInput").selectedIndex;
    var additionalType = document.getElementById("AdditionalMonitorInputProtocol").selectedIndex;
    dropdownArray.push(["AdditionalMonitorInput", additional]);
    dropdownArray.push(["AdditionalMonitorInputProtocol", additionalType]);

    //Script

    if (document.getElementById("TestTypeLabel").innerHTML == "HTML Code") {

    } else if (document.getElementById("TestTypeLabel").innerHTML == "Transaction") {
        var command = "";
        var script = document.getElementsByClassName("tse-viewport")[0].getElementsByClassName("tse-cnt");
        for (var i = 0 ; i < script.length; i++) {
            command = "";
            var line = script[i].getElementsByTagName("span");
            for (var x = 0; x < line.length; x++) {
                command += line[x].innerHTML;
            }
            scriptArray.push(command);
        }
    }
    else {
        var url = document.getElementById("TestUrlInput");
        textArray.push(["TestUrlInput", url.value]);

    }

    //Advanced Settings
    //var optionsArray = [];
    var advancedOptions = document.getElementsByClassName("adv-settings")[0].getElementsByTagName("input");
    for (var i = 0; i < advancedOptions.length; i++) {
        if (advancedOptions[i].checked == true) {
            selectArray.push([advancedOptions[i].id, "true"]);
        }
    }

    //Advanced Settings Dropdown
    //var dropDownArray = [];
    var dropDownOptions = document.getElementsByClassName("adv-settings")[0].getElementsByTagName("select");
    for (var i = 0; i < dropDownOptions.length; i++) {
        var value = document.getElementById(dropDownOptions[i].id).selectedIndex;
        dropdownArray.push([dropDownOptions[i].id, value]);
    }

    bigArray.push(textArray,selectArray,dropdownArray,scriptArray);

    document.getElementById("text").value = JSON.stringify(bigArray);
});
