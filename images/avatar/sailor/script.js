// Я несу возмездие во имя Луны!
$('img.imgAvat').each(function(){
	var random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

	$(this).attr('src', random + '.jpg');
});