var currentSelection = { "1": "none", "2": "none", "3": "none", "4": "none" };
var selectionColors = [];
var totalGamePlayers = 0;
var nextPlay = 1;
var currentObj = {};
var currentHighlightedCell = [];
var playEnable = false;

function BindLudoTableBody() {
    var tbody = document.getElementById("LudoTBody");
    tbody.innerHTML = "";
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var counter = 0;
    var coinCounter = { "red": 0, "green": 0, "yellow": 0, "blue": 0 };
    for (let rowIndex = 0; rowIndex < 21; rowIndex++) {
        tr = document.createElement("tr");
        for (let columnIndex = 0; columnIndex < 21; columnIndex++) {
            if (!skipIndex(counter)) {
                td = document.createElement("td");
                td.id = "td_" + counter;
                var backgroundColor = setColor(counter);
                var border = setBorder(counter);
                td.style.backgroundColor = backgroundColor;
                td.style.border = border;
                if (rowColumnSpan(counter)) {
                    td.rowSpan = 2;
                    td.colSpan = 2;
                    if (IsBindCoins(counter)) {
                        coinCounter[td.style.backgroundColor]++;
                        td.innerText = "♙";
                        var attr = document.createAttribute("data-coinID");
                        attr.value = coinCounter[td.style.backgroundColor];
                        td.setAttributeNode(attr);
                        var attr2 = document.createAttribute("data-coinType");
                        attr2.value = td.style.backgroundColor;
                        td.setAttributeNode(attr2);
                        var attr3 = document.createAttribute("data-cellType");
                        attr3.value = "Home";
                        td.setAttributeNode(attr3);
                    } else {
                        td.innerText = "";
                    }
                }
                var attr4 = document.createAttribute("data-cellBGC");
                attr4.value = backgroundColor;
                td.setAttributeNode(attr4);
                var attr5 = document.createAttribute("data-index");
                attr5.value = counter;
                td.setAttributeNode(attr5);
                var attr6 = document.createAttribute("data-border");
                attr6.value = border;
                td.setAttributeNode(attr6);
                //td.innerText = counter;
                tr.appendChild(td);
            }
            counter++;
        }
        tbody.appendChild(tr);
    }
}

function setColor(index) {
    var redColor = [0, 1, 2, 3, 4, 5, 6, 7, 8,
        21, 42, 63, 84, 105, 126, 147, 168,
        44, 45, 65, 66,
        47, 48, 68, 69,
        107, 108, 128, 129,
        110, 111, 131, 132,
        29, 50, 71, 92, 113, 134, 155, 176,
        169, 170, 171, 172, 173, 174, 175,
        190,
        211, 212, 213, 214, 215, 216, 217, 218, 219,
    ];
    var greenColor = [12, 13, 14, 15, 16, 17, 18, 19, 20,
        33, 54, 75, 96, 117, 138, 159, 180,
        181, 182, 183, 184, 185, 186, 187, 188,
        41, 62, 83, 104, 125, 146, 167,
        56, 57, 77, 78,
        119, 120, 140, 141,
        59, 60, 80, 81,
        122, 123, 143, 144,
        32,
        31, 52, 73, 94, 115, 136, 157, 178, 199,
    ];
    var yellowColor = [252, 253, 254, 255, 256, 257, 258, 259, 260,
        273, 294, 315, 336, 357, 378, 399, 420,
        421, 422, 423, 424, 425, 426, 427, 428,
        281, 302, 323, 344, 365, 386, 407,
        296, 297, 317, 318,
        299, 300, 320, 321,
        359, 360, 380, 381,
        362, 363, 383, 384,
        408,
        409, 388, 367, 346, 325, 304, 283, 262, 241
    ];
    var blueColor = [264, 265, 266, 267, 268, 269, 270, 271, 272,
        285, 306, 327, 348, 369, 390, 411, 432,
        433, 434, 435, 436, 437, 438, 439, 440,
        419, 398, 377, 356, 335, 314, 293,
        371, 372, 392, 393,
        374, 375, 395, 396,
        308, 309, 329, 330,
        311, 312, 332, 333,
        250,
        229, 228, 227, 226, 225, 224, 223, 222, 221];
    var finalColor = [198, 200, 242, 240, 220];
    if (redColor.indexOf(index) > -1) {
        return "red";
    }
    else if (greenColor.indexOf(index) > -1) {
        return "green";
    }
    else if (yellowColor.indexOf(index) > -1) {
        return "yellow";
    }
    else if (blueColor.indexOf(index) > -1) {
        return "blue";
    }
    else if (finalColor.indexOf(index) > -1) {
        return "gray";
    }
}

