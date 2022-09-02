document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnId").addEventListener("click", clockwise);

  function clockwise() {
    var textBox = document.querySelector(".text");
    var boxWidth = document.body.clientWidth / 2;
    if (textBox.getAttribute("side") == "topLeft") {
      textBox.style.cssText = "left: 450px;";
      textBox.setAttribute("side", "topRight");
    } else if (textBox.getAttribute("side") == "topRight") {
      textBox.style.cssText =
        "left: 450px; top: 450px; transition:top 5s cubic-bezier(0, 0, 1, 1) ";
      textBox.setAttribute("side", "bottomRight");
    } else if (textBox.getAttribute("side") == "bottomRight") {
      textBox.style.cssText = "left: 0px; top: 450px; ";
      textBox.setAttribute("side", "bottomLeft");
    } else if (textBox.getAttribute("side") == "bottomLeft") {
      textBox.style.cssText =
        "left: 0px; top: 100px; transition:top 5s cubic-bezier(0, 0, 1, 1) ";
      textBox.setAttribute("side", "topLeft");
    }

    // console.log(boxWidth);

    //   console.log(textBox);
  }
});
