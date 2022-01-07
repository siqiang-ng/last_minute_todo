$(function () {
  // Initial function to run every time popup is opened
  chrome.storage.sync.get({ todolist: [] }, function (result) {
    var todolist = [];
    if (!jQuery.isEmptyObject(result.todolist)) {
      todolist = result.todolist;
    }

    jQuery.each(todolist, (index, element) => {
      var input = element.todo;
      var isChecked = element.isChecked;
      var listTag = isChecked ? "<li class='checked'>" : "<li>";

      $("#taskUL").append(
        `${listTag}${input}<span class='close'>\u00D7</span></li>`
      );
    });

    // Give the close features
    $(".close").click(function () {
      var input = $(this).parent().text();
      $(this).parent().remove();

      chrome.storage.sync.get({ todolist: [] }, (result) => {
        var todolist = result.todolist;
        input = input.split("\u00D7")[0];
        var updatedInd = todolist.findIndex((obj) => obj.todo == input);
        todolist.splice(updatedInd, 1);
        chrome.storage.sync.set({ todolist: todolist });
      });
    });
  });

  // Update isChecked in storage every time item is clicked
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

  // Add new item when an input is there and click enter
  $("#taskInput").keypress(function (ev) {
    var keycode = ev.keyCode ? ev.keyCode : ev.which;
    if (keycode == "13") {
      var input = $("#taskInput").val();
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

        $("#taskUL").append(`<li>${input}<span class='close'>\u00D7</span></li>`);
      }

      // Give the close features
      $(".close").click(function () {
        var input = $(this).parent().text();
        $(this).parent().remove();

        chrome.storage.sync.get({ todolist: [] }, function (result) {
          var todolist = result.todolist;
          input = input.split("\u00D7")[0];
          var updatedInd = todolist.findIndex((obj) => obj.todo == input);
          todolist.splice(updatedInd, 1);
          chrome.storage.sync.set({ todolist: todolist });
        });
      });

      // Empty the input
      $("#taskInput").val("");
    }
  });
});

$(function () {
  $("#taskUL").sortable({
    update: function (event, ui) {
      var updatedList = [];
      $("li").each(function () {
        var todo = $(this).text().split("\u00D7")[0];
        var isChecked = false;
        if ($(this).hasClass("checked")) {
          isChecked = true;
        }
        updatedList.push({
          todo: todo,
          isChecked: isChecked,
        });
      });
      chrome.storage.sync.set({ todolist: updatedList });
    },
  });
});
