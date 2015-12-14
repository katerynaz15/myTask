window.onload = function() {
    
    var http = new XMLHttpRequest();
    var url = "jobs.json";
    http.open("GET", url, true);
    http.send();
    
    var myTable = document.createElement("table");
    document.body.appendChild(myTable);
    
    http.onload = function() {
        var myObject = JSON.parse(this.responseText);
        
        var myEvent = document.getElementById("myForm");
        myEvent.onsubmit = function() {
            console.log(this);
            var inputValue = this[0].value;
            this[0].value = "";
            console.log(inputValue);
            
            var myArray = myObject.filter(function (el) {return el.url==inputValue}); //pick the data only reletated to the web site we entered
            console.log(myArray);
            
            myTable.innerHTML = "";
            for(var i=0; i<myArray.length; i++) {
                var myTr = document.createElement("tr");
                myTable.appendChild(myTr);
                for(var j in myArray[i]) {
                    if(j=="job_ID" || j=="name") {
                        var myTd = document.createElement("td");
                        myTr.appendChild(myTd);
                        myTd.innerHTML = myArray[i][j];
                    }
                }
                var myTd2 = document.createElement("td");
                myTr.appendChild(myTd2);
                var newInput = document.createElement("input");
                myTd2.appendChild(newInput);
                newInput.setAttribute("type", "button");
                newInput.setAttribute("value", "Check the Status");
                
                newInput.onclick = function() {
                    console.log(this);
                    alert(myArray[this.parentNode.parentNode.rowIndex].html);
                }
            }
            return false; //not to load the page when the form is submitted
        }
    }
}