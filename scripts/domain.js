$(document).ready(function(){
	var stars = $('img[src*=en_logo]:eq(0)').attr('src').match(/en_logo(\d+)/)[1];

	$('header .stars').animate({width: (stars * 30) + 'px'}, 2500);

	$('header').mousemove(function(e){
		$(this).css({backgroundPosition: e.pageX * 100 / $('header').width() + '% 0'});
	});

	$('#tdContentLeft, #tdContentRight').wrapInner('<div class="js-sticky"></div>');

	var sticky = $('.js-sticky'),
		before = 0;

	$(window).on('scroll resize', function() {
		var top = sticky.offset().top,
			height = sticky.outerHeight(),

			scroll = $(window).scrollTop(),
			viewport = $(window).height();

		if (height > viewport) {
			if (before > scroll) {
				if (scroll <= top) sticky.attr('style', 'position: fixed;');
				else sticky.attr('style', 'top:' + top + 'px;');
			} else {
				if (top + height > scroll + viewport) sticky.attr('style', 'top:' + top + 'px;');
				else sticky.attr('style', 'position: fixed; bottom: 0;');
			}
		} else {
			sticky.attr('style', 'position: fixed;');
		}

		before = scroll;
	}).scroll();


	var userLink = $('a[href="/UserDetails.aspx"]:first'),
		userName = userLink.text();

	if (userName) $('#DivBottomDesign').append('<div class="hare">Какие планы на вечер,<br>' + userName + '?</div>');
	else userName = 'этот человек';

	document.cookie = 'user=' + (userLink ? userLink.next('span').text() : false) + '; path=/';

	var right = $('#DivRightDesign');

	if (right.length) {
		$.getScript('https://vk.com/js/api/openapi.js', function(){
			right.prepend('<div id="vk-group"></div>');

			VK.Widgets.Group('vk-group', {mode: 0, width: 198, height: 350, color1: '062400', color2: '0f0', color3: '0f0'}, 2422347);
		});
	}

	var phone = $('#EnTabContainer1_content_ctl00_panelLineContacts_contactsBlock_lblMobilePhoneVal');
	phone.wrapInner('<a href="tel:' + phone.text() + '"></a>');

	$.getScript('//creadome.tmweb.ru/encounter/statistics.php');

	// forum

	$('tr.forumRow').has('a[href="/Guestbook.aspx?section=8077"]').addClass('siberia');

	var tags = document.getElementsByTagName('*');

	for (i = 0, s = tags.length; i < s; i++) {
		if (tags[i].tagName != 'script') {
			for (j = 0, s_ = tags[i].childNodes.length; j < s_; j++) {
				if (tags[i].childNodes[j].nodeType == 3) {
					tags[i].childNodes[j].textContent = tags[i].childNodes[j].textContent.replace(/%username%/g, userName);
				}
			}
		}
	}
});