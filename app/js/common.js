$(document).ready(function() {

    //Menu
    $('#menu-btn').click(function(){
        $('.menu').toggleClass("active");

    });


    // OWL CAROUSEL
    $('.carousel-1').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items: 4,
        navSpeed: 1000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },


            768:{
                items:2,
            },

            1000:{
                items:3,
            },

            1200:{
                items:4,
            }
        }
    });
    $('.carousel-2').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items: 4,
        navSpeed: 1000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },


            768:{
                items:2,
            },

            1000:{
                items:3,
            },

            1200:{
                items:4,
            }
        }
    });
    $('.carousel-3').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items: 3,
        navSpeed: 1000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },


            768:{
                items:2,
            },


            1200:{
                items:3,
            }
        }
    });
    $('.carousel-4').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items: 3,
        navSpeed: 1000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },


            768:{
                items:2,
            },


            1200:{
                items:3,
            }
        }
    });

    $('input#name, input#email, input#number, input#text').unbind().blur(function() {
        // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
        var id = $(this).attr('id');
        var val = $(this).val();
        // После того, как поле потеряло фокус, перебираем значения id, совпадающее с id данного поля
        switch (id) {
            // Проверка поля "Имя"
            case 'text':
                var rv_name = /^[a-zA-Zа-яА-Я0-9]+$/;
                // используем регулярное выражение
                // Eсли длина имени больше 2ух символов, оно не пустое и удовлетворяет рег. выражению,
                // то добавляем этому полю класс .not_error,
                // и ниже в контейнер для ошибок выводим слово "Принято", т.е. валидация для этого поля пройдена успешно
                if (val.length > 0 && val != '' && rv_name.test(val)) {
                    $(this).addClass('not_error');
                }// Иначе, мы удаляем класс not-error, и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
                // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации
                else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;
            // Проверка поля "Имя"
            case 'name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                // используем регулярное выражение
                // Eсли длина имени больше 2ух символов, оно не пустое и удовлетворяет рег. выражению,
                // то добавляем этому полю класс .not_error,
                // и ниже в контейнер для ошибок выводим слово "Принято", т.е. валидация для этого поля пройдена успешно
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).addClass('not_error');
                }// Иначе, мы удаляем класс not-error, и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
                // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации
                else {
                    $(this).removeClass('not_error').addClass('error');

                }
                break;
            // Проверка email
            case 'email':
                var rv_emailfor = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_emailfor.test(val)) {
                    $(this).addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;
            // Проверка поля "Сообщение"
            case 'number':
                var rv_telephone = /^\d[\d\(\)\ -]{4,18}\d$/;
                if (val != '' && rv_telephone.test(val)) {
                    $(this).addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;
        }
        // end switch(...)
    });
    // end blur()
    // Теперь отправим наше письмо с помощью AJAX
    $('form#contactform').submit(function(e) {
        // Запрещаем стандартное поведение для кнопки submit
        e.preventDefault();
        // После того, как мы нажали кнопку "Отправить", делаем проверку,
        // если кол-во полей с классов .not_error равно 3(так как у нас всего 3 поля), то есть все поля заполнены верно,
        // выполняем наш Ajax сценарий и отправляем письмо адресату
        if ($('.not_error').length == 4) {
            // Eще одним моментов является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
            // и вызываем метод .serialize().
            // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.
            $.ajax({
                url: 'send.php',
                type: 'post',
                data: $(this).serialize(),
                beforeSend: function(xhr, textStatus) {
                    $('form#contactform :input').attr('disabled', 'disabled');
                    $('.formachka').fadeOut();
                    $('.sucksess').delay(400).fadeIn();
                    setInterval(function() {
                        $('.sucksess>img').fadeIn(500).fadeOut(500);
                    }, 500);
                },
                success: function(response) {
                    $('form#contactform :input').removeAttr('disabled');
                    $('form#contactform :text, textarea').val('').removeClass().next('.error-box').text('');
                    $('.sucksess').fadeOut();
                    $('.formachka').delay(1000).fadeIn();
                }
            });
             //end ajax({...})
        } else {
            return false;
        }
        // Иначе, если количество полей с данным классом не равно значению 3 мы возвращаем false,
        // останавливая отправку сообщения в невалидной форме
    });
    // end submit()


    //Map effect canvas
    particlesJS('particles-js',
        {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#fff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 1,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#9b8758",
                    "opacity": 1,
                    "width": 2
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }
    );
});


