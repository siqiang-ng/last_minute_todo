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

  // Update isChecked when list is clicked
  $("ul").click(function (ev) {
    var target = $(ev.target);
    var isChecked;
    if (target.is("li")) {
      if (target.hasClass("checked")) {
        target.removeClass("checked");
        isChecked = false;
      } else {
        target.addClass("checked");
        isChecked = true;
      }

      var input = target.text().split("\u00D7")[0];

      chrome.storage.sync.get({ todolist: [] }, function (result) {
        var todolist = result.todolist;
        var updatedInd = todolist.findIndex((obj) => obj.todo == input);

        console.log(updatedInd);

        todolist[updatedInd].isChecked = isChecked;
        chrome.storage.sync.set({ todolist: todolist });
      });
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

