;(function ($, Formio) {

    function _formHandler(form) {
      // Prevent the submission from going to the form.io server.
      form.nosubmit = true;
      // check for id. if it exists then populate it in the dsr feild.
      var urlParams = new URLSearchParams(window.location.search);
      var id = urlParams.get('id');
      if (id) {
        form.getComponent('dsrid').setValue(id);
      }
      const XAPIKEY = 'J8s1iLFZCS4bQeJB8U5On7li4b4usbXLaCAlAFuI';
      const PIIAIKEY = 'eyJ0eXBlIjoiSldUIiwia2lkIjoiVWdNVk1uSUhBRGVqYVRPUEhaa3VzZ0YwMXFfVkNZbW95eGtld2l1Nml5USIsImFsZyI6IlJTMjU2In0.eyJ0ZW5hbnQiOiIxIiwid29ya3NwYWNlIjoiOTZlNTRkMGMtOGMxNS00ODdiLWJmODEtYTVkMjkwZmM0YjdjIiwiaXNzIjoiaHR0cHM6Ly9hcHAuZGV2LnBpaS5haS9wdWJsaWMvMSIsImF1ZCI6Imh0dHBzOi8vZHNycC1hcGkuZGV2LnBpaS5haSIsInN1YiI6ImRhM2U4OTc3LWI2ZjAtNGM5OC05ZjExLTQzMTU0OWY4Yjc2MyIsImp0aSI6IllPVXY2eFhXd0tKeXdhYTN2T0dfVkEiLCJpYXQiOjE2NDY5MTc4OTN9.CwV8YRikOjLylLp1Gc55FtN4PNYJEWWKrMsmQZFAjfHbf6rALcyGUKSr6iCxzXcR7Y5teLrAG2v5mbAft5N9PIO8z9UJgbOaepN8zowUWznxeehx9e0kI3l_xrEC2nauPQ6mqQcGO8b8XGEHW3pG-d_HzNLp8s602TOTeMB97xj84V8z9Oo6de7-l5iETlDy-SaiobPAKMHdkbKpkMaUZC1cfUdY9jRs23YLqZ_JRJV8sXOpB9LO1uU2ixXQuUz54FQVtiuoicTZIUig9Y9Vtc7AKUhM9g6U8IQM55DJrSI_8W0FEMljThrNRFBiyLlnLutzpYcf0EAtIfvqgoJsjw';
      const dsrpId = 'da3e8977-b6f0-4c98-9f11-431549f8b763';
      // Triggered when they click the submit button.
      form.on("submit", (submission) => {
        var url = 'https://dsrp-api.dev.pii.ai/p/' + dsrpId + '/dsr/' + submission.data.dsrid;
        var fetchOptions = {
          method: 'POST',
          headers: {
            "x-api-key": XAPIKEY,
            "Authorization": "Bearer " + PIIAIKEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "email": submission.data.email.toLowerCase()
          })
        };
  
        fetch(url, fetchOptions)
            .then(function (response) {
              return response.json();
          })
          .then(function(resultJSON) {
              document.getElementById('resultstatus').style.display = "block";
              document.getElementById('form').style.display = "none";
  
              if (resultJSON.status === "In Progress") {
                document.getElementById('resultstatus').innerText = resultJSON.status;
                document.getElementById('resultstatus').style.color = "green";
                document.getElementById("statusicon").style.display = "none";
                document.getElementById("resultname").innerText = "Status";
              } else if (resultJSON.status === "Verification pending") {
                document.getElementById('resultstatus').style.color = "orange";
                document.getElementById('resultstatus').innerText = resultJSON.status;
                document.getElementById("statusicon").style.color = "orange";
              } else if (resultJSON.status === "Identity Verified") {
                document.getElementById('resultstatus').innerText = resultJSON.status;
                document.getElementById('resultstatus').style.color = "green";
                document.getElementById("statusicon").classList.add("fa-check-square");
                document.getElementById("statusicon").style.color = "green";
              } else if (resultJSON.status === "Rejected") {
                window.location = "../status-detail-page?id=" + submission.data.dsrid;
              } else if (resultJSON.status === "Completed") {
                window.location = "../status-detail-page?id=" + submission.data.dsrid;
                localStorage.setItem(submission.data.dsrid, JSON.stringify(resultJSON.data))
              } else {
                document.getElementById('resultstatus').style.color = "red";
                document.getElementById('resultstatus').innerText = resultJSON.message;
                document.getElementById("statusicon").classList.add("fa-times-circle");
                document.getElementById("statusicon").style.color = "red";
              }
              form.currentForm.emit('submitDone')
            }).catch(function (error) {
          document.getElementById('resultstatus').style.display = "block";
          document.getElementById('resultstatus').style.color = "red";
          document.getElementById('resultstatus').innerText = error.message;
          document.getElementById("statusicon").classList.add("fa-times-circle");
          document.getElementById("statusicon").style.color = "red";
          form.submission = {}
        });
      });
      return form;
    }
  
    function _createForm() {
      const elForm = document.querySelector('#form');
      const formJSON = {
        _id: document.querySelector("input[name=uuid]").value,
        title: "Data Subject Request",
        name: document.querySelector("input[name=uuid_name]").value,
        display: "form",
        type: "form",
        components: [
          {
            autofocus: false,
            input: true,
            tableView: true,
            inputType: "text",
            inputMask: "",
            label: "DSR ID",
            key: "dsrid",
            placeholder: "",
            prefix: "",
            suffix: "",
            multiple: false,
            defaultValue: "",
            protected: false,
            unique: false,
            persistent: true,
            hidden: false,
            clearOnHide: true,
            spellcheck: true,
            validate: {
              required: true,
              minLength: "",
              maxLength: "",
              pattern: "",
              custom: "",
              customPrivate: false
            },
            conditional: {
              show: "",
              when: null,
              eq: ""
            },
            type: "textfield",
            $$hashKey: "object:411",
            labelPosition: "top",
            inputFormat: "plain",
            tags: [],
            properties: {}
          },
          {
            autofocus: false,
            input: true,
            tableView: true,
            inputType: "text",
            inputMask: "",
            label: "Email address",
            key: "email",
            placeholder: "",
            prefix: "",
            suffix: "",
            multiple: false,
            defaultValue: "",
            protected: false,
            unique: false,
            persistent: true,
            hidden: false,
            clearOnHide: true,
            spellcheck: true,
            validate: {
              required: true,
              minLength: "",
              maxLength: "",
              pattern: "",
              custom: "valid = input?(input.indexOf('@')>-1&&input.indexOf('.')>-1)?true:'Enter Valid Email Address':'';",
              customPrivate: false
            },
            conditional: {
              show: "",
              when: null,
              eq: ""
            },
            type: "textfield",
            $$hashKey: "object:551",
            labelPosition: "top",
            inputFormat: "plain",
            tags: [],
            properties: {},
            customError: "",
            description: "We'll never share your email address with anyone else."
          },
          {
            type: "button",
            theme: "primary",
            disableOnInvalid: false,
            action: "submit",
            block: false,
            rightIcon: "",
            leftIcon: "",
            size: "md",
            key: "submit",
            tableView: false,
            label: "Submit",
            input: true,
            $$hashKey: "object:22",
            autofocus: false,
            tags: [],
            conditional: {
              show: "",
              when: null,
              eq: ""
            },
            properties: {},
            isNew: false
          }
        ],
        settings: {
          recaptcha: {
            isEnabled: "true",
            siteKey: document.querySelector("input[name=recaptcha_sitekey]").value,
          },
        },
      }
      const formSetting = {
        disableAlerts: true,
        noAlerts: true,
      }
      Formio.createForm(elForm, formJSON, formSetting).then(_formHandler)
    }
  
    function _init() {
      _createForm();
    }
  
    $(_init);
  })(jQuery, Formio);
  