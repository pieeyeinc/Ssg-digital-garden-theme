window.addEventListener('message', function (e) {
// Get the sent data
const data = e.data;
ele_update(data);

function ele_update(data)
{
if(data != ""){
$('#config_data').val(data);
var config_data = JSON.parse(document.querySelector("input[name=config_data]").value);
alert("hiii");
var css = 'h1 { background: red; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

// $('body').css('background-color' , config_data.color.backgroundcolor);
// $('body').css('font-family' , config_data.font.bodyFontFamily);
// $('body').css('color' , config_data.color.fontcolor);
// $('#nav-border').css('background-color' , config_data.color.headerBackground);    
// $('#nav').css('color' , config_data.color.navText);
// $('#footer').css('background-color' , config_data.color.footerBackground);
// $('#footer > div').css('color' , config_data.color.footerText);
// $("#logo").attr("src", config_data.contents.logoUrl);
// $("#footer > div").append(config_data.contents.footerText);
// $(".bi-envelope-open").attr("fill", config_data.color.fontcolor);
// $('.odd').css('background-color' , 'transparent');     
// if(config_data.contents.hideFooter === true)
// {
//  $('#footer').hide();
// }
// if(config_data.contents.hideMenu === true)
// {
//  $('#nav-border').hide();
// }
// if(config_data.contents.hideHeader === true)
// {
//  $('#home-jumbotron').hide();
// }
}
}
});
