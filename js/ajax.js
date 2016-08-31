function send(data, resolve) {
  var xhr = new XMLHttpRequest();
  var protocol = window.location.protocol;
  xhr.open("POST", protocol + "//" + CFG.API.HOST + ":" + CFG.API.PORT + CFG.API.ROUTE, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {  
        if (typeof resolve === "function") {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            resolve(void 0);
          }
        }
      } else {
        resolve(xhr.statusText);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}