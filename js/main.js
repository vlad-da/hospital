/* Устанавливаем стартовый индекс слайда по умолчанию: */
let slideIndex = 1;
/* Вызываем функцию, которая реализована ниже: */
showSlides(slideIndex);

/* Увеличиваем индекс на 1 — показываем следующий слайд: */
function nextSlide() {
    showSlides(slideIndex += 1);
}

/* Уменьшаем индекс на 1 — показываем предыдущий слайд: */
function previousSlide() {
    showSlides(slideIndex -= 1);  
}

/* Устанавливаем текущий слайд: */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Функция перелистывания: */
function showSlides(n) {
    /* Обращаемся к элементам с названием класса "item", то есть к картинкам: */
    let slides = document.getElementsByClassName("item");
    
    /* Проверяем количество слайдов: */
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
    /* Проходим по каждому слайду в цикле for: */
    for (let slide of slides) {
        slide.style.display = "none";
    }
    /* Делаем элемент блочным: */
    slides[slideIndex - 1].style.display = "block";    
}


 /* Отправка на email */

$("#sendMail").on("click", function() {
    let email = $("#email").val().trim();
    let name = $("#name").val().trim();
    let phone = $("#phone").val().trim();
    let message = $("#message").val().trim();

    if(email == "") {
        $("#errorMess").text("Введите email");
        return false;
    } else if(name == "") {
        $("#errorMess").text("Введите имя");
        return false;
    } else if(phone == "") {
        $("#errorMess").text("Введите телефон");
        return false;
    } else if(message.length < 5) {
        $("#errorMess").text("Введите сообщение не менее 5 символов");
        return false;
    }

    $("#errorMess").text("");

    $.ajax({
        url: 'php/mail.php',
        type: 'POST',
        cache: false,
        data: { 'name': name, 'email': email, 'phone': phone, 'message': message },
        dataType: 'html', 
        beforSend: function() {
            $("#sendMail").prop("disabled", true);
        },
        success: function(data) {
            if(!data) {
                alert("Были ошибки, сообщение не отправлено!")
            } else {
                $("#mailForm").trigger("reset");
            }
            $("#sendMail").prop("disabled", false);
        }
    });
});