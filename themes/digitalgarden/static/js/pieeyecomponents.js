window.addEventListener("load", () => {
    Formio.createForm(
        document.getElementById("form"),
        {
            _id: document.querySelector("input[name=uuid]").value,
            title: "Data Subject Request",
            name: document.querySelector("input[name=uuid_name]").value,
            display: "form",
            type: "form",
            components: JSON.parse(document.querySelector("input[name=formConfig]").value),
            settings: {
                recaptcha: {
                    isEnabled: "true",
                    siteKey: document.querySelector("input[name=recaptcha_sitekey]").value,
                },
            },
        },
        {
            disableAlerts: true,
            noAlerts: true,
            language: "en",
            i18n: JSON.parse(document.querySelector("input[name=i18n_data]").value),
        }
    )
        .then((form) => {
            // Prevent the submission from going to the form.io server.
            /*form.nosubmit = true;
            // Triggered when they click the submit button.
            form.on("submit", (submission) => {
                submission.extensions = {
                    XAPIKEY,
                    PIIAIKEY,
                };
                const urlParams = new URLSearchParams(window.location.search);
                const dsrDryRun = urlParams.get('dryRun');
                if (dsrDryRun) {
                    submission['data']['dsrDryRun'] = dsrDryRun;
                }
                submission['data']['email'] = submission['data']['email'].toLowerCase();
                return fetch("https://dsrp-api.dev.pii.ai/r/submit", {
                    body: JSON.stringify(submission),
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": XAPIKEY,
                    },
                    redirect: "follow",
                    method: "POST",
                    mode: "cors",
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        submission.response = responseData;
                        form.emit("submitDone", submission);
                    });
            });
            return form;*/
        })
        .then((form) => {
            window.setLanguage = function (lang) {
                form.language = lang;
            };
            $('.card').css('background-color' , 'transparent');
            return form;
        })
        .then((form) => {
            // What to do when the submit begins.
            /*form.on("submitDone", (submission) => {
                let params = "";
                try {
                    params = `?id=${submission.response.SendMessageResponse.SendMessageResult.MessageId}`;
                } catch (e) {
                }
                window.location = `thanks.html${params}`;
            });
            return form;*/
        });
});

$( document ).ready(function() {
	var config_data = localStorage.getItem('config_data');
	if (config_data != null) {
		var config_data = JSON.parse(config_data);
	} else {
		var config_data = JSON.parse(document.querySelector("input[name=config_data]").value);
	}
	var r = document.querySelector(':root');
	r.style.setProperty('--color-background-primary', config_data.color.backgroundcolor);
	r.style.setProperty('--color-text-primary', config_data.color.fontcolor);
	r.style.setProperty('--font-body', config_data.color.bodyFontFamily);
	r.style.setProperty('--headerBackground', config_data.color.headerBackground);
	r.style.setProperty('--navText', config_data.color.navText);
var config_data = JSON.parse(document.querySelector("input[name=config_data]").value);
$("#logo").attr("src", config_data.contents.logoUrl);
$(".bi-envelope-open").attr("fill", config_data.color.fontcolor);
$('.odd').css('background-color' , 'transparent');
$('.btn').css('background' , config_data.color.navBtnBg);    
$('.btn').css('color' , config_data.color.navBtnTxt); 
$('body>header>a').css('color' , config_data.color.fontcolor); 
if(config_data.contents.hideFooter === true)
{
 $('.footer').hide();
}
if(config_data.contents.hideMenu === true)
{
 $('nav').hide();
}
if(config_data.contents.hideHeader === true)
{
 $('.index').hide();
}
});
