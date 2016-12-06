$(document).ready(function() {

	/* nav dropdown menu */
	if ($(window).width() > 768) {
		$('#navbar .nav').removeClass('animated bounceInDown');
		$('ul.nav li.dropdown').hover(function() {
			//$(this).find('.dropdown-menu').stop(true, true).fadeIn();
			//$(this).find('.dropdown-menu').stop(true, true).slideDown();
			$(this).find('.dropdown-menu').removeClass('animated flipOutY').addClass('animated rubberBand');
			$(this).addClass('open');
		}, function() {
			//$(this).find('.dropdown-menu').stop(true, true).fadeOut();
			//$(this).find('.dropdown-menu').stop(true, true).slideUp();
			//$(this).find('.dropdown-menu').removeClass('animated flipInY').addClass('animated flipOutY');
			$(this).removeClass('open');
		});
	} else {
		$('#navbar .nav').addClass('animated bounceInDown');
	}

	/* affix the navbar after scroll below header */
	$('#header').affix({
		offset : {
			top : $('#header').outerHeight() / 3
		}
	});

	$('#sidebar').affix({
		offset: {
			top: 100
		}
	});

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

	/* window scroll */
	// $fn.scrollSpeed(step, speed, easing);
	//jQuery.scrollSpeed(100, 600);
	/*var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	var isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
	if ( isMacLike == false || isIOS == false ) {
		jQuery.scrollSpeed(100, 600);
	}*/
	
	/* flexslider */
	$('#carousel').flexslider({
		animation : "slide",
		animationLoop : true,
		controlNav : false,
		itemWidth : 320,
		itemMargin : 15
	});

	/* contact form */
	$('#submit').click(function(event) {
		event.stopPropagation();
		event.preventDefault();
		$('#contact_form').submit();
	});
	
	$(function() {
		var myDropzone = new Dropzone(".dropzone", {
			uploadMultiple: false,
			maxFilesize: 5,
			maxFiles: 1
			//addRemoveLinks : true,
        	//acceptedFiles : "application/pdf",
		});
		myDropzone.on("success", function( file, response ) {
    		obj = JSON.parse( response );
    		$('#file_path').val( obj.file );
		});
	});
	
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
			document.getElementById(elm[i]).style.outline = '1px solid red';
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
		if (elm[i] == 'email_address') {
			if (document.getElementById('email_address').value.trim() != '') {
				var emailReg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
				var emailReg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/;
				if (!(!emailReg1.test(document.getElementById('email_address').value.trim()) && emailReg2.test(document.getElementById('email_address').value.trim()))) {
					//document.getElementById(elm[i]).value = '';
					//document.getElementById(elm[i]).classList.add('error');
					document.getElementById('email').style.outline = '1px solid red';
					error = 1;
				} else {
					//document.getElementById(elm[i]).classList.remove('error');
					document.getElementById(elm[i]).style.outline = 'none';
				}
			}
		}
	}
	if (error == 0) {
		//this.form.submit();
		//document.getElementById('#contact_form').submit();
		var data = $('#contact_form').serialize();
		console.log(data);
		$.ajax({
			type : 'post',
			dataType : 'json',
			data : data,
			url : 'ajax/email.php',
			cache : false,
			async: false,
			//processData: false,
			//contentType: false,
			success : function(response) {
				if (response.error == 0) {
					$('.flip-container').toggleClass('hover');
				}
			}
		});
		return false;
	} else {
		//alert('All fields are requested!');
		$('.modal-title').html('Error!');
		$('.modal-body').html('* Please fill in the required fields.');
		$('#myModal').modal('show');
		return false;
	}
}