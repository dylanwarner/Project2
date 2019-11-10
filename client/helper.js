const handleError = (message) => {
    $(".alertMsg").text(message);
    $("#errorAlert").animate({width:'toggle'},350);
};

const handleErrorSign = (message) => {
    $(".alertMsgSign").text(message);
    $("#errorAlertSign").animate({width:'toggle'},350);
};

const redirect = (response) => {
    $(".alertMsg").animate({width:'toggle'},350);
    window.location = response.redirect;
};

const redirectSign = (response) => {
    $(".alertMsgSign").animate({width:'toggle'},350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};

const sendAjaxSignUp = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleErrorSign(messageObj.error);
        }
    });
};