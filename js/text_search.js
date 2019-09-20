let fulltext = getText();
fulltext = fulltext.replace(/\s+/g, ' ');
getText();
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
    // delete the highlight of previous searching
    let searchspan = document.getElementsByTagName("p");
    for (let i = 0; i < searchspan.length; i++) {
        let spantext = searchspan[i].innerHTML;
        if (searchspan[i].className == "keyword-match"){
            console.log(searchspan[i].innerHTML)
            searchspan[i].innerHTML = spantext.replace(new RegExp("<[^>]+>", "g"), '');
            console.log(searchspan[i].innerHTML)
        }
    }

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

function hightlightKeyword(input, keyword) {
    let store = {
        length: 0
    };

    try {
        return input
            .replace(/^\s+/, ' ') // replace additional blank space

            // replace html tag, and use placeholder for reverting later
            .replace(/(<\w+[^>]*?>)|(<\/\w+[^>]*?>)/g, function (match) {
                var key = '\t' + store.length++; // use placeholder \t

                store[key] = match;
                return key;
            })

            // highlight keyword 
            // $1 means match the first reg expression represented by ()
            .replace(new RegExp('(' + keyword + ')', 'g'), '<span class="keyword-match">' + '$1' + '</span>')

            // return to html tag
            .replace(/\t\d+/g, function (match) {
                return store[match] || '';
            });
    } catch (e) {
        return input;
    }
}