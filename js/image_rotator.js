// the default slide
var slideIndex = 0;
var timer;
showSlides();

// when click the previous/next button, pass the displacement: 1/-1
function plusSlides(moveIndex) {
    showSlides(moveIndex);
}

// when click the dot below the rotator, pass the displacement
function currentSlide(dotIndex) {
    // displacement = the index of the dot solected - the index of the current shown slide
    showSlides(dotIndex - slideIndex);
}

// receive the dispacement(default: 0) of the index
function showSlides(moveIndex = 0) {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");

    // clear the timer
    clearTimeout(timer);

    // reset all slides to be invisible
    for (let slide of slides) {
        slide.style.display = "none";
    }
    // reset all dots to be unactive
    for (let dot of dots) {
        dot.className = dot.className.replace(" dotactive", "")
    }

    // automatic slide
    if (moveIndex == 0) {
        slideIndex++;
    } 
    // previous/next/dot button selected
    else {
        slideIndex += moveIndex;
    }

    // keep slideindex in the range
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex == 0) slideIndex = slides.length;

    // show the slide and corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " dotactive";

    // set timer
    timer = setTimeout("showSlides(0)", 3000);
}