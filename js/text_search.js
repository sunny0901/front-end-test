// 1. get all the text
let fulltext = getText();
// replace useless blank space
fulltext = fulltext.replace(/\s+/g, ' ');

function getText() {
    let fulltext = "";
    let searchtext = document.getElementById("search_text");
    let allpara = searchtext.getElementsByTagName("p");
    for (let para of allpara) {
        // deep copy <p> element
        let paracopy = para.cloneNode(true);
        // get all the <sup> element in the <p>
        let sups = paracopy.getElementsByTagName("sup");
        for (let i = 0; i < sups.length; i++) {
            // delete <sup> element from <p>
            sups[i].parentNode.removeChild(sups[i]);
            i--;
        }
        fulltext += paracopy.innerText;
    }
    return fulltext;
}

// 2. handle searching
function search(id) {
    // get the keyword the user enterd in the input textinput
    let keyword = document.getElementById(id).value;
    if (keyword == "") {
        // handle the situation when user click search button without input
        alert("Please enter your search text!");
    } else {
        let frequence = 0;
        let fromIndex = 0;
        // mark the place that has been scanned
        let index = -1;
        while (index < fulltext.length) {
            index = fulltext.indexOf(keyword, fromIndex);
            // find the keyword
            if (index != -1) {
                fromIndex = index + keyword.length;
                frequence++;
            }
            else break;
        }
        document.getElementById("resultline").innerText = "Found " + frequence + " occurances of the text \"" + keyword + "\" in the below text.";

    }
}

// press 'enter' key to realize Search
function enterPress(e) { // pass in event
    e = e || window.event;
    // keyCode of Enter = 13
    if (e.keyCode == 13) {
        // prevent automatic update of the page
        event.returnValue = false;
        document.getElementById("search_button").click();
    }
}