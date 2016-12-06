$(document).ready(function() {

	/* nav dropdown menu */
	if ($(window).width() > 768) {
		$('#navbar .nav').removeClass('animated bounceInDown');
		$('ul.nav li.dropdown').hover(function() {
			$(this).find('.dropdown-menu').removeClass('animated flipOutY').addClass('animated rubberBand');
			$(this).addClass('open');
		}, function() {
			$(this).removeClass('open');
		});
	} else {
		$('#navbar .nav').addClass('animated bounceInDown');
	}


	/* remove focus from bootstrap btn */
	$('.btn').focus(function(event) {
		event.target.blur();
	});

	/* remove empty p tag */
	$('p').each(function() {
		var $this = $(this);
		if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
			$this.remove();
	});

	/* remove error image */
	$("img").error(function() {
		$(this).hide();
	});
	
	/* flexslider */
	$('#carousel').flexslider({
		animation : "slide",
		animationLoop : true,
		controlNav : false,
		itemWidth : 320,
		itemMargin : 15
	});

	/* label */
	$('label').on('click', function() {
		$('label').removeClass('checked');
		$(this).addClass('checked');
	});
	
	/* check url for contact page */
	if (/#entrepreneur/.test(self.location.href)) {
		$('#entrepreneur-business-owner').parent().trigger('click');
	} else if (/#manager/.test(self.location.href)) {
		$('#marketing-manager').parent().trigger('click');
	} else if (/#consultant/.test(self.location.href)) {
		$('#agency-consultant').parent().trigger('click');
   	} else {
   		
   	}

	$('#alert-error').hide();
	$('#alert-thx').hide();

});

/* contact form verify */
function verify() {
	/* Reset modal content */
	$('.modal-title').html(null);
	$('.modal-body').html(null);
	/* Check form fields */
	var error = 0;
	var elm = ["name", "email"];
	for (var i = 0; i < elm.length; i++) {
		if (document.getElementById(elm[i]).value.trim() == null || document.getElementById(elm[i]).value.trim() == '' || document.getElementById(elm[i]).value.trim() == '0') {
			//document.getElementById(elm[i]).value = '';
			//document.getElementById(elm[i]).classList.add('error');
			document.getElementById(elm[i]).style.outline = '1px solid #f15858';
			error = 1;
			if (elm[i] == 'msg_type' || elm[i] == 'test') {
				$('#' + elm[i] + '').selectpicker('setStyle', 'btn-danger');
			}
		} else {
			document.getElementById(elm[i]).classList.remove('error');
			//document.getElementById(elm[i]).style.outline = 'none';
			if (elm[i] == 'msg_type' || elm[i] == 'test') {
				$('#' + elm[i] + '').selectpicker('setStyle', 'btn-danger', 'remove');
				$('#' + elm[i] + '').selectpicker('refresh');
			}
		}
		if (elm[i] == 'email') {
			if (document.getElementById('email').value.trim() != '') {
				var emailReg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
				var emailReg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/;
				if (!(!emailReg1.test(document.getElementById('email').value.trim()) && emailReg2.test(document.getElementById('email').value.trim()))) {
					//document.getElementById(elm[i]).value = '';
					//document.getElementById(elm[i]).classList.add('error');
					document.getElementById('email').style.outline = '1px solid #f15858';
					error = 1;
				} else {
					//document.getElementById(elm[i]).classList.remove('error');
					document.getElementById(elm[i]).style.outline = 'none';
				}
			}
		}
	}
	if (error == 0) {
		var data = $('#contact_form').serialize();
		$.ajax({
			type : 'post',
			dataType : 'json',
			data : data,
			url : 'ajax/email.php',
			cache : false,
			async: false,
			success : function(response) {
				if (response.error == 0) {
					document.getElementById('contact_form').reset();
					$('#alert-thx').fadeIn().delay(5000).fadeOut();
                    $('#sidebar').addClass('sidebar-active');
                    setTimeout(function() {
                        $('#sidebar').removeClass('sidebar-active');
                    }, 6000);
				}
			}
		});
		return false;
	} else {
		$('#alert-error').fadeIn().delay(5000).fadeOut();
		$('#sidebar').addClass('sidebar-active');
        setTimeout(function() {
            $('#sidebar').removeClass('sidebar-active');
        }, 6000);
		return false;
	}
}

$(document).on('scroll',function(){

    if($(document).scrollTop()>30){
        $('#header').removeClass('large').addClass('small');
        $('.logo').addClass('small-logo');
        $('#big-title').addClass('main-title');
    } else{
        $('#header').removeClass('small header-border').addClass('large');
        $('.logo').removeClass('small-logo');
        $('#big-title').removeClass('main-title');
    }

    setTimeout(function(){
        if($('#header').hasClass('small')){
            $('#header').addClass('header-border');
        }
    }, 400);

});