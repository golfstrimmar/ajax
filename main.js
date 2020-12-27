// =======================================
$(document).ready(function () {
  $(".content").slideUp(1);

  $("#show").on("click", function () {
    $(this).toggleClass("act");

    if ($(this).hasClass("act")) {
       $(".content").slideDown(200);
    } else {
$(".content").slideUp(200);
     
    }
  });
});

// =======================================
// ==================МЕТОД GET=============
// получение моего ip адреса. его знает сервер. у него и спрашиваем
window.onload = () =>
  // по клику на кнопку вызывается метод ajaxGet
  (document.querySelector("#show_ip").onclick = () => {
    ajaxGet();
  });

// сам метод
function ajaxGet() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    // просто вывод в консоль стадии обработки запроса
    console.log(request.readyState);

    if (request.readyState == 4 && request.status == 200) {
      document.querySelector("#myip").innerHTML = request.responseText;
    }
  };
  request.open("GET", "ip.php");
  request.send();

  // =======================================
  // =======================================
  // ==============metod post=========================
  // =======================================

  // забираем данные с полей формы
  var inp_email = document.querySelector("input[name=email]");
  var inp_phone = document.querySelector("input[name=phone]");
  var inp_name = document.querySelector("input[name=name]");

  document.querySelector("#send").onclick = () => {
    //  "&";разделение ввода данных полей
    var params =
      "email=" +
      inp_email.value +
      "&" +
      "phone=" +
      inp_phone.value +
      "&" +
      "name=" +
      inp_name.value;

    // собственно вызов функции с параметрами равными значениями соответствующих полей
    ajaxPost(params);
  };
}

//  ------------------------------
function ajaxPost(params) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    //проверка  Если всё произошло корректно и получен ответ от сервера
    if (request.readyState == 4 && request.status == 200) {
      if (request.responseText == 1) {
        // //  в случае успеха выведет сообщение
        document.querySelector("#result").innerHTML =
          "Отправка формы успешная!";
        // // и скрыть форму
        document.querySelector("form").style.display = "none";
      } else {
        //   // если запрос прошел неудачно  то выведет сообщение сервера
        document.querySelector("#result").innerHTML = request.responseText;
      }
    }
  };

  // здесь открываются запрос
  request.open("POST", "form.php");

  // эту строку включать обязательно
  // он обязательно должен находиться после open перед send
  //   // это указание для сервера Как обрабатывать пришедшие запрос
  //   // иначе сервер проигнорирует данные отправленные методом Post
  // или данные будут повреждены
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // здесь происходит запрос
  //при методе пост параметры передаются обязательно здесь
  request.send(params);
}

// ----------------форма на jquery №2------------------------
$(document).ready(function () {
  $("#btn").click(function () {
    sendAjaxForm("result_form", "ajax_form", "action_ajax_form.php");
    return false;
  });
});

function sendAjaxForm(result_form, ajax_form, url) {
  jQuery.ajax({
    url: url, //url страницы (action_ajax_form.php)
    type: "POST", //метод отправки
    dataType: "html", //формат данных
    data: jQuery("#" + ajax_form).serialize(), // Сеарилизуем объект
    success: function (response) {
      //Данные отправлены успешно
      result = jQuery.parseJSON(response);
      document.getElementById(result_form).innerHTML =
        "Имя: " + result.name + "<br>Телефон: " + result.phonenumber;
    },
    error: function (response) {
      // Данные не отправлены
      document.getElementById(result_form).innerHTML =
        "Ошибка. Данные не отправленны.";
    },
  });
}

// -----------форма на джейквери номер три---------------------------
$(function () {
  $("#form-boot").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
      beforeSend: function () {
        $(".submit").css("color", "transparent");
        $(".submit").addClass(
          "progress-bar progress-bar-striped progress-bar-animated bg-warning"
        );
        $(".gif").fadeIn();
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $(".err").slideDown();
      },
      success: function () {
        $(".submit").css("color", "#333");
        $(".submit").removeClass(
          "progress-bar progress-bar-striped progress-bar-animated bg-warning"
        );
        $(".alrt").fadeIn();
        setTimeout(function () {
          // Done Functions
          th.trigger("reset");
        }, 1000);
      },
    });
    return false;
  });
});