function setBorder(index) {
    var borderApplicable = [
        211, 212, 213, 214, 215, 216, 217, 218, 219,
        189, 190, 191, 192, 193, 194, 195, 196, 197, 198,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 31, 52, 73, 94, 115, 136, 157, 178, 199,
        11, 32, 53, 74, 95, 116, 137, 158, 179, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        221, 222, 223, 224, 225, 226, 227, 228, 229, 230,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 251,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 409, 388, 367, 346, 325, 304, 283, 262, 241,
        429, 408, 387, 366, 345, 324, 303, 282, 261, 240,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189
    ];
    if (borderApplicable.indexOf(index) > -1) {
        return "1px solid black";
    } else {
        return "none";
    }
    //
}

function rowColumnSpan(index) {
    var rowCoumnSpanItem = [44, 47, 107, 110,
        56, 59, 119, 122,
        296, 299, 359, 362,
        308, 311, 371, 374];

    if (rowCoumnSpanItem.indexOf(index) > -1) {
        return true;
    }
    return false;
}

function skipIndex(index) {
    var skipItem = [45, 65, 66, 48, 68, 69, 108, 128, 129, 111, 131, 132,
        57, 77, 78, 60, 80, 81, 120, 140, 141, 123, 143, 144,
        297, 317, 318, 300, 320, 321, 360, 380, 381, 363, 383, 384,
        309, 329, 330, 312, 332, 333, 372, 392, 393, 375, 395, 396
    ];
    if (skipItem.indexOf(index) > -1) {
        return true;
    }
    return false;
}

function BindDiesTableBody() {
    var tbody = document.getElementById("DiesTBody");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var counter = 0;
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        tr = document.createElement("tr");
        for (let columnIndex = 0; columnIndex < 2; columnIndex++) {
            td = document.createElement("td");
            td.id = "DiesTD_" + counter;
            //td.style.backgroundColor = setColor(counter);
            td.innerText = "" //♙ ●
            tr.appendChild(td);
            counter++;
        }
        tbody.appendChild(tr);
    }
}

