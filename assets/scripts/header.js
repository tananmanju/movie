(function(){ 

    console.log("activelink") 
    let header = document.getElementsByTagName("header")[0];
    console.log(header);
    let btns = header.getElementsByClassName("navbar__list");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click",  (event) => {
            console.log(event);
            event.preventDefault();
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
})();

