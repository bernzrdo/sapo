$(()=>{

    var fakeUsers = [];
    var h1pos = {};

    Array.prototype.random = function(){
        return this[Math.floor(Math.random()*this.length)];
    }

    String.prototype.firstCharUppercase = function(){
        return this.charAt(0).toUpperCase()+this.substr(1);
    }

    $.get('assets/nouns.txt',nouns=>{
    nouns=nouns.split('\n');
    $.get('assets/adjectives.txt',adjectives=>{
    adjectives=adjectives.split('\n');
        $('[message]').each(function(){
            
            if($(this).attr('user').startsWith('fake')){
                if(!fakeUsers[$(this).attr('user').substr(4)]) fakeUsers[$(this).attr('user').substr(4)]={
                    pic:Math.floor(Math.random()*10),
                    username: `${adjectives.random().firstCharUppercase().replace(/[- ]/g,'')}${nouns.random().firstCharUppercase().replace(/[- ]/g,'')}`
                }
                $(this).append(`<img draggable="false" src="assets/user${fakeUsers[$(this).attr('user').substr(4)].pic}.jpg"><span>${fakeUsers[$(this).attr('user').substr(4)].username}</span>`);
            }else{
                $(this).append(`<img src="assets/${$(this).attr('user')}.png"><span>${$(this).attr('user')}</span>`);
            }
            
            if($(this).attr('bot')=='') $(this).append('<span class="bot">BOT</span>');
            
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            $(this).append(`<span class="time">Today at ${hours%12?hours%12:12}:${minutes<10?`0${minutes}`:minutes} ${hours>= 12?'PM':'AM'}</span><br><span>${$(this).attr('message').replace(/{fake[0-9]+}/g,m=>fakeUsers[m.substr(5,m.length-6)].username).replace(/{fake}/g,`${adjectives.random().firstCharUppercase().replace(/[- ]/g,'')}${nouns.random().firstCharUppercase().replace(/[- ]/g,'')}`)}</span>`);

        });
    })});

    $('#content > div > h1').each(function(){
        h1pos[this.textContent] = $(this).offset().top;
        $('#index').append(`<span>${this.textContent}</span><br>`);
    });

    $('#headerSpace').height($('#header').height()+30);
    $('#index').height(innerHeight-$('#header').height()-80);

    $('#toggleSecret').click(function(){
        $('#secret').toggle();
        if($('#secret:visible').length) $(this).text('Clica aqui para esconder os comandos secretos.');
        else $(this).text('Clica aqui para mostrar os comandos secretos.');
    });

    $(document).on('click','video',function(){
        this.currentTime = 0;
        this.play();
    });

    $('#index').on('click','span',function(){
        $('html,body').animate({
            scrollTop: $(`h1:contains(${this.textContent})`).offset().top - $('#header').height() - 50
        },800);
    });

});