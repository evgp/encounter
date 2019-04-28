$(document).ready(function(){
	var domain = window.location.hostname.split('.').reverse()[2];

	$.get('//creadome.tmweb.ru/encounter/tools/past.php', {domain: domain}, function(data) {
		$('#boxCenterComingGames').parent().prepend(data);
	});

	$.get('//creadome.tmweb.ru/encounter/tools/calendar.php', {domain: domain}, function(data) {
		$('.boxGameInfo:first').before(data);
	});
		
	/* $.ajax({
		url: '//cdn.sendpulse.com/28edd3380a1c17cf65b137fe96516659/js/push/335f7f3211b7acb1c5fc6443df8611a0_0.js',
		dataType: 'script',
		cache: true
	}); */
	
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
