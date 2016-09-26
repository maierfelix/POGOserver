((() => {

  function loadScriptDefered(src) {
    let js = null;
    js = document.createElement("script");
    js.type = "text/javascript";
    js.src = src;
    js.async = false;
    document.body.appendChild(js);
  };

  loadScriptDefered(`http://maps.google.com/maps/api/js?key=${CFG.GMAPS.API_KEY}`);
  loadScriptDefered("/api/js/gmaps.js");
  loadScriptDefered("/api/js/ajax.js");
  loadScriptDefered("/api/js/main.js");

}))();