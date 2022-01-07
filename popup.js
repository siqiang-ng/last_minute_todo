$(function () {
  // Adding the close button to each listed item
  $("li").each(function () {
    $(this).append(`<span class='close'>\u00D7</span>`);
  });

  // Give the close features
  $(".close").click(function () {
    $(this).parent().css("display", "none");
  });

  // Add a "checked" symbol when clicking on a list item
  $("ul").click(function (ev) {
    var target = $(ev.target);
    if (target.is("li")) {
      if (target.hasClass("checked")) {
        target.removeClass("checked");
      } else {
        target.addClass("checked");
      }
    }
  });

// // When user enters, new list item is created
// document.querySelector('#myInput').addEventListener('keydown', function (e) {
//   if (e.keyCode === 13) {
//     console.log('enter');
//     var li = document.createElement("li");
//     var inputValue = document.getElementById("myInput").value;
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     if (inputValue === '') {
//         alert("You must write something!");
//     } else {
//         document.getElementById("myUL").appendChild(li);
//     }
//     document.getElementById("myInput").value = "";

//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);

//     for (i = 0; i < close.length; i++) {
//         close[i].onclick = function() {
//             var div = this.parentElement;
//             div.style.display = "none";
//         }
//     }
//   }
// });
