(function() {

  var loggedIn = false;
  var loginTimeout = null;

  var heartInterval = null;
  var heartTimeout = null;
  var heartTimedOut = true;

  var map = new GMaps({
    el: "#map",
    lat: 39.18875480450959,
    lng: -96.58109955489635,
    disableDoubleClickZoom: true,
    dblclick: addFort
  });
  map.setZoom(20);

  function addFort(e) {
    let latLng = e.latLng.toString().split(",");
    let lat = latLng[0].substring(1);
    let lng = latLng[1].substring(0, latLng[1].length - 1);
    let name = prompt("Enter fort name: ");
    let description = prompt("Enter fort description: ");
    send({
      action: "addFortToPosition",
      latitude: lat,
      longitude: lng,
      zoom: map.zoom,
      name: name,
      description: description
    }, function(res) {
      console.log(res);
    });
  }

  function removeFort(fort) {
    console.log(fort);
    let sure = prompt("Do you really want to remove this fort?");
    if (sure === null) return void 0;
    send({
      action: "deleteFortById",
      cell_id: fort.cellId,
      cell_uid: fort.uid
    }, function(res) {
      console.log(res);
    });
  }

  function setStatus(txt, color) {
    connection_status.innerHTML = txt;
    connection_status.style.color = color;
  }

  setStatus("Connecting", "yellow");

  send({
    action: "init"
  }, function(res) {
    if (res.success) {
      setStatus("Connected!", "green");
    }
    else {
      setStatus("Connection failed!", "red");
      return void 0;
    }
  });

  login_attempt.addEventListener("click", login);

  submit_spawn.addEventListener("click", function() {
    send({
      action: "spawnPkmnToPlayer",
      player: spawn_user.value,
      pkmn: spawn_pkmn.value
    }, function(res) {
      console.log(res);
    });
  });

  function login() {

    var username = login_username.value;
    var password = login_password.value;

    send({
      action: "login",
      username: username,
      password: password
    }, function(res) {
      if (res.success) {
        afterLogin();
      }
      else {
        setStatus("Login failed!", "red");
        clearTimeout(loginTimeout);
        loginTimeout = setTimeout(function() {
          if (loggedIn) {
            setStatus("Connected!", "green");
          }
        }, 3e3);
      }
    });

  }

  function afterLogin() {
    loggedIn = true;
    login_area.style.display = "none";
    setStatus("Logged in!", "green");
    world_manager.style.display = "block";
    server_ping.style.display = "block";
    fort_manager.style.opacity = 1;
    initHeartBeat();
    refreshMapForts();
    refreshConnectedPlayers();
    getServerVersion();
  }

  function refreshConnectedPlayers() {
    send({
      action: "getConnectedPlayers"
    }, function(res) {
      connected_players.innerHTML = "Connected players: " + res.connected_players;
    });
  }

  function getServerVersion() {
    send({
      action: "getServerVersion"
    }, function(res) {
      server_version.innerHTML = "Server version: v" + res.version;
    });
  }

  function refreshMapForts() {
    let center = map.getCenter();
    let lat = center.lat();
    let lng = center.lng();
    send({
      action: "getFortsByPosition",
      lat: lat,
      lng: lng
    }, function(res) {
      map.removeMarkers();
      let ii = 0;
      let length = res.forts.length;
      for (; ii < length; ++ii) {
        let fort = res.forts[ii];
        map.addMarker({
          lat: fort.latitude,
          lng: fort.longitude,
          title: fort.name,
          dblclick: function() {
            removeFort(this);
          }.bind(fort)
        });
      };
    });
  }

  function initHeartBeat() {
    clearInterval(heartInterval);
    heartInterval = setInterval(function() {
      heartTimedOut = true;
      var now = +new Date();
      heartTimeout = setTimeout(function() {
        if (heartTimedOut) {
          console.error("Heartbeat timeout!");
          loggedIn = false;
          setStatus("Reconnecting..", "yellow");
          login();
        }
      }, 5e3);
      send({
        action: "heartBeat",
        timestamp: now
      }, function(res) {
        if (res.timestamp) {
          heartTimedOut = false;
          clearTimeout(heartTimeout);
          var ping = res.timestamp - now;
          server_ping.innerHTML = "Ping: " + ping + "ms";
          refreshConnectedPlayers();
          refreshMapForts();
        }
      });
    }, 3e3);
  }

})();