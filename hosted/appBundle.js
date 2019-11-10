"use strict";

var handleNote = function handleNote(e) {
  e.preventDefault();
  $("#errorAlert").animate({
    width: 'hide'
  }, 350);

  if ($("#noteTitle").val() == '' || $("#note").val() == '') {
    handleError("All fields are required.");
    return false;
  }

  sendAjax('POST', $("#noteForm").attr("action"), $("#noteForm").serialize(), function () {
    loadNotesFromServer();
  });
  return false;
};

var NoteForm = function NoteForm(props) {
  return React.createElement("form", {
    id: "noteForm",
    onSubmit: handleNote,
    name: "noteForm",
    action: "/maker",
    method: "POST",
    className: "noteForm"
  }, React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), React.createElement("input", {
    id: "noteTitle",
    type: "text",
    name: "title",
    placeholder: "Title"
  }), React.createElement("label", {
    htmlFor: "note"
  }, "Note: "), React.createElement("input", {
    id: "note",
    type: "text",
    name: "note",
    placeholder: "Note"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    className: "makeNoteSubmit",
    type: "submit",
    value: "+"
  }));
};

var NoteList = function NoteList(props) {
  if (props.notes.length === 0) {
    return React.createElement("div", {
      className: "noteList"
    }, React.createElement("h3", {
      className: "emptyNote"
    }, "No notes yet."));
  }

  var noteNodes = props.notes.map(function (note) {
    return React.createElement("div", {
      key: note._id,
      className: "note"
    }, React.createElement("h3", {
      className: "noteTitle"
    }, " ", note.title, " "), React.createElement("p", {
      className: "noteNote"
    }, " ", note.note, " "));
  });
  return React.createElement("div", {
    className: "noteList"
  }, noteNodes);
};

var loadNotesFromServer = function loadNotesFromServer() {
  sendAjax('GET', '/getNotes', null, function (data) {
    ReactDOM.render(React.createElement(NoteList, {
      notes: data.notes
    }), document.querySelector("#notes"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(NoteForm, {
    csrf: csrf
  }), document.querySelector("#makeNote"));
  ReactDOM.render(React.createElement(NoteList, {
    notes: []
  }), document.querySelector("#notes"));
  loadNotesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

var handleError = function handleError(message) {
  $(".alertMsg").text(message);
  $("#errorAlert").animate({
    width: 'toggle'
  }, 350);
};

var handleErrorSign = function handleErrorSign(message) {
  $(".alertMsgSign").text(message);
  $("#errorAlertSign").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $(".alertMsg").animate({
    width: 'toggle'
  }, 350);
  window.location = response.redirect;
};

var redirectSign = function redirectSign(response) {
  $(".alertMsgSign").animate({
    width: 'toggle'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var sendAjaxSignUp = function sendAjaxSignUp(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      handleErrorSign(messageObj.error);
    }
  });
};