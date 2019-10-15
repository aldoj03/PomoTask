"use strict";

window.onload = () => {
    document.getElementById("abort").disabled = true;
    document.getElementById("abort").style.display = "none";
  var stetings;
  var ini;
  let flag;
  var min;
  var play = false;
  var seg = document.querySelector(".outer-seconds");
  document.getElementById("start").addEventListener("click", () => {
    start();
  });
  document.getElementById("abort").addEventListener("click", () => {
      abort();
    });
    document.getElementById("stetings").addEventListener("click", () => {
        showStetingsForm();
    });
    var submitbutton;
  function init() {
    
    ini = (stetings.Focustime != 'undefined') ? stetings.Focustime :  25;
    flag = 0;
    renderMin(ini);
    play = true;
  }

  function abort() {
    renderMin(0);
    seg.style.strokeDashoffset = 0;
    flag = 0;
    play = false;
    document.getElementById("stetings").disabled = false;
    document.getElementById("stetings").style.display = "block";
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.display = "block";
  }

  function start() {
    init();
    var tmp = setInterval(() => {
      if (play == true) {
        console.log(flag);
        seg.style.strokeDashoffset -= 15.7;
        flag++;
        if (flag == 60) {
          ini--;
          min.innerHTML = ini;
          flag = 0;
        }
        if (ini <= 0) {
          abort();
        }
      } else {
        clearInterval(tmp);
      }
    }, 1000);
    document.getElementById("stetings").disabled = true;
    document.getElementById("stetings").style.display = "none";
    document.getElementById("start").disabled = true;
    document.getElementById("start").style.display = "none";
  }

  function renderMin(value) {
    min = document.querySelector(".min");
    min.innerHTML = value;
  }

  function showStetingsForm() {
      submitbutton  = document.querySelector("form"); 
     console.log(submitbutton);
     
    document.getElementById("start").disabled = true;
    document.getElementById("abort").disabled = true;
    document.getElementById("stetings").disabled = true;
    document.getElementById("start").style.display = "none";
    document.getElementById("abort").style.display = "none";
    document.getElementById("stetings").style.display = "none";
    document.getElementsByTagName("svg")[0].style.display = "none";
    var form = document.getElementById("form-stetings");
    form.style.opacity = 1;
  
    submitbutton.addEventListener("submit",(ev)=>{
      setStetings(ev);
    })

}
    function setStetings(ev) {
        stetings = {
             Focustime: ev.target[0].value,
             Relaxtime:  ev.target[1].value,
             Intervals:  ev.target[2].value,
             Longrelaxtime:  ev.target[3].value
        };

        document.getElementById("start").disabled = false;
        document.getElementById("abort").disabled = false;
        document.getElementById("stetings").disabled = false;
        document.getElementById("start").style.display = "block";
        document.getElementById("abort").style.display = "block";
        document.getElementById("stetings").style.display = "block";
        document.getElementsByTagName("svg")[0].style.display = "block";
        var form = document.getElementById("form-stetings");
        form.style.opacity = 0;
        return stetings;
    }
    
    document.getElementById("close").addEventListener("click", ()=>{
        document.getElementById("start").disabled = false;
        document.getElementById("abort").disabled = false;
        document.getElementById("stetings").disabled = false;
        document.getElementById("start").style.display = "block";
        document.getElementById("abort").style.display = "block";
        document.getElementById("stetings").style.display = "block";
        document.getElementsByTagName("svg")[0].style.display = "block";
        var form = document.getElementById("form-stetings");
        form.style.opacity = 0;
    })
  
};
