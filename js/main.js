(function() {

  var loggedIn = false;
  var loginTimeout = null;

  var heartInterval = null;
  var heartTimeout = null;
  var heartTimedOut = true;

  var header = `
    <div class="pure-form pure-g">
      <div class="pure-u-1-2">
        <center>
          <img src='img/pokestop_blue.png'/><br/>
          <input id="option-one" type="radio" name="type" value="CHECKPOINT" style="margin: 18px;" checked>
        </center> 
      </div>
      <div class="pure-u-1-2">
        <center>
          <img src='img/gym_0.png'/><br/>
          <input id="option-two" type="radio" name="type" style="margin: 18px;" value="GYM">
        </center> 
      </div>
    </div>
    <input name="name" placeholder="Name" type="text" />
    <input name="description" placeholder="Description" type="text" />
    <input name="image_url" placeholder="Image" type="text" />
    <input name="experience" placeholder="Experience" type="text" />
  `;

  var gmap = new GMaps({
    el: "#map",
    disableDoubleClickZoom: true,
    lat: 0,
    lng: 0,
    disableDefaultUI: true,
    dblclick: function(e) {
      vex.dialog.open({
        message: "",
        input: header,
        buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
            text: "Submit"
          }),
          $.extend({}, vex.dialog.buttons.NO, {
            text: "Abort"
          })
        ],
        callback: function(data) {
          if (data !== false && Object.keys(data).length) {
            e.name = data.name;
            e.description = data.description;
            e.imageUrl = data.image_url;
            e.experience = data.experience;
            e.type = data.type;
            addFort(e);
          }
        }
      })
    }
  });

  function addFort(e) {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    send({
      action: "addFortToPosition",
      latitude: lat,
      longitude: lng,
      zoom: gmap.zoom,
      name: e.name,
      description: e.description,
      image: e.imageUrl,
      experience: e.experience,
      type: e.type
    }, function(res) {
      console.log(res);
      refreshMapForts();
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
    map_manager.style.display = "block";
    gmap.refresh();
    gmap.setCenter({
      lat: CFG.GMAPS.BASE_LAT,
      lng: CFG.GMAPS.BASE_LNG
    });
    gmap.setZoom(CFG.GMAPS.BASE_ZOOM);
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
    let center = gmap.getCenter();
    let lat = center.lat();
    let lng = center.lng();
    send({
      action: "getFortsByPosition",
      latitude: lat,
      longitude: lng,
      zoom: gmap.zoom
    }, function(result) {
      gmap.removeMarkers();
      result.forts.map((fort) => {
        let icon = null;
        if (fort.type === "CHECKPOINT") icon = "img/pokestop_blue.png";
        else icon = "img/gym_" + fort.owned_by_team + ".png";
        gmap.addMarker({
          lat: fort.latitude,
          lng: fort.longitude,
          title: fort.name,
          icon: icon,
          rightclick: function(e) {
            vex.dialog.confirm({
              message: "<center><img src='img/pokestop_blue.png' /><br/>Delete this fort?</center>",
              callback: function(value) {
                if (value) removeFort(this);
              }.bind(fort)
            })
          }.bind(fort)
        });
      });
    });
  }

  function removeFort(fort) {
    send({
      action: "deleteFortById",
      uid: fort.uid,
      latitude: fort.latitude,
      longitude: fort.longitude,
      zoom: gmap.zoom
    }, function(res) {
      console.log(res);
      refreshMapForts();
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