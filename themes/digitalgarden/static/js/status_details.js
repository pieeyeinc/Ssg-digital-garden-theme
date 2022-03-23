(function($){

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const tableHeaderKeyMap = [
      {
          'label': 'First Name',
          'key': 'firstname'
      },
      {
          'label': 'Last Name',
          'key': 'lastName'
      }
  ];
  const requesterKeyMap = [
      {
          'label': 'Guest Customer',
          'key': 'guestCustomer'
      },
      {
          'label': 'Registered Customer',
          'key': 'registeredCustomer'
      },
      {
          'label': 'Marketing Recipient',
          'key': 'marketingRecipient'
      },
      {
          'label': 'Customer',
          'key': 'customer'
      },
      {
          'label': 'Employee',
          'key': 'employee'
      },
      {
          'label': 'Job Applicant',
          'key': 'jobApplicant'
      },
      {
          'label': 'Marketing Recipient',
          'key': 'marketingRecipient'
      },
      {
          'label': 'Authorized Agent',
          'key': 'authorizedAgent'
      }
  ];

  if (id != null) {
      document.title += ":" + id;
      document.getElementById('dsrId').setAttribute("data-value", id);
      document.getElementById('dsrId').innerHTML = '<div class="row"><div class="col-4 font-weight-bold">Request number:</div><div class="col-sm capitalize">' +id + '</div></div>';
  }
  dsrId = document.getElementById('dsrId').getAttribute("data-value");
  data = JSON.parse(document.querySelector("input[name=status_details_data]").value)
  if(data == null) {
      window.location = "status.html?id="+id
  }

  /*
  // Disabled the following DOM traversing code because their related DOM elements were removed from the template.
  document.getElementById('portal').innerText = data.companyName
  document.getElementById('totalDataSources').innerText = data.dataSources.totalDataSources
  document.getElementById('totalMatches').innerText = data.dataSources.totalMatches*/

  try {
      document.getElementById('requestType').innerText = data.requestType
  } catch (e) {
      console.error("Error! while processing the request-type. ", e);
  }

  try {
      const requesterMap = requesterKeyMap.find(item => item.key === data.requestor)
      if(requesterMap) {
          document.getElementById('requestor').innerText = requesterMap.label
      } else {
          document.getElementById('requestor').innerText = data.requestor
      }
  } catch (e) {
      console.error("Error! while processing the requestor. ", e);
  }

  try {
      document.getElementById('firstName').innerText = data.firstName
  } catch (e) {
      console.error("Error! while processing the firstName. ", e);
  }

  try {
      document.getElementById('lastName').innerText = data.lastName
  } catch (e) {
      console.error("Error! while processing the lastName. ", e);
  }

  try {
      document.getElementById('email').innerText = data.email
  } catch (e) {
      console.error("Error! while processing the email. ", e);
  }

  try {
      document.getElementById('received').innerText = new Date(data.received).toUTCString()
  } catch (e) {
      console.error("Error! while processing the receiving date. ", e);
  }

  localStorage.removeItem(id);

  // New Code added to show matched records table..
  function _noRecordFound() {
      $("#requestBody").append(`<div class="row">
          <div class="col-md-12">No Records Found</div>
      </div>`);
  }

  function _prepareMatchRecordsTable(records) {
      if(!records || !records.length) {
          _noRecordFound();
          return;
      }

      const $RecordsTable = $(`<table class="records-table display" style="width:100%">
          <thead>
              <tr>
              </tr>
          </thead>
          <tbody></tbody>
      </table>`);

      // support n number of header-items
      const headers = Object.keys(records[0]);
      const $tableHeaders = headers.map(key => {
          const oMap = tableHeaderKeyMap.find(item => item.key.toLowerCase() === key.toLowerCase());
          let header = key;
          if(oMap && oMap.label) {
              header = oMap.label;
          }

          return `<th>${header}</th>`
      });
      const $tableContent = records.map((recordItem, i) => `<tr>${headers.map(headerItem => {
          const findKey = Object.keys(recordItem).find(key => key.toLowerCase() === headerItem.toLowerCase())
          return `<td>${findKey ? (recordItem[findKey] || 'NA') : 'NA'}</td>`
      })}</tr>`);

      $RecordsTable.find('thead tr').append($tableHeaders);
      $RecordsTable.find('tbody').append($tableContent);


      const $newRowContainer = $(`<div class="row">
                  <div class="col-md-12" id="records">
                  <div style="overflow:auto;">
                    ${$RecordsTable.prop('outerHTML')}
                  </div>
                  </div>
                </div>`);

      $("#requestBody").append($newRowContainer);
      $('#records table').DataTable({
          paging: false,
          scrollY: 200,
          scrollX: true,
          scroller: {
              loadingIndicator: true
          },
          scrollCollapse: true,
          searching: false
      }).columns.adjust();
  }

  function _init() {
      const allowed = ['access'];
      try {
          if(data && allowed.find(function(keyword) { return data.requestType.toLowerCase().indexOf(keyword)>-1;})) {
              //Records will appear only when data.requestType value contain access keyword
              _prepareMatchRecordsTable(data.dataSource.matchedRecords)
          }
      } catch (e) {
          console.error("Error while preparing records table. ", e);
      }
  }

  $(_init);

})(jQuery);