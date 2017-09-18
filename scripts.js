$(document).ready(() => {
    $('#close').on('click', function (e) {
        e.stopPropagation();
        if (!$('#search').hasClass("focused")) {
            $('#search').addClass("focused");
            $('#text').prop('disabled', false);
            $('#text').focus();
        } else {
            $('#search').removeClass("focused");
            $('#text').val('');
            $('#text').prop('disabled', true);
            $('#results').html('');
            $('#search-caption').show();
        }
    });

    $('#search-section').submit(function (e) {
        e.preventDefault();
        $('#results').html('');
        $('#search-caption').hide();        
        var keyword = $('#text').val();
        if (keyword === '')
            return;
        if (keyword.indexOf('beautiful girl')!=-1){
            $('#results').append(`<li><a id='sweetie'>
                <h2>The most beautiful girl in the world</h2>
                <p>Heo Lynn (허린), 24, currently living in Korea. Her beautiful nature and appearance have made her ranked No.1 in the world. Being loved dearly and missed sorely by her cute boyfriend, who is currently living in New Zealand.</p></a></li>`);
            $('#sweetie').click(()=>{
                $('#results').append('<div id="photo"><img src="z.jpg"></div>');
            });          
            return;
        }
        var wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${keyword}&format=json`
        $.ajax({
            url: wikiUrl,
            dataType: 'json',
            success: function (json) {
                var arr = json.query.search;
                arr.forEach((item) => {
                    var snippet = item.snippet;
                    var title = item.title;
                    var url = `https://en.wikipedia.org/wiki?curid=${item.pageid}`;
                    $('#results').append(`<li><a target='_blank' href='${url}'>
                    <h2>${title}</h2><p>${snippet}</p></a></li>`)
                });
            },
            error: function () {
                alert("error");
            }
        });

    })
});