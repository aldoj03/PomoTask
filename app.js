"use strict";

window.onload = () => {
  var stetings = {
    Focustime: 0,
    Relaxtime: 0,
    Intervals: 0,
    Longrelaxtime: 0
  };

  var minInitial;
  var focus;
  var relax;
  var intervals;
  var longrelax;
  var seconds;
  var min;
  var status ={ message:  "focus", color: 'green'};
  var play = false;
  var stage = 0;
  var audio = {
    first:  document.querySelector("#audio-1"),
    
    
  }
  var segElement = document.querySelector(".outer-seconds");
  document.getElementById("start").addEventListener("click", () => {
    start();
  });
  document.getElementById("stetings").addEventListener("click", () => {
    showStetingsForm();
  });
  var stageIcons = document.querySelector("#progress ul");
  var submitbutton;

  //* CONFIGURA LAS VARIABLES/
  function init() {
    stageIcons.children[0].style.opacity = 1;
    focus = stetings.Focustime;
    relax = stetings.Relaxtime;
    intervals = stetings.Intervals;
    longrelax = stetings.Longrelaxtime;

    calculateStage();

    seconds = 0;
    play = true;
   
  }

  function endInterval() {
    audio.first.play();
    setStage(stage);

    if(stage <= intervals * 2)
    {
      calculateStage();
    }
    segElement.style.strokeDashoffset = 0;
    seconds = 0;
    play = false;
    show([document.getElementById("start")]);
  }

  function start() {
    init();
    audio.first.pause()
    var tmp = setInterval(() => {
      if (play == true) {
        segElement.style.strokeDashoffset -= 15.7;
        seconds++;
        if (seconds == 60) {
          minInitial--;
          min.innerHTML = minInitial;
          seconds = 0;
        }
        if (minInitial <= 0) {
          if(stage >= intervals * 2){
            clearInterval(tmp);      
          }
          else{
            stage++;
            endInterval();
          }
        }
      } else {
        clearInterval(tmp);
      }
    }, 20);
    hide([
      document.getElementById("stetings"),
      document.getElementById("start")
    ]);
  }

  function renderMin(value) {
    min = document.querySelector(".min");
    min.innerHTML = value;
  }

  //**SHOW STETINGS*/
  function showStetingsForm() {
    submitbutton = document.querySelector("form");

    hide([
      document.getElementById("stetings"),
      document.getElementById("start"),
      document.getElementsByTagName("svg")[0]
    ]);

    show([document.getElementById("form-stetings")]);

    submitbutton.addEventListener("submit", ev => {
      ev.preventDefault();
      if (ev.lenght) {
        show([document.getElementById("start")]);
      }
      setStetings(ev);
    });
  }

  //**SET STETINGS */
  function setStetings(ev) {
    if (
      ev.target[0].value > 0 &&
      ev.target[1].value > 0 &&
      ev.target[2].value > 0 &&
      ev.target[3].value > 0
    ) {
      stetings = {
        Focustime: ev.target[0].value,
        Relaxtime: ev.target[1].value,
        Intervals: ev.target[2].value,
        Longrelaxtime: ev.target[3].value
      };

      renderAllstages(stetings.Intervals);
      init();
      closeForm();
    } else {
      alert("ningun valor puede ser 0 o negativo");
    }

    return false;
  }

  //*CLOSE STETINGS */
  function closeForm() {
    if (focus && relax && intervals && longrelax) {
      show([document.getElementById("start")]);
      hide([document.getElementById("stetings")]);
    } else {
      show([document.getElementById("stetings")]);
    }

    show([document.getElementsByTagName("svg")[0]]);
    hide([document.getElementById("form-stetings")]);
  }

  document.querySelector(".close").addEventListener("click", () => {
    closeForm();
  });

  function setStage(actual) {
    stageIcons.children[actual].style.opacity = 1;
    stageIcons.children[actual].style.display = "flex";
  }

  //*SHOW HIDE */

  function show(element) {
    element.forEach(item => {
      item.style.display = "block";
      setTimeout(() => {
        item.style.opacity = 1;
      }, 200);
    });
  }
  function hide(element) {
    element.forEach(item => {
      item.style.opacity = 0;
      setTimeout(() => {
        item.style.display = "none";
      }, 200);
    });
  }

  //*SHOW MESSAGE */
  function showEstageMessage() {
    var element = document.querySelector("#message");
    element.innerHTML = status.message;
    element.style.background = status.color;
  }

  function renderAllstages(interv) {
    document.querySelector("#progress").style.display = 'flex';
    var progressBar = document.querySelector("#progress ul");

    for (let index = 0; index < interv * 2 + 1; index++) {
      var element = document.createElement("LI");

      if (index % 2 != 0) {
        element.classList.add("relax");
        var content = document.createTextNode("◼");
      }
      if (index % 2 == 0) {
        element.classList.add("focus");
        var content = document.createTextNode("✓");
      }

      if (index == interv * 2) {
        element.classList.add("longrelax");
        var content = document.createTextNode("⊝");
      }
      element.appendChild(content);
      progressBar.appendChild(element);
    }
  }

  function calculateStage() {
    if (stage % 2 == 0 || stage == 0) {
      minInitial = focus;
      status.message = "focus";
      status.color = 'rgb(51, 168, 51)'
    }
    if (stage % 2 != 0) {
      minInitial = relax;
      status.message = "relax";
      status.color = 'rgb(212, 155, 49)'

    }

    if (stage >= intervals * 2) {
      minInitial = longrelax;
      status.message = "long relax";
      status.color = 'rgb(219, 55, 124)';

    }

    renderMin(minInitial);
    showEstageMessage();
  }
};
