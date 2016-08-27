var loggedIn = false;
var loginTimeout = null;

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

login_attempt.addEventListener("click", function() {

  var username = login_username.value;
  var password = login_password.value;

  send({
    action: "login",
    username: username,
    password: password
  }, function(res) {
    if (res.success) {
      login();
    }
    else {
      setStatus("Login failed!", "red");
      clearTimeout(loginTimeout);
      loginTimeout = setTimeout(function() {
        setStatus("Connected!", "green");
      }, 3e3);
    }
  });

});

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
  loggedIn = true;
  login_area.style.display = "none";
  setStatus("Logged in!", "green");
  world_manager.style.display = "block";
  send({
    action: "getConnectedPlayers"
  }, function(res) {
    connected_players.innerHTML = "Connected players: " + res.connected_players;
  });
  send({
    action: "getServerVersion"
  }, function(res) {
    server_version.innerHTML = "Server version: v" + res.version;
  });
}