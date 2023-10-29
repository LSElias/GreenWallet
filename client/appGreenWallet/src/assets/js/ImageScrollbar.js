const track = document.getElementById("image-track");
let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let esMovil = regexp.test(details);

if (esMovil) {
  console.log("es movil");
} else {
  console.log("no es movil");
}

if (track != null) {
  if(!esMovil){
  document.body.style.overflowY = "hidden";
  document.body.style.overflowX = "hidden";
  }
  const handleOnDown = (e) => {
    if (!esMovil) {
      if((window.innerWidth>1024)){
      track.dataset.mouseDownAt = e.clientX;
      console.log;
    }
    }
  };
  const handleOnUp = () => {
    if (!esMovil) {
      if((window.innerWidth>1024)){

      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;

      const x = window.innerWidth / 2,
        y = window.innerHeight / 1.25;
      var bg = document.getElementById("background");
      var elem = document.elementFromPoint(x, y);
      if (elem) {
        if (elem.classList.contains("image")) {
          changeInfo(elem.id);
          var url = elem.getAttribute("src");
          bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.9)), url(${url})`;
        }
      }
    }
  }
  };

  function changeInfo(id) {
    var text = document.getElementById("changeable");
    switch (id) {
      case "Papel":
        text.innerHTML = id;
        break;
      case "Plástico":
        text.innerHTML = id;
        break;
      case "Vidrio":
        text.innerHTML = id;
        break;
      case "Fibras Textil":        
        text.innerHTML = id;
        break;
    }
  }

  const handleOnMove = (e) => {
    
    if (track.dataset.mouseDownAt === "0") return;
      if (!esMovil || window.innerWidth>"1024px"){

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      track.dataset.percentage = nextPercentage;
      if (nextPercentage != NaN) {
        track.animate(
          {
            transform: `translate(${nextPercentage}%, -50%)`,
          },
          { duration: 1200, fill: "forwards" }
        );

        for (const image of track.getElementsByClassName("image")) {
          image.animate(
            {
              objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: "forwards" }
          );
        }
      }
    }
  };

  /* Elemento en el medio de la screen */

  /* -- Had to add extra lines for touch events -- */

  window.onmousedown = (e) => handleOnDown(e);

  window.ontouchstart = (e) => handleOnDown(e.touches[0]);

  window.onmouseup = (e) => handleOnUp(e);

  window.ontouchend = (e) => handleOnUp(e.touches[0]);

  window.onmousemove = (e) => handleOnMove(e);

  window.ontouchmove = (e) => handleOnMove(e.touches[0]);
} else {
  document.body.style.overflowY = "scroll";
}

function overflow() {
  document.body.style.overflowY = "scroll";
}

function imgFocus(id,name) {
  var bg = document.getElementById("background");
  var elem = document.getElementById(id);
  var url = elem.getAttribute("src");
  bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.9)), url(${url})`;
  var text = document.getElementById("changeable");
  text.innerHTML = id;
  document.getElementById("showmore").href = `/materiales/${name}`;
}
