/* global document */


var li = document.getElementsByClassName("link"),
    i,
    z;





/////////////////////////// active link ///////////////////////////


for (i = 0; i < li.length; i++) {


    li[i].onclick = function () {

        for (z = 0; z < li.length; z++) {
            li[z].classList.remove("active");
        }


        this.classList.add("active");


    }





}


///////////////////////////////////////////////



var btn = document.getElementById('whats');


window.onscroll = function () {

    if (scrollY > 700) {

        btn.removeAttribute('class', 'hidden');


    } else {

        btn.setAttribute('class', 'hidden');
    }

}

//
//btn.onclick = function () {
//
//    scrollTo(0, 0);
//}