function BindPlayerSelectionTableBody() {
    var tbody = document.getElementById("PlayerSelectionTBody");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var select = document.createElement("select");
    var option = document.createElement("option");
    var totalPlayers = 4;
    var colors = ["none", "Red", "Green", "Yellow", "Blue"]
    for (let index = 0; index < totalPlayers; index++) {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerText = "Player " + (index + 1);
        tr.appendChild(td);
        td = document.createElement("td");
        select = document.createElement("select");
        select.onchange = function () { var obj = this; PlayerSelection(obj, index) };


        option = document.createElement("option");
        option.id = "Option_" + index + 0;
        option.innerText = "none";
        select.appendChild(option);

        option = document.createElement("option");
        option.id = "Option_" + index + (index + 1);
        option.innerText = colors[index + 1];
        select.appendChild(option);

        td.appendChild(select);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

function PlayerSelection(obj, playerIndex) {
    var selectionValue = obj.value;
    currentSelection["" + (playerIndex + 1)] = obj.value;
    var StartBtn = document.getElementById("StartBtn");
    if (EnableGame()) {
        StartBtn.onclick = StartGame;
        StartBtn.style.cursor = "Pointer";
        StartBtn.style.color = "Black";
    } else {
        StartBtn.onclick = "";
        StartBtn.style.cursor = "Default";
        StartBtn.style.color = "gray";
    }
}

function EnableGame() {
    if (currentSelection["1"].toLocaleLowerCase() == "red") {
        return true;
    } else if (currentSelection["2"].toLocaleLowerCase() == "green") {
        return true;
    } else if (currentSelection["3"].toLocaleLowerCase() == "yellow") {
        return true;
    } else if (currentSelection["4"].toLocaleLowerCase() == "blue") {
        return true;
    } else {
        return false;
    }

}

function IsBindCoins(counter) {
    var redCoin = [44, 47, 107, 110];
    var greenCoin = [56, 59, 119, 122];
    var blueCoin = [308, 311, 371, 374];
    var yellowCoin = [296, 299, 359, 362];

    if (currentSelection["1"].toLocaleLowerCase() == "red" && redCoin.indexOf(counter) > -1) {
        return true;
    } else if (currentSelection["2"].toLocaleLowerCase() == "green" && greenCoin.indexOf(counter) > -1) {
        return true;
    } else if (currentSelection["3"].toLocaleLowerCase() == "yellow" && yellowCoin.indexOf(counter) > -1) {
        return true;
    } else if (currentSelection["4"].toLocaleLowerCase() == "blue" && blueCoin.indexOf(counter) > -1) {
        return true;
    } else {
        return false;
    }
}

function Play() {
    var totalNumber = 0;
    var currentMax = Math.floor(Math.random() * 6) + 1;
    var excludeID = [];
    for (let index = 0; index < 6; index++) {
        var diesTD = document.getElementById("DiesTD_" + index);
        if (Math.round(Math.random()) < 0.5) {
            diesTD.innerText = "";
            excludeID.push("DiesTD_" + index);
        } else {
            diesTD.innerText = "●";
            totalNumber++;
        }
    }
    if (totalNumber != currentMax) {
        if (totalNumber < currentMax) {
            var counter = 0;
            for (let index = totalNumber; index < currentMax; index++) {
                document.getElementById(excludeID[counter]).innerText = "●";
                counter++;
            }
            totalNumber = currentMax;
        }
    }
    if (totalNumber == 0) {
        var diesTD = document.getElementById("DiesTD_0");
        diesTD.innerText = "●";
        totalNumber++;
    }
    checkMoveAvailability(selectionColors[nextPlay - 1], totalNumber);
}

function StartGame() {
    BindLudoTableBody();
    document.getElementById("DiesTable").style.display = "inline";
    document.getElementById("PlayerTable").style.display = "none";
    if (currentSelection["1"].toLocaleLowerCase() == "red") {
        totalGamePlayers += 1;
        selectionColors.push("Red");
        currentObj["Red"] = {
            "Player_1": -1,
            "Player_2": -1,
            "Player_3": -1,
            "Player_4": -1,
        }
    }
    if (currentSelection["2"].toLocaleLowerCase() == "green") {
        selectionColors.push("Green");
        totalGamePlayers += 1;
        currentObj["Green"] = {
            "Player_1": -1,
            "Player_2": -1,
            "Player_3": -1,
            "Player_4": -1,
        }
    }
    if (currentSelection["3"].toLocaleLowerCase() == "yellow") {
        selectionColors.push("Yellow");
        totalGamePlayers += 1;
        currentObj["Yellow"] = {
            "Player_1": -1,
            "Player_2": -1,
            "Player_3": -1,
            "Player_4": -1,
        }
    }
    if (currentSelection["4"].toLocaleLowerCase() == "blue") {
        selectionColors.push("Blue");
        totalGamePlayers += 1;
        currentObj["Blue"] = {
            "Player_1": -1,
            "Player_2": -1,
            "Player_3": -1,
            "Player_4": -1,
        }
    }
    nextPlay = 1;
}

function checkMoveAvailability(type, dieValue) {
    var isMovable = false;
    currentHighlightedCell = [];
    var redTrack = [190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 11,
        32, 53, 74, 95, 116, 137, 158, 179,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        230, 251,
        250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 429,
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210,
        211, 212, 213, 214, 215, 216, 217, 218,
        219
    ];

    var greenTrack = [32, 53, 74, 95, 116, 137, 158, 179,
        01, 202, 203, 204, 205, 206, 207, 208, 209,
        230, 251,
        250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 429,
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189,
        190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10,
        31, 52, 73, 94, 115, 136, 157, 178,
        199
    ];

    var blueTrack = [250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 429,
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189,
        190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 11,
        32, 53, 74, 95, 116, 137, 158, 179,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        230,
        229, 228, 227, 226, 225, 224, 223, 222,
        221
    ];

    var yellowTrack = [
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189,
        190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 11,
        32, 53, 74, 95, 116, 137, 158, 179,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        230, 251,
        250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430,
        409, 388, 367, 346, 325, 304, 283, 262,
        241
    ];

    if (type.toLocaleLowerCase() == "red") {
        if (dieValue == 6) {
            if (currentObj["Red"].Player_1 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_44");
            }
            if (currentObj["Red"].Player_2 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_47");
            }
            if (currentObj["Red"].Player_3 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_107");
            }
            if (currentObj["Red"].Player_4 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_110");
            }
        }
        if (currentObj["Red"].Player_1 != -1 &&
            currentObj["Red"].Player_1 != 219) {
            var tempIndex = redTrack.indexOf(currentObj["Red"].Player_1);
            if ((tempIndex + dieValue) < redTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Red"].Player_1);
            }
        }
        if (currentObj["Red"].Player_2 != -1 &&
            currentObj["Red"].Player_2 != 219) {
            var tempIndex = redTrack.indexOf(currentObj["Red"].Player_2);
            if ((tempIndex + dieValue) < redTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Red"].Player_2);
            }
        }
        if (currentObj["Red"].Player_3 != -1 &&
            currentObj["Red"].Player_3 != 219) {
            var tempIndex = redTrack.indexOf(currentObj["Red"].Player_3);
            if ((tempIndex + dieValue) < redTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Red"].Player_3);
            }
        }
        if (currentObj["Red"].Player_4 != -1 &&
            currentObj["Red"].Player_4 != 219) {
            var tempIndex = redTrack.indexOf(currentObj["Red"].Player_4);
            if ((tempIndex + dieValue) < redTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Red"].Player_4);
            }
        }

    } else if (type.toLocaleLowerCase() == "green") {
        if (dieValue == 6) {
            if (currentObj["Green"].Player_1 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_56");
            }
            if (currentObj["Green"].Player_2 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_59");
            }
            if (currentObj["Green"].Player_3 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_119");
            }
            if (currentObj["Green"].Player_4 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_122");
            }
        }
        if (currentObj["Green"].Player_1 != -1 &&
            currentObj["Green"].Player_1 != 199) {
            var tempIndex = greenTrack.indexOf(currentObj["Green"].Player_1);
            if ((tempIndex + dieValue) < greenTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Green"].Player_1);
            }
        }
        if (currentObj["Green"].Player_2 != -1 &&
            currentObj["Green"].Player_2 != 199) {
            var tempIndex = greenTrack.indexOf(currentObj["Green"].Player_2);
            if ((tempIndex + dieValue) < greenTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Green"].Player_2);
            }
        }
        if (currentObj["Green"].Player_3 != -1 &&
            currentObj["Green"].Player_3 != 199) {
            var tempIndex = greenTrack.indexOf(currentObj["Green"].Player_3);
            if ((tempIndex + dieValue) < greenTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Green"].Player_3);
            }
        }
        if (currentObj["Green"].Player_4 != -1 &&
            currentObj["Green"].Player_4 != 199) {
            var tempIndex = greenTrack.indexOf(currentObj["Green"].Player_4);
            if ((tempIndex + dieValue) < greenTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Green"].Player_4);
            }
        }
    } else if (type.toLocaleLowerCase() == "yellow") {
        if (dieValue == 6) {
            if (currentObj["Yellow"].Player_1 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_296");
            }
            if (currentObj["Yellow"].Player_2 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_299");
            }
            if (currentObj["Yellow"].Player_3 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_359");
            }
            if (currentObj["Yellow"].Player_4 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_362");
            }
        }
        if (currentObj["Yellow"].Player_1 != -1 &&
            currentObj["Yellow"].Player_1 != 241) {
            var tempIndex = yellowTrack.indexOf(currentObj["Yellow"].Player_1);
            if ((tempIndex + dieValue) < yellowTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Yellow"].Player_1);
            }
        }
        if (currentObj["Yellow"].Player_2 != -1 &&
            currentObj["Yellow"].Player_2 != 241) {
            var tempIndex = yellowTrack.indexOf(currentObj["Yellow"].Player_2);
            if ((tempIndex + dieValue) < yellowTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Yellow"].Player_2);
            }
        }
        if (currentObj["Yellow"].Player_3 != -1 &&
            currentObj["Yellow"].Player_3 != 241) {
            var tempIndex = yellowTrack.indexOf(currentObj["Yellow"].Player_3);
            if ((tempIndex + dieValue) < yellowTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Yellow"].Player_3);
            }
        }
        if (currentObj["Yellow"].Player_4 != -1 &&
            currentObj["Yellow"].Player_4 != 241) {
            var tempIndex = yellowTrack.indexOf(currentObj["Yellow"].Player_4);
            if ((tempIndex + dieValue) < yellowTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Yellow"].Player_4);
            }
        }
    } else if (type.toLocaleLowerCase() == "blue") {
        if (dieValue == 6) {
            if (currentObj["Blue"].Player_1 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_308");
            }
            if (currentObj["Blue"].Player_2 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_311");
            }
            if (currentObj["Blue"].Player_3 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_371");
            }
            if (currentObj["Blue"].Player_4 == -1) {
                isMovable = true;
                currentHighlightedCell.push("td_374");
            }
        }
        if (currentObj["Blue"].Player_1 != -1 &&
            currentObj["Blue"].Player_1 != 221) {
            var tempIndex = blueTrack.indexOf(currentObj["Blue"].Player_1);
            if ((tempIndex + dieValue) < blueTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Blue"].Player_1);
            }
        }
        if (currentObj["Blue"].Player_2 != -1 &&
            currentObj["Blue"].Player_2 != 221) {
            var tempIndex = blueTrack.indexOf(currentObj["Blue"].Player_2);
            if ((tempIndex + dieValue) < blueTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Blue"].Player_2);
            }
        }
        if (currentObj["Blue"].Player_3 != -1 &&
            currentObj["Blue"].Player_3 != 221) {
            var tempIndex = blueTrack.indexOf(currentObj["Blue"].Player_3);
            if ((tempIndex + dieValue) < blueTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Blue"].Player_3);
            }
        }
        if (currentObj["Blue"].Player_4 != -1 &&
            currentObj["Blue"].Player_4 != 221) {
            var tempIndex = blueTrack.indexOf(currentObj["Blue"].Player_4);
            if ((tempIndex + dieValue) < blueTrack.length) {
                isMovable = true;
                currentHighlightedCell.push("td_" + currentObj["Blue"].Player_4);
            }
        }
    }

    var LudoTFootTd = document.getElementById("LudoTFootTd");
    if (isMovable) {
        HighLight("Active", dieValue);
        LudoTFootTd.style.color = selectionColors[nextPlay - 1];
        LudoTFootTd.innerText = "Please click on highlighted coin of " + selectionColors[nextPlay - 1];
        var PlayTD = document.getElementById("PlayTD");
        PlayTD.onclick = "";
        PlayTD.style.color = "gray";
        PlayTD.style.backgroundColor = "#6e5353";
        PlayTD.style.cursor = "default";
    } else {
        LudoTFootTd.style.color = selectionColors[nextPlay - 1];
        LudoTFootTd.innerText = "No move available for " + selectionColors[nextPlay - 1];
        if (dieValue != 6) {
            if (nextPlay >= totalGamePlayers) {
                nextPlay = 1;
            } else {
                nextPlay++;
            }
        }
        var PlayTD = document.getElementById("PlayTD");
        PlayTD.style.color = "white";
        PlayTD.style.backgroundColor = selectionColors[nextPlay - 1];

    }
}

function HighLight(toggleType, dieValue) {
    currentHighlightedCell.forEach(element => {
        var td = document.getElementById(element);
        if (toggleType == "Active") {
            td.style.borderColor = "#4f0808";
            td.style.borderStyle = "solid";
            td.style.borderWidth = 5;
            td.onclick = () => { coinMove(td, dieValue); }
        } else {
            td.style.border = td.getAttribute("data-border");
            td.style.color = "black";
        }
    });
    if (toggleType != "Active") {
        currentHighlightedCell.forEach(element => {
            var td = document.getElementById(element);
            td.onclick = "";
        });
        if (dieValue != 6) {
            if (nextPlay >= totalGamePlayers) {
                nextPlay = 1;
            } else {
                nextPlay++;
            }
        }
        var PlayTD = document.getElementById("PlayTD");
        PlayTD.style.color = "white";
        PlayTD.style.backgroundColor = selectionColors[nextPlay - 1];
        currentHighlightedCell = [];
    }
}

function checkCoinCount(index) {
    var counter = 0;
    var tempArr = ["Red", "Green", "Yellow", "Blue"];
    var tempArr2 = ["Player_1", "Player_2", "Player_3", "Player_4"];
    tempArr.forEach(element => {
        tempArr2.forEach(element2 => {
            if (currentObj[element] && currentObj[element][element2] == index) {
                counter++;
            }
        });
    });
    return counter;
}

function MoveTrack(obj, diesValue) {
    var currentPosition = parseInt(obj.getAttribute("data-index"));
    var type = obj.getAttribute("data-coinType");
    var coinID = obj.getAttribute("data-coinID");
    var cellType = obj.getAttribute("data-cellType");

    if (checkCoinCount(currentPosition) <= 1) {
        obj.innerHTML = "";
        obj.removeAttribute("data-coinType");
        obj.removeAttribute("data-coinID");
    }

    var redTrack = [190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 11,
        32, 53, 74, 95, 116, 137, 158, 179,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        230, 251,
        250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 429,
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210,
        211, 212, 213, 214, 215, 216, 217, 218,
        219
    ];

    var greenTrack = [32, 53, 74, 95, 116, 137, 158, 179,
        01, 202, 203, 204, 205, 206, 207, 208, 209,
        230, 251,
        250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 429,
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189,
        190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10,
        31, 52, 73, 94, 115, 136, 157, 178,
        199
    ];

    var blueTrack = [250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430, 429,
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189,
        190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 11,
        32, 53, 74, 95, 116, 137, 158, 179,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        230,
        229, 228, 227, 226, 225, 224, 223, 222,
        221
    ];

    var yellowTrack = [
        408, 387, 366, 345, 324, 303, 282, 261,
        239, 238, 237, 236, 235, 234, 233, 232, 231,
        210, 189,
        190, 191, 192, 193, 194, 195, 196, 197,
        177, 156, 135, 114, 93, 72, 51, 30, 9,
        10, 11,
        32, 53, 74, 95, 116, 137, 158, 179,
        201, 202, 203, 204, 205, 206, 207, 208, 209,
        230, 251,
        250, 249, 248, 247, 246, 245, 244, 243,
        263, 284, 305, 326, 347, 368, 389, 410, 431,
        430,
        409, 388, 367, 346, 325, 304, 283, 262,
        241
    ];

    if (type.toLocaleLowerCase() == "red") {
        var nextIndex;
        if (cellType == "Home") {
            nextIndex = 190;
        } else {
            var tempIndex = redTrack.indexOf(currentPosition);
            tempIndex += diesValue;
            nextIndex = redTrack[tempIndex];
        }

        var td = document.getElementById("td_" + nextIndex);
        var cellBGC = td.getAttribute("data-cellBGC");
        if (cellBGC && cellBGC.toLocaleLowerCase() == type.toLocaleLowerCase()) {
            td.style.color = "white";
        } else {
            td.style.color = "red";
        }
        var attr = document.createAttribute("data-coinID");
        attr.value = coinID;
        td.setAttributeNode(attr);
        var attr2 = document.createAttribute("data-coinType");
        attr2.value = type;
        td.setAttributeNode(attr2);
        td.innerHTML = "♙";
        td.style.fontStyle = "Bold";
        currentObj["Red"]["Player_" + coinID] = nextIndex;
    } else if (type.toLocaleLowerCase() == "green") {
        var nextIndex;
        if (cellType == "Home") {
            nextIndex = 32;
        } else {
            var tempIndex = greenTrack.indexOf(currentPosition);
            tempIndex += diesValue;
            nextIndex = greenTrack[tempIndex];
        }

        var td = document.getElementById("td_" + nextIndex);
        var cellBGC = td.getAttribute("data-cellBGC");
        if (cellBGC && cellBGC.toLocaleLowerCase() == type.toLocaleLowerCase()) {
            td.style.color = "white";
        } else {
            td.style.color = "Green";
        }
        var attr = document.createAttribute("data-coinID");
        attr.value = coinID;
        td.setAttributeNode(attr);
        var attr2 = document.createAttribute("data-coinType");
        attr2.value = type;
        td.setAttributeNode(attr2);
        td.innerHTML = "♙";
        td.style.fontStyle = "Bold";
        currentObj["Green"]["Player_" + coinID] = nextIndex;
    } else if (type.toLocaleLowerCase() == "yellow") {
        var nextIndex;
        if (cellType == "Home") {
            nextIndex = 408;
        } else {
            var tempIndex = yellowTrack.indexOf(currentPosition);
            tempIndex += diesValue;
            nextIndex = yellowTrack[tempIndex];
        }

        var td = document.getElementById("td_" + nextIndex);
        var cellBGC = td.getAttribute("data-cellBGC");
        if (cellBGC && cellBGC.toLocaleLowerCase() == type.toLocaleLowerCase()) {
            td.style.color = "white";
        } else {
            td.style.color = "Yellow";
        }
        var attr = document.createAttribute("data-coinID");
        attr.value = coinID;
        td.setAttributeNode(attr);
        var attr2 = document.createAttribute("data-coinType");
        attr2.value = type;
        td.setAttributeNode(attr2);
        td.innerHTML = "♙";
        td.style.fontStyle = "Bold";
        currentObj["Yellow"]["Player_" + coinID] = nextIndex;
    } else if (type.toLocaleLowerCase() == "blue") {
        var nextIndex;
        if (cellType == "Home") {
            nextIndex = 250;
        } else {
            var tempIndex = blueTrack.indexOf(currentPosition);
            tempIndex += diesValue;
            nextIndex = blueTrack[tempIndex];
        }

        var td = document.getElementById("td_" + nextIndex);
        var cellBGC = td.getAttribute("data-cellBGC");
        if (cellBGC && cellBGC.toLocaleLowerCase() == type.toLocaleLowerCase()) {
            td.style.color = "white";
        } else {
            td.style.color = "Blue";
        }
        var attr = document.createAttribute("data-coinID");
        attr.value = coinID;
        td.setAttributeNode(attr);
        var attr2 = document.createAttribute("data-coinType");
        attr2.value = type;
        td.setAttributeNode(attr2);
        td.innerHTML = "♙";
        td.style.fontStyle = "Bold";
        currentObj["Blue"]["Player_" + coinID] = nextIndex;
    }

    var PlayTD = document.getElementById("PlayTD");
    PlayTD.onclick = Play;
    PlayTD.style.cursor = "pointer";
    PlayTD.style.color = "white";
    PlayTD.style.backgroundColor = selectionColors[nextPlay - 1];
}
function coinMove(obj, dieValue) {
    MoveTrack(obj, dieValue);
    HighLight("InActive");
    var LudoTFootTd = document.getElementById("LudoTFootTd");
    LudoTFootTd.innerText = "Play next..!";
}

function Main() {
    BindLudoTableBody();
    BindDiesTableBody();
    BindPlayerSelectionTableBody();
}

Main();