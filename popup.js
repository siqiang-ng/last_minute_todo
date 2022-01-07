$(function () {
  chrome.storage.sync.get({ todolist: [] }, function (result) {
    var todolist = [];
    if (!jQuery.isEmptyObject(result.todolist)) {
      todolist = result.todolist;
    }

    jQuery.each(todolist, (index, element) => {
      var input = element.todo;
      var isChecked = element.isChecked;
      var listTag = isChecked ? "<li class='checked'>" : "<li>";

      $("#myUL").append(
        `${listTag}${input}<span class='close'>\u00D7</span></li>`
      );

      // Give the close features
      $(".close").click(function () {
        $(this).parent().css("display", "none");
      });
    });
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
        chrome.storage.sync.get({ todolist: [] }, function (result) {
          var newItem = {
            todo: input,
            isChecked: false,
          };
          var newList = [...result.todolist, newItem];

          chrome.storage.sync.set({ todolist: newList });
        });

        $("#myUL").append(`<li>${input}<span class='close'>\u00D7</span></li>`);
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
