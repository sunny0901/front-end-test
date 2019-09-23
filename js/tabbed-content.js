function openContent(evt, tabName) {
    let tabcontents = document.getElementsByClassName("tabcontent");
    let tabbuttons = document.getElementsByClassName("tabbutton");

    // reset all the tab invisable
    for (let tabcontent of tabcontents){
        tabcontent.style.display = "none";
    }
    for (let tabbutton of tabbuttons) {
        tabbutton.className = tabbutton.className.replace(" buttonactive", "");
    }

    // show the tab
    document.getElementById(tabName).style.display = "block";
    event.target.className += " buttonactive";
}

//Show the default tag
document.getElementById("default").click();