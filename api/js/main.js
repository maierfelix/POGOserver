((() => {

  let loggedIn = false;
  let loginTimeout = null;

  let heartInterval = null;
  let heartTimeout = null;
  let heartTimedOut = true;

  const header = `
    <div class="pure-form pure-g">
      <div class="pure-u-1-3">
        <center>
          <img src='/api/img/spawn_point.png'/><br/>
          <input id="option_one" type="radio" name="type" style="margin: 18px;" value="SPAWN">
        </center> 
      </div>
      <div class="pure-u-1-3">
        <center>
          <img src='/api/img/pokestop_blue.png'/><br/>
          <input id="option_two" type="radio" name="type" style="margin: 18px;" value="CHECKPOINT" >
        </center> 
      </div>
      <div class="pure-u-1-3">
        <center>
          <img src='/api/img/gym_NEUTRAL.png'/><br/>
          <input id="option_three" type="radio" name="type" style="margin: 18px;" value="GYM">
        </center> 
      </div>
    </div>
    <div id="form_checkpoint" style="display:none;">
      <input name="name" placeholder="Name" type="text" />
      <input name="description" placeholder="Description" type="text" />
      <input name="image_url" placeholder="Image" type="text" />
      <input name="experience" placeholder="Experience" type="text" />
    </div>
    <div id="form_spawn" style="display:none;">
      <input name="interval" placeholder="Interval" type="text" />
      <input name="encounters" placeholder="Encounters" type="text" />
    </div>
    <div id="form_gym" style="display:none;">
      <input name="team" placeholder="Team" type="text" />
    </div>
    <script>
      function hideAllForms() {
        form_checkpoint.style.display = "none";
        form_spawn.style.display = "none";
        form_gym.style.display = "none";
      }
      function showForm(e) {
        var target = e.target || e;
        hideAllForms();
        var key = "#form_" + target.value.toLowerCase();
        var el = document.querySelector(key);
        el.style.display = "block";
      }
      option_one.onclick = showForm;
      option_two.onclick = showForm;
      option_three.onclick = showForm;
      option_one.checked = true;
      showForm(option_one);
    </script>
  `;

  const gmap = new GMaps({
    el: "#map",
    disableDoubleClickZoom: true,
    lat: 0,
    lng: 0,
    disableDefaultUI: true,
    dblclick(e) {
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
        callback(data) {
          if (data !== false && Object.keys(data).length) {
            const ed = e.data = {};
            if (data.type === "SPAWN") {
              ed.interval = data.interval;
              ed.encounters = data.encounters;
            }
            else if (data.type === "CHECKPOINT") {
              ed.name = data.name;
              ed.description = data.description;
              ed.imageUrl = data.image_url;
              ed.experience = data.experience;
            }
            else if (data.type === "GYM") {
              ed.team = data.team;
            }
            e.type = data.type;
            addFort(e, ed);
          }
        }
      })
    }
  });

  function addFort(e, data) {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let obj = {
      action: "addFortToPosition",
      latitude: lat,
      longitude: lng,
      zoom: gmap.zoom,
      type: e.type
    };
    Object.assign(obj, data);
    send(obj, res => {
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
  }, res => {
    if (res.success) {
      setStatus("Connected!", "green");
    }
    else {
      if (res.reason !== void 0) {
        setStatus(res.reason);
      } else {
        setStatus("Connection failed!", "red");
      }
      return void 0;
    }
  });

  login_attempt.addEventListener("click", login);

  submit_spawn.addEventListener("click", () => {
    send({
      action: "spawnPkmnToPlayer",
      player: spawn_user.value,
      pkmn: spawn_pkmn.value
    }, res => {
      console.log(res);
    });
  });

  function login() {

    const username = login_username.value;
    const password = login_password.value;

    send({
      action: "login",
      username,
      password
    }, res => {
      if (res.success) {
        afterLogin();
      }
      else {
        setStatus("Login failed!", "red");
        clearTimeout(loginTimeout);
        loginTimeout = setTimeout(() => {
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
    }, res => {
      connected_players.innerHTML = `Connected players: ${res.connected_players}`;
    });
  }

  function getServerVersion() {
    send({
      action: "getServerVersion"
    }, res => {
      server_version.innerHTML = `Server version: v${res.version}`;
    });
  }

  function getFortIcon(fort) {
    if (fort.type === "CHECKPOINT") return ("/api/img/pokestop_blue.png");
    else if (fort.uid[fort.uid.length - 1] === "S") return ("/api/img/spawn_point.png");
    else return (`/api/img/gym_${fort.owned_by_team}.png`);
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
    }, result => {
      gmap.removeMarkers();
      result.forts.map((fort) => {
        let icon = getFortIcon(fort);
        gmap.addMarker({
          lat: fort.latitude,
          lng: fort.longitude,
          title: fort.name,
          icon,
          rightclick: function(e) {
            vex.dialog.confirm({
              message: `<center><img src='${getFortIcon(this)}' /><br/>Delete this fort?</center>`,
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
    }, res => {
      console.log(res);
      refreshMapForts();
    });
  }

  function initHeartBeat() {
    clearInterval(heartInterval);
    heartInterval = setInterval(() => {
      heartTimedOut = true;
      const now = +new Date();
      heartTimeout = setTimeout(() => {
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
      }, res => {
        if (res.timestamp) {
          heartTimedOut = false;
          clearTimeout(heartTimeout);
          const ping = res.timestamp - now;
          server_ping.innerHTML = `Ping: ${ping}ms`;
          refreshConnectedPlayers();
          refreshMapForts();
        }
      });
    }, 3e3);
  }

}))();