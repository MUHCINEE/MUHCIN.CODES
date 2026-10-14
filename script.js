(function(){
  "use strict";
  var d=document, b=d.body, burger=d.querySelector(".burger"), nav=d.getElementById("nav");
  b.classList.add("js");
  function setMenu(o){b.classList.toggle("menu-open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Fermer le menu":"Ouvrir le menu")}
  burger.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
  nav.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
  d.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  var els=d.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add("in")});
  var y=d.getElementById("year");if(y)y.textContent=new Date().getFullYear();
})();