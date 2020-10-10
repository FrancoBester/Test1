    
test()

function test(){
    console.log(document)
    var element = document.getElementById("lang_skils")
    console.log(element)
    var text = element.innerHTML;
    var new_text = 
    '<div class="bar_position" style="--top_position: 11rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p>C# - 9/10</p>'+
        '<div id="bar_border" style="--percent: 90%"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 16rem;--right_position:19rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p >SQL - 8/10</p>'+
        '<div id="bar_border" style="--percent: 80%"><div class="bar_fill"></div></div> '+
    '</div>'+

    '<div class="bar_position" style="--top_position: 16rem;--right_position:4rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p>Python - 8/10</p>'+
        '<div id="bar_border" style="--percent: 80%" ><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:22rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> JavaScript - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> C++ - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:0rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> Java - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 28rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> Delphi - 6/10</p>'+
        '<div id="bar_border" style="--percent: 60%"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 33rem;--right_position:19rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> HTML - 5/10</p>'+
        '<div id="bar_border" style="--percent: 50%"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 33rem;--right_position:4rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> CSS - 5/10</p>'+
        '<div id="bar_border" style="--percent: 50%"><div class="bar_fill"></div></div>'+
    '</div>'

    element.innerHTML = text + new_text
}