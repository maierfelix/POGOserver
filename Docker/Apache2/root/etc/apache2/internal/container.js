    window.onload = function() { 
       document.getElementById('urltag').innerHTML = document.location; // location.protocol + '//' + location.host; //
       setTimeout(function(){document.getElementById('pic').style.visibility = "visible";},800);
       setTimeout(function(){document.getElementById('urltag').style.visibility = "visible";},2000); 
       setTimeout(function(){document.getElementById('reason').style.visibility = "visible";},2000);
    }
