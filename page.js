var alreadyRun = false;
function doSomething(response) {
    console.log(response);
    response.json().then(data => {

        console.log(data);
        if (!alreadyRun) {
            var p = document.getElementById("myId");
            p.innerHTML += "<br>data received: " + JSON.stringify(data);
            // needed because opening eg. DevTools to inpect the page
            // will trigger both the "complete" state and the tabId conditions
            // in background.js:
            alreadyRun = true;
        }
    });
}
document.getElementById("myId").innerHTML += "<br>script loaded...";