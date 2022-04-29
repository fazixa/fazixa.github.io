document.body.addEventListener("mousemove", evt => {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;

    window_width = window.innerWidth
    window_heigth = window.innerHeight

    var cor_x = mouseX;
    var cor_y = mouseY;


    if (window_width >= 992) {
      if (cor_y < window_heigth * 0.1 + 325) {
        cor_y = window_heigth * 0.1 + 325
      }

      if (cor_y > window_heigth * 0.9 - 325) {
        cor_y = window_heigth * 0.9 - 325
      }
    }
    else{
      if (cor_y < window_heigth * 0.1 + 160) {
        cor_y = window_heigth * 0.1 + 160
      }

      if (cor_y > window_heigth * 0.9 - 160) {
        cor_y = window_heigth * 0.9 - 160
      }

    }


    gsap.set(".cursor2", {
      x: mouseX,
      y: mouseY
    });


    gsap.to(".shape", {


      x: mouseX,
      y: cor_y,
      stagger: -0.1
    });




    const $hoverables = document.querySelectorAll('.hoverable');




    for (let i = 0; i < $hoverables.length; i++) {
      $hoverables[i].addEventListener('mouseenter', onMouseHover);
      // $hoverables[i].addEventListener('onmouseover', onMouseHover);
      $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }







  }




);






function onMouseHover(e) {
  console.log("in");
  document.getElementById("cr").style.width = "35px";
  document.getElementById("cr").style.height = "35px";
  document.getElementById("cr").style.border = "15px solid #2128bd";
  document.getElementById("cr").style.background = "white";



}

function onMouseHoverOut(e) {
  console.log("out");
  document.getElementById("cr").style.width = "20px";
  document.getElementById("cr").style.height = "20px";
  document.getElementById("cr").style.border = "none";
  document.getElementById("cr").style.background = "#2128bd";

}




window.onload = function () {



  var nonHoverable = document.getElementById("noneHoverable");

  nonHoverable.addEventListener('mouseover', function (event) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    document.getElementById("cr").style.width = "0px";


  });

  nonHoverable.addEventListener('mouseleave', function (event) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    document.getElementById("cr").style.width = "20px";


  });

}



var subCatContainer = $(".scroller");

subCatContainer.scroll(function () {
  subCatContainer.scrollTop($(this).scrollTop());
});