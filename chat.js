$( document ).ready()

function hex2rgb(hexcolor){
  	var r = parseInt(hexcolor.substr(1,2),16);
    var g = parseInt(hexcolor.substr(3,2),16);
    var b = parseInt(hexcolor.substr(5,2),16);
  	return [r,g,b]
}

function rgb2hsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }    h /= 6;
  }  
  return [h,s,l];
}

function hex2hsl(hex) {
  return rgb2hsl(...hex2rgb(hex));
}

function hsl2color(h, s, l){ return "hsl(" + parseInt(h*360) + ", " + parseInt(s*100) + "%, " + parseInt(l * 100) + "%)"; }

function getContrastYIQ(hexcolor){
	var [r,g,b] = hex2rgb(hexcolor);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 100) ? 'black' : 'white';
}

function darken(h, s, l, x=0.5, move=0){ return [h+move/360, s, l * x]; }
function lighten(h, s, l, x=0.5, move=0){ return [h+move/360, s, 1-(1-l)* x]; }

// Please use event listeners to run functions.
document.addEventListener('onLoad', function(obj) {
	// obj will be empty for chat widget
	// this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function(obj) {
  $('#log>div:last-child .chat-box').each(function( index ) {
    var hex = $(this).data("background");
    var colorStyle = getContrastYIQ(hex);
    var backgroundStyle = 
        (colorStyle == "white") ? 
        hsl2color(...darken(...hex2hsl(hex), 0.7,20)) :
        hsl2color(...darken(...hex2hsl(hex), 0.95, -12));
    var gradient =
        (colorStyle == "white") ?
        "linear-gradient( to right," + backgroundStyle + "," + hsl2color(...darken(...hex2hsl(hex), 0.85,-5)) + ")" :
        "linear-gradient( to right," + backgroundStyle + "," + hsl2color(...darken(...hex2hsl(hex), 0.9,5)) + ")";
    $(this).css( "background-image" , gradient  ).css( "color" , colorStyle );
  });
  $('#log>div .emote').removeClass('bounce animated');
  $('#log>div:last-child .emote').each(function( index ) {
    $(this).attr('style', $(this).attr('style').replace('1.0','3.0')).addClass('bounce animated');
	});
  $('#log>div.slider').slideDown(200).animate({right:0,opacity:1},500,'easeOutBack');
  setTimeout(function() {
    $('#log>div .chat-box').removeClass('start');
  },200);
});





