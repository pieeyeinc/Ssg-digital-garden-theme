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
  
      // Triggered when they click the submit button.
     /* form.on("submit", (submission) => {
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
                window.location = "dsrrejection.html?id=" + submission.data.dsrid;
              } else if (resultJSON.status === "Completed") {
                window.location = "dsrreport.html?id=" + submission.data.dsrid;
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
      }); */
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
  