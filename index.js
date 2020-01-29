const request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

let images = [];
request('https://vogue.globo.com/moda/gente/noticia/2016/08/segundo-estudo-cientifico-estas-sao-10-mulheres-mais-lindas-do-mundo.html', function(err, res, body){
	if(!err && res.statusCode == 200){
        //console.log(res)
        //console.log(cheerio.load(body))
		const $ = cheerio.load(body);
		$('image', 'div.protected-content').each(function(){
		const img = $(this).attr('data-src');
		images.push('http://'+img.slice(2, img.length));

		})
		console.log(images);
		for (let i = 0; i < images.length; i++){
			request(images[i]).pipe(fs.createWriteStream('images/beautiful_girls' + i + '.jpg'));
		}
	}
});
