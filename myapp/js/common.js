$(function() {
    function go() {
        $('.stages-slider__num.active').removeClass('active').next().addClass('active') .closest('.stages-slider').find('.stages-slider__item.active').removeClass('active').next().addClass('active');
      }
      let interval;
      let intervalTime = 1500;
      let delayTime = 1500;
      let stopTimeout;
      let startTimeout;
      
      function start() {
        interval = setInterval(go, 1500);
      
        startTimeout = setTimeout(stop, delayTime + intervalTime);
        if ($('.stages-slider__num.active').next().length == 0) {
            $('.stages-slider__item').removeClass('active');
            $('.stages-slider__num').first().addClass('active');
            $('.stages-slider__item').first().addClass('active');
        }
        clearTimeout(stopTimeout);
      }
      
      function stop() {
        clearInterval(interval);
      
        stopTimeout = setTimeout(start, delayTime - intervalTime);
        clearTimeout(startTimeout);
      }
      
      start();
 
      $('.stages-slider__num span').click(function(){
        $(this).parent().addClass('active').siblings().removeClass('active');
        $(this).parent().parent().parent().find('.stages-slider__item').removeClass('active').eq($(this).parent().index()).addClass('active');
      });

    //   .results
    $('.results__more').on('click', function(e){
        e.preventDefault();
        $(this).addClass('btn--hidden').parent().next().addClass('active');
    });
    $('.btn--up').on('click', function(e){
        e.preventDefault();
        // console.log($(this).parent().parent().removeClass('active').prev().find('.btn--hidden').removeClass('btn--hidden'));
        $(this).parent().parent().removeClass('active').prev().find('.btn--hidden').removeClass('btn--hidden');
    });


    // parallax
    var elem = $('.action'),
    pos = elem.offset(),
    elem_left = pos.left,
    elem_top = pos.top,
    elem_width = elem.width(),
    elem_height = elem.height(),
    x_center,
    y_center;


    $('.action').mousemove(function(e){

    x_center = ( elem_width / 2 ) - ( e.pageX - elem_left );
    y_center = ( elem_height / 2 ) - ( e.pageY - elem_top );

    $('.parallax').each(function(){

        var speed = $(this).attr('data-speed'),
            xPos = Math.round(-1*x_center/20*speed),
            yPos = Math.round(y_center/20*speed);

        if (yPos < 0)
        yPos = -2*speed;
    
        $(this).css('transform', 'translate3d('+xPos+'px, '+yPos+'px, 0px)');

        });

    });


















    //select-number form
    if(jQuery('.phone-mask').length) {
        jQuery(function($){
            $(".phone-mask").mask("+38(999) 999-9999");
        });
    }
   
    //kviz
    if(jQuery('.kviz').length) {
        $('.qa-next').click(function(e){
            e.preventDefault();
            if ($(this).parent().parent().prev().hasClass('question__ans--radio')) {
                if($(this).parent().prev().find('input:checked').length) {
                    $(this).parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
                } else  {
                    $(this).parent().find('.kviz__error').text('Выберите вариант ответа!');
                }
            } else {
                if ($(this).parent().parent().prev().find('.input--text').val() != ''){
                    $(this).parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
                } else {
                    $(this).parent().find('.kviz__error').text('Введите ответ!');
                }
            }

            if($('.step-slide--finish').hasClass('active')){
                $('.kviz-sidebar').addClass('disabled');
                $('.kviz-sidebar-finish').removeClass('disabled');
            }
        });
        // for radiobuttons
            $('input[type="radio"]+.pick-item__label').on('click', function(){
                if ($(this).prev().hasClass('step1-2')) {
                    $('#second-question').html('Какой конкретно товар вы хотите продать?');
                    $('#step2').attr('placeholder', 'Ваш товар');
                } else if ($(this).prev().hasClass('step1-3')) {
                    $('#second-question').html('Какой информационный продукт  вы хотите реализовать?');
                    $('#step2').attr('placeholder', 'Ваш продукт');
                }
                delayRadio($(this));
                if($('.step-slide--finish').hasClass('step-slide--active')){
                    $('.kviz-sidebar').addClass('disabled');
                    $('.kviz-sidebar-finish').removeClass('disabled');
                }
            });
            function delayRadio(item) {
                setTimeout( function () {
                    item.parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
                }, 500 );
            };

        $(".qa-last").click(function() {
            $('.kviz-sidebar').addClass('disabled');
            $('.kviz-sidebar-finish').removeClass('disabled');
        });
    }
    $('.step-slide3 .pick-item__label')
        .mouseenter(function() {
            $(this).parent().addClass('active').prevAll().addClass('active');
        })
        .mouseleave(function(){
            $(this).parent().removeClass('active').prevAll().removeClass('active');
        })
        .click(function(){
            $(this).parent().addClass('active').prevAll().addClass('active');
        });


        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        }

        $('form').find('input.utm_source').each(function() {
            var a = getQueryVariable('utm_source');
            if(a){
                $(this).val(a);
            }
        }); 
        $('form').find('input.utm_medium').each(function() {
            var a = getQueryVariable('utm_medium');
            if(a){
                $(this).val(a);
            }
        });
        $('form').find('input.utm_campaign').each(function() {
            var a = getQueryVariable('utm_campaign');
            if(a){
                $(this).val(a);
            }
        });
        $('form').find('input.utm_term').each(function() {
            var a = getQueryVariable('utm_term');
            if(a){
                $(this).val(a);
            }
        });
        $('form').find('input.utm_content').each(function() {
            var a = getQueryVariable('utm_content');
            if(a){
                $(this).val(a);
            }
        });

    //popup
    if(jQuery('.modal__wrap').length) {
        let modalWrap = $('.modal__wrap');
        
        //popup
        $(".modal-open").click(function (e){
          e.preventDefault();
          var btn = $(this);
            $($(this).parent().parent()).each(function () {
                var form = $(this);
                form.find('.rfield').addClass('empty_field');

                   // Функция проверки полей формы

                    form.find('.rfield').each(function(){
                    if($(this).val() != ''){
                        // Если поле не пустое удаляем класс-указание
                    $(this).removeClass('empty_field');

                    if (!form.find('.empty_field').length) {
                        var numModal = btn.attr('href');
                        var modal =  $(numModal);
                        modalWrap.removeClass('fadeOutUp');
                        modalWrap.addClass('fadeInDown');
                        modal.removeClass('disabled');
                        modal.addClass('flex');
                        $('body').addClass('body-modal-open');
                        // body.addClass('body-modal');
                        }
                    } else {
                        // Если поле пустое добавляем класс-указание
                    $(this).addClass('empty_field');
                    }
                    });

                


            })
            
          
        });
      
        $('.modal-close').click(function (){
          modalWrap.removeClass('fadeInDown');
          modalWrap.addClass('fadeOutUp');
          setTimeout(function() {
              $('.modal').addClass('disabled');
            }, 700);
          setTimeout(function() {
              $('.modal').removeClass('flex');
              $('body').removeClass('body-modal-open');
            }, 800);  
      
        });
        $('.modal').mouseup(function (e){ // событие клика по веб-документу
          var div = $(".modal__body"); // тут указываем ID элемента
          var close = $('.modal-close');
          if (close.is(e.target)) {
      
          } else if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
              var modalWrap = $('.modal__wrap');
              modalWrap.removeClass('fadeInDown');
              modalWrap.addClass('fadeOutUp');
              setTimeout(function() {
                  $('.modal').addClass('disabled');
              }, 700);
              setTimeout(function() {
                  $('.modal').removeClass('flex');
                  $('body').removeClass('body-modal-open');
              }, 800); 
            
          }
        });
    }
    //scrollto
    
    if(jQuery('.scroll-to').length) {
        var $page = $('html, body');
        $('.scroll-to[href*="#"]').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
            return false;
        });
    }
    //mob slider
    if ( window.innerWidth < 821 || window.screen.width < 821) {
        $('.stations__arrow').on('click', function(){
            $(this).parent().parent().parent().parent().toggleClass('active');
            // .siblings().children().removeClass('active');
            $(this).next().toggleClass('active');
        });
    }

    //click on form submit button - AMO
    $('.kviz__btn').on('click', function(){
        $($(this).parent().parent()).each(function () {
            var form = $(this);
            form.find('.rfield').addClass('empty_field');

                // Функция проверки полей формы

                form.find('.rfield').each(function(){
                if($(this).val() != ''){
                    // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');

                if (!form.find('.empty_field').length) {
                console.log('form');
                form = $('.quizForm');
                jQuery.ajax({
                    method: "POST",
                    data: form.serialize(),
                    // url: quizAjax.url,
                    url: '../sendamo.php',
                    dataType: "json",
                    success: function (json) {
                        // if (json.success) {
                            // jQuery(".wizard-section").fadeOut(100);
                            window.location.href = "/quiz-thanks/";
                        // }
                    }
                });
                $('.btn-finish a').attr('href', "#").removeClass('modal-open').removeClass('kviz__btn').css('pointer-events', 'none');
                $('.btn-finish').css('opacity', '0.5').css('pointer-events', 'none');
                }
                // fbq('track', 'Lead');

                } else {}
                });
        })
    });
    $('.phone').on('click', function(){
        fbq('track', 'Contact');
    });

});