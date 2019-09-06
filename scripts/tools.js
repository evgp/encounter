$(document).ready(function(){
	var domain = window.location.hostname.split('.').reverse()[2];

	$.get('//en.creado.me/tools/past.php', {domain: domain}, function(data) {
		$('#boxCenterComingGames').prepend(data);
	});

	$.get('//en.creado.me/tools/calendar.php', {domain: domain}, function(data) {
		$('#boxUser').append(data);
	});

	$.ajax({
		url: '//yastatic.net/share2/share.js',
		dataType: 'script',
		cache: true
	}).done(function() {
		var i = 0;

		$('a#lnkGameTitle').each(function(){
			var link = $(this);

			$(this).closest('table').after('<div class="share">' +
				'<h2>Расскажи друзьям!</h2>' +

				'<div id="share-' + i + '"></div>'
			);

			Ya.share2('share-' + i, {
				content: {
					url: 'http://' + domain + '.en.cx' + link.attr('href'),
					title: link.text(),
					image: 'http://cdn.endata.cx/images/v2/en/promo/encounter.png'
				},

				theme: {
					services: 'vkontakte,facebook,twitter,viber,whatsapp,telegram'
				}
			});

			i++;
		});
	});
});
