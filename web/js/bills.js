$("[data-toggle=popover]").popover({
    html: true, 
    content: function() {
      return $('#popover-content').html();
    }
});

function addFunc(event){      
    
    var flag = true;
    var uID    =    document.getElementById("usr1").value;
    var note   =    document.getElementById("nte1").value;
    var amount =    document.getElementById("amnt1").value;
    // var amount1 =    parseInt(document.getElementById("amnt1").value);
    // var split =    parseInt(document.getElementById("split").value);

    if (uID == null || uID == "" || note == null || note == "" || amount == null || amount == "") {
        
        alert("All fields are required");
        flag = false;
    }
    if(flag == true) {
        
        Parse.initialize("s1ySDCya6vuDDvFaxKgEGZLxOvdf8pfG4YMtvjcy", "KGJRCBGgvuyfoiqt8hakSJHODu1BeXtqqGNk0Hnl");


        var AllBills = Parse.Object.extend("AllBills");
        var allBills = new AllBills();
        var CurrentUser = Parse.User.current();
        var CurrentUserId = String(CurrentUser.id);
        
        allBills.set("UserID", uID);
        allBills.set("Note", note);
        allBills.set("Amount", amount);
        allBills.set("Resolved", false);
        allBills.set("PaidBy",CurrentUserId);
        // allBills.set("AmountInt",amount1 / split);

        allBills.save(null, {
            sucess: function(allBills){
                window.location.replace("bills.html");
                alert('worked');
            }, error: function(allBills,error){
                alert("success!");
            }
        });
    }
}

function getData() {
    Parse.initialize("s1ySDCya6vuDDvFaxKgEGZLxOvdf8pfG4YMtvjcy", "KGJRCBGgvuyfoiqt8hakSJHODu1BeXtqqGNk0Hnl");

    var billData = Parse.Object.extend("AllBills");
    var query = new Parse.Query(billData);
    var query1 = new Parse.Query(billData);
    var query2 = new Parse.Query(billData);
    var CurrentUser = Parse.User.current();
    var CurrentUserId = String(CurrentUser.id);
    
    console.log(CurrentUserId);

    query.equalTo("Resolved", false);
    query.notEqualTo("PaidBy",CurrentUserId);
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var oid = String(object.id);
          var oUID = object.get('UserID');
          var oNote = object.get('Note');
          var oAmount = object.get('Amount');
          var oC = String(object.get('createdAt'));
          var oCreated = oC.substr(3,12);
          var table = document.getElementById("tablebody");
          var row = table.insertRow(i);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
            cell1.innerHTML = oUID;
            cell2.innerHTML = oNote;
            cell3.innerHTML = oAmount;
            cell4.innerHTML = oCreated;
            cell5.innerHTML = '<input id="resolveButton" class="btn btn-success" style="padding-top:4px;padding-bottom:4px;"    type="button" value="Resolve" />';  
            document.getElementById("resolveButton").onclick = function() { resolveFunc(oid)}; 
      }}
    });
    
    query2.equalTo("Resolved", false);
    query2.equalTo("PaidBy",CurrentUserId);
    query2.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var oid = String(object.id);
          var oUID = object.get('UserID');
          var oNote = object.get('Note');
          var oAmount = object.get('Amount');
          var oC = String(object.get('createdAt'));
          var oCreated = oC.substr(3,12);
          var table = document.getElementById("tablebody");
          var row = table.insertRow(i);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
            cell1.innerHTML = oUID;
            cell2.innerHTML = oNote;
            cell3.innerHTML = oAmount;
            cell4.innerHTML = oCreated;

      }}
    });

    query1.equalTo("Resolved", true);
    query1.find({
      success: function(results1) {
        for (var i = 0; i < results1.length; i++) {
          var object1 = results1[i];
          var oid1 = String(object1.id);
          var oUID1 = object1.get('UserID');
          var oNote1 = object1.get('Note');
          var oAmount1 = object1.get('Amount');
          var oC1 = String(object1.get('createdAt'));
          var oCreated1 = oC1.substr(3,12);
          var table = document.getElementById("resolvedTable");
          var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = oUID1;
            cell2.innerHTML = oNote1;
            cell3.innerHTML = oAmount1;
            cell4.innerHTML = oCreated1;
        }
      }
    });
    }

    function resolveFunc(oid){
        console.log(oid);
        Parse.initialize("s1ySDCya6vuDDvFaxKgEGZLxOvdf8pfG4YMtvjcy", "KGJRCBGgvuyfoiqt8hakSJHODu1BeXtqqGNk0Hnl");

        var billData = Parse.Object.extend("AllBills");
        var query = new Parse.Query(billData);
        query.get(oid , {
            success: function(results) {
                results.set("Resolved", true);
                results.save(null);
                location.reload();
            }
        });
        
    }
