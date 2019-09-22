let fulltext = getText();
//replace useless blank space
fulltext = fulltext.replace(/\s+/g, ' ');

function getText() {
    let fulltext = "";
    let searchtext = document.getElementById("search_text");
    let allpara = searchtext.getElementsByTagName("p");
    for (let para of allpara) {
        let paracopy = para.cloneNode(true);
        let sups = paracopy.getElementsByTagName("sup");
        for (let i = 0; i < sups.length; i++) {
            sups[i].parentNode.removeChild(sups[i]);
            i--;
        }
        fulltext += paracopy.innerText;
    }
    return fulltext;
}

function search(id) {
    //handle searching
    let keyword = document.getElementById(id).value;
    if (keyword == "") {
        alert("Please enter your search text!");
    } else {
        let frequence = 0;
        let fromIndex = 0;
        let index = -1;
        while (index < fulltext.length) {
            index = fulltext.indexOf(keyword, fromIndex);
            if (index != -1) {
                fromIndex = index + keyword.length;
                frequence++;
            }
            else break;
        }
        document.getElementById("resultline").innerText = "Found " + frequence + " occurances of the text \"" + keyword + "\" in the below text.";

        let searchtext = document.getElementById("search_text");
        const text = searchtext.innerHTML;

        let hightlightText = hightlightKeyword(text, keyword);

        searchtext.innerHTML = hightlightText;
    }
}

// press 'enter' key to realize Search
function enterPress(e) { // pass in event
    e = e || window.event;
    if (e.keyCode == 13) {
        // prevent automatic update of the page
        event.returnValue = false;
        document.getElementById("search_button").click();
    }
}