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

  $("#myInput").keypress(function (ev) {
    var keycode = ev.keyCode ? ev.keyCode : ev.which;
    if (keycode == "13") {
      var input = $("#myInput").val();
      if (input === "") {
        alert("You must write something!");
      } else {
        $("#myUL").append(`<li>${input}<span class='close'>\u00D7</span></li>`);
        var value = $("#myUL").val();
        chrome.storage.sync.set({list: value}, function() {
          console.log('Value is set to ' + list);
        });
      }

      // Give the close features
      $(".close").click(function () {
        $(this).parent().css("display", "none");
      });

      // Empty the input
      $("#myInput").val("");
    }
  });
});

