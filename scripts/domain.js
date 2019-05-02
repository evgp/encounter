$(document).ready(function(){
	var stars = $('img[src*=en_logo]:eq(0)').attr('src').match(/en_logo(\d+)/)[1];

	$('header .stars').animate({width: (stars * 30) + 'px'}, 2500);

	$('header').mousemove(function(e){
		$(this).css({backgroundPosition: e.pageX * 100 / $('header').width() + '% 0'});
	});

	$('#tdContentLeft, #tdContentRight').wrapInner('<div class="js-sticky"></div>');

	var userLink = $('a[href="/UserDetails.aspx"]:first'),
		userName = userLink.text(),
		userID = userLink.next('span').text();

	console.log(userID);

	if (userName) $('#DivBottomDesign').append('<div class="hare">Какие планы на вечер,<br>' + userName + '?</div>');
	else userName = 'этот человек';

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