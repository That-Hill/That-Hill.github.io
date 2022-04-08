"use strict";
var stageo = {
  w: window.innerWidth,
  h: window.innerHeight,
};
var stage = {
  w: window.innerWidth,
  h: window.innerHeight,
};

var imminentfailurecount = 0;

function overboost() {
  if (imminentfailurecount > 2) {
    score -= 5000;
    if (score < 0) {
      score = 0;
    }
    imminentfailurecount = 0;
    document.getElementById("catastrophicfailure").innerHTML = "DRONE FRIED!";
    setTimeout(function () {
      document.getElementById("catastrophicfailure").innerHTML = "";
    }, 3000);
  } else {
    imminentfailurecount++;
    // alert(imminentfailurecount);
    shield = true;
    st = Date.now();
    shld.x = stage.w * 4;
    shld.y = Math.floor(Math.random() * (stage.h - 200)) + 100;
    //alert("BATTERIES AT 100%");
    setTimeout(function () {
      document.getElementById("alert").innerHTML = "BATTERIES AT 100%";
    }, 500);
    setTimeout(function () {
      document.getElementById("alert").innerHTML = "";
    }, 7000);
  }
}

function imminentfailurecountdown() {
  while (imminentfailurecount > 0) {
    imminentfailurecount -= 1;
  }
}
setInterval(imminentfailurecountdown, 10000);

function anouncer() {
  if (score == 500) {
    document.getElementById("anouncement").innerHTML = "SUCH WOW";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 1000) {
    document.getElementById("anouncement").innerHTML = "KILLER";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 1500) {
    document.getElementById("anouncement").innerHTML = "TO THE MOON!!!";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 2000) {
    document.getElementById("anouncement").innerHTML = "DESTRUCTIVE";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 3000) {
    document.getElementById("anouncement").innerHTML = "AMAZING";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 4000) {
    document.getElementById("anouncement").innerHTML = "AWESOME!";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 5000) {
    document.getElementById("anouncement").innerHTML = "PROFESSIONAL";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 7500) {
    document.getElementById("anouncement").innerHTML = "OPERATOR";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 10000) {
    document.getElementById("anouncement").innerHTML = "INSANITY!";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 15000) {
    document.getElementById("anouncement").innerHTML = "EPIC";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 20000) {
    document.getElementById("anouncement").innerHTML = "RACE DRONE DRIVER";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 30000) {
    document.getElementById("anouncement").innerHTML = "GUARDIAN OF THE GALAXY";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else if (score == 50000) {
    document.getElementById("anouncement").innerHTML = "YOU HAVE BECOME DEATH";
    setTimeout(function () {
      document.getElementById("anouncement").innerHTML = "";
    }, 7000);
  } else {
    return;
  }
}
setInterval(anouncer, 500);

// var backi = new Image();
// backi.src = 'back.png';
var _pexcanvas = document.getElementById("canvas");
_pexcanvas.width = stage.w;
_pexcanvas.height = stage.h;
var ctx = _pexcanvas.getContext("2d");

var pointer = {
  x: 0,
  y: 0,
};

var scale = 1;
var portrait = true;
var loffset = 0;
var toffset = 0;
var mxpos = stage.w / 4;
var mypos = stage.h / 2;

// ------------------------------------------------------------------------------- Gamy

var shld = { x: stage.w / 4 + 250, y: stage.h / 2, a: 0, a2: 0 };

function Enemy() {
  this.x = Math.floor(Math.random() * stage.w) + stage.w;
  this.y = Math.floor(Math.random() * (stage.h - 200)) + 100;
  this.r = 25;
  this.h = [];
  this.a = 0;
  this.h[0] = { x: this.x, y: this.y, r: 0, l: 60 };
  this.h[1] = { x: this.x, y: this.y, r: Math.PI / 2, l: 60 };
  this.h[2] = { x: this.x, y: this.y, r: Math.PI, l: 60 };
  this.h[3] = { x: this.x, y: this.y, r: Math.PI * 1.5, l: 60 };
  this.dis = false;
  this.sdis = false;
  this.dtm = 0;
}

var enemies = [];
for (var i = 0; i < 5; i++) {
  enemies.push(new Enemy());
  enemies[i].x = stage.w / 4 + 500 + i * 200;
  enemies[i].y = stage.h / 2;
}

function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.w = 30;
  this.h = 10;
  this.vx = 10;
  this.vy = 0;
}

var bullets = [];

var myx = stage.w / 2;
var myy = stage.h / 2;
var a1 = 0;
var a2 = 0;
var a3 = 0;
var a4 = 0;
var shield = false;
var st = Date.now();

function drawHack() {
  ctx.strokeStyle = "rgba(0,92,255,1.0)";

  a1 += (Math.PI / 36) * (dtime / 15);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(myx, myy, 150, a1, a1 + Math.PI);
  ctx.stroke();

  a2 -= 0.05 * (dtime / 15);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(myx, myy, 140, a2, a2 + Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(myx, myy, 170, a2 - Math.PI / 2, a2 + Math.PI / 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(myx, myy, 160, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(myx, myy, 190, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(myx, myy, 220, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(0,92,255,0.3)";
  ctx.beginPath();
  ctx.arc(myx, myy, 225, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.strokeStyle = "rgba(0,92,255,1.0)";

  ctx.beginPath();
  ctx.arc(myx, myy, 225, ((Date.now() - st) / 8000) * Math.PI * 2, 2 * Math.PI);
  ctx.stroke();

  a3 += 0.01 * (dtime / 15);
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (var i = 0; i < 100; i++) {
    var thisa = a3 + ((i * Math.PI) / 100) * 2;
    ctx.moveTo(myx + Math.sin(thisa) * 180, myy + Math.cos(thisa) * 180);
    ctx.lineTo(myx + Math.sin(thisa) * 190, myy + Math.cos(thisa) * 190);
  }
  ctx.stroke();

  a4 -= 0.02 * (dtime / 15);
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (var i = 0; i < 90; i++) {
    var thisa = a4 + ((i * Math.PI) / 90) * 2;
    ctx.moveTo(myx + Math.sin(thisa) * 200, myy + Math.cos(thisa) * 200);
    ctx.lineTo(myx + Math.sin(thisa) * 220, myy + Math.cos(thisa) * 220);
  }
  ctx.stroke();
}

var an = [0, 0, 0, 0];

var h = 1;
var w = 1;
var bt = 0;

var drx = stage.w / 4 + 30;
var dry = stage.h / 2;
var drtx = stage.w / 2;
var drty = stage.h / 2;
var backx = 0;
var sz = 10;
var score = 0;

var glitch = false;
var gt = 0;

function droneBody(fill, drx, dry, fill2) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(drx, dry);
  ctx.lineTo(drx - sz / w, dry - sz / h);
  ctx.lineTo(drx + (sz * 2) / w, dry - (sz * 5) / h);
  ctx.lineTo(drx + (sz * 1.6) / w, dry - (sz * 5.4) / h);
  ctx.lineTo(drx - (sz * 2) / w, dry - (sz * 1.5) / h);
  ctx.lineTo(drx - (sz * 5) / w, dry - (sz * 1.5) / h);
  ctx.lineTo(drx - (sz * 8.6) / w, dry - (sz * 5.4) / h);
  ctx.lineTo(drx - (sz * 9) / w, dry - (sz * 5) / h);
  ctx.lineTo(drx - (sz * 6) / w, dry - sz / h);
  ctx.lineTo(drx - (sz * 6) / w, dry + sz / h);
  ctx.lineTo(drx - (sz * 9) / w, dry + (sz * 5) / h);
  ctx.lineTo(drx - (sz * 8.6) / w, dry + (sz * 5.4) / h);
  ctx.lineTo(drx - (sz * 5) / w, dry + (sz * 1.5) / h);
  ctx.lineTo(drx - (sz * 2) / w, dry + (sz * 1.5) / h);
  ctx.lineTo(drx + (sz * 1.6) / w, dry + (sz * 5.4) / h);
  ctx.lineTo(drx + (sz * 2) / w, dry + (sz * 5) / h);
  ctx.lineTo(drx - sz / w, dry + sz / h);
  ctx.closePath();
  ctx.fill();

  var po = [];
  po[0] = {
    x: drx - (sz * 8.8 + sz / 2) / w,
    y: dry - (sz * 5.2 + sz / 2) / h,
  };
  po[1] = {
    x: drx - (sz * 8.8 + sz / 2) / w,
    y: dry + (sz * 5.2 + sz / 2) / h,
  };
  po[2] = {
    x: drx + (sz * 1.8 + sz / 2) / w,
    y: dry - (sz * 5.2 + sz / 2) / h,
  };
  po[3] = {
    x: drx + (sz * 1.8 + sz / 2) / w,
    y: dry + (sz * 5.2 + sz / 2) / h,
  };

  for (var p = 0; p < 4; p++) {
    ctx.fillStyle = fill2;
    for (var i = 0; i < 4; i++) {
      var thisa = an[p] + ((i * Math.PI) / 4) * 2 + (p * Math.PI) / 8;
      ctx.beginPath();
      ctx.moveTo(po[p].x, po[p].y);
      ctx.lineTo(
        po[p].x + (Math.sin(thisa - 0.1) * sz * 2) / w,
        po[p].y + (Math.cos(thisa - 0.1) * sz * 2) / h
      );
      ctx.lineTo(
        po[p].x + (Math.sin(thisa) * sz * 4) / w,
        po[p].y + (Math.cos(thisa) * sz * 4) / h
      );
      ctx.lineTo(
        po[p].x + (Math.sin(thisa + 0.3) * sz * 3) / w,
        po[p].y + (Math.cos(thisa + 0.3) * sz * 3) / h
      );
      ctx.closePath();
      ctx.fill();
      // ctx.stroke();
    }

    ctx.fillStyle = fill2;
    ctx.beginPath();
    ctx.arc(po[p].x, po[p].y, sz * 0.75, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function enginestep() {
  // backx -=2;
  // if (backx<-1280) {
  // 	backx = 0;
  // }
  // ctx.drawImage(backi,backx,0);
  // ctx.drawImage(backi,backx+1280,0);

  // ctx.fillStyle = 'rgba(0,0,0,1)';
  // ctx.fillStyle = '#ffffff';

  /*
	var my_gradient = ctx.createLinearGradient(0, 0, 1600, 0);
	my_gradient.addColorStop(1, "black");
	my_gradient.addColorStop(0, "white");
	ctx.fillStyle = my_gradient;
	*/

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, stage.w, stage.h);

  ctx.fillRect(0, 0, stage.w, stage.h);

  ctx.font = "5vh arial";
  ctx.textAlign = "center";

  ctx.fillStyle = "#ff8800";
  ctx.fillText("Score: ", 70, 100);
  ctx.fillStyle = "#0088ff";
  ctx.fillText(score, 260, 100);
  if (shield) {
    myx = drx - 40;
    myy = dry;
    drawHack();
    if (st < Date.now() - 8000) {
      shield = false;
    }
  }
  bt++;
  if (bt > 15 / (dtime / 15)) {
    bullets.push(new Bullet(drx, dry));
    bt = 0;
  }

  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  for (var e = 0; e < enemies.length; e++) {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#1a1a1a";
    var en = enemies[e];

    en.a -= 0.2 * (dtime / 15);
    en.x -= 3 * (dtime / 15);
    if (en.dis) {
      en.r += (-en.r / 10) * (dtime / 15);
    }

    for (var n = 0; n < en.h.length; n++) {
      if (!en.dis) {
        en.h[n].r += 0.03 * (dtime / 15);
        en.h[n].x = en.x;
        en.h[n].y = en.y;
      } else {
        en.h[n].r += 0.03 * (dtime / 15);
        en.h[n].x += Math.sin(en.h[n].r) * 20 * (dtime / 15);
        en.h[n].y += Math.cos(en.h[n].r) * 20 * (dtime / 15);
      }

      var tx = en.h[n].x + Math.sin(en.h[n].r) * en.h[n].l;
      var ty = en.h[n].y + Math.cos(en.h[n].r) * en.h[n].l;
      ctx.beginPath();
      ctx.moveTo(en.h[n].x, en.h[n].y);
      ctx.lineTo(tx, ty);

      ctx.stroke();
      var dx = drx - 30 - tx;
      var dy = dry - ty;
      var dis = dx * dx + dy * dy;
      if (!shield) {
        if (dis < 100 * 100) {
          if (!glitch) {
            score -= 500;
            if (score < 0) {
              score = 0;
            }
            gt = 0;
            glitch = true;
          }
          en.h[n].x = -2000;
          en.h[n].y = -2000;
        }
      } else {
        if (dis < 230 * 230) {
          en.h[n].x = -2000;
          en.h[n].y = -2000;
          enemies[e].dis = true;
          enemies[e].sdis = true;
        }
      }

      for (var i = 0; i < 4; i++) {
        var thisa = en.a + ((i * Math.PI) / 4) * 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(
          tx + Math.sin(thisa - 0.1) * 20,
          ty + Math.cos(thisa - 0.1) * 20
        );
        ctx.lineTo(tx + Math.sin(thisa) * 40, ty + Math.cos(thisa) * 40);
        ctx.lineTo(
          tx + Math.sin(thisa + 0.3) * 30,
          ty + Math.cos(thisa + 0.3) * 30
        );
        ctx.closePath();
        ctx.fill();
      }
    }

    if (en.dis) {
      en.dtm++;
      if (!en.sdis) {
        ctx.font = "40px arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(0,128,255," + (90 - en.dtm * 2) / 100 + ")";
        ctx.fillText("100", en.x, en.y - en.dtm * 2);
      }
      if (en.dtm > 90 / (dtime / 15)) {
        enemies[e] = new Enemy();
      }
    }

    ctx.fillStyle = "#ff8800";
    ctx.beginPath();
    ctx.arc(en.x, en.y, en.r, 0, 2 * Math.PI);
    ctx.fill();

    if (en.x < -100) {
      enemies[e] = new Enemy();
    }
  }

  for (var b = 0; b < bullets.length; b++) {
    // bullets[b].vx += 0.2;
    bullets[b].x += (bullets[b].vx * dtime) / 15;
    ctx.fillStyle = "#10D1BF";

    ctx.beginPath();
    ctx.moveTo(bullets[b].x, bullets[b].y);
    ctx.lineTo(bullets[b].x - 5, bullets[b].y - 5);
    ctx.lineTo(bullets[b].x - 20, bullets[b].y - 5);
    ctx.lineTo(bullets[b].x - 15, bullets[b].y);
    ctx.lineTo(bullets[b].x - 20, bullets[b].y + 5);
    ctx.lineTo(bullets[b].x - 5, bullets[b].y + 5);
    // ctx.fillRect(bullets[b].x,bullets[b].y,bullets[b].w,bullets[b].h);
    ctx.closePath();

    ctx.fill();

    var rand = Math.floor(Math.random() * 10);

    if (rand == 1) {
      var bx = bullets[b].x + Math.random() * 20 - 10;
      var by = bullets[b].y + Math.random() * 20 - 10;

      ctx.fillStyle = "#00ff80";

      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx - 5, by - 5);
      ctx.lineTo(bx - 20, by - 5);
      ctx.lineTo(bx - 15, by);
      ctx.lineTo(bx - 20, by + 5);
      ctx.lineTo(bx - 5, by + 5);
      // ctx.fillRect(bullets[b].x,bullets[b].y,bullets[b].w,bullets[b].h);
      ctx.closePath();
      ctx.fill();

      var bx = bullets[b].x + Math.random() * 20 - 10;
      var by = bullets[b].y + Math.random() * 20 - 10;

      ctx.fillStyle = "#ff0080";

      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx - 5, by - 5);
      ctx.lineTo(bx - 20, by - 5);
      ctx.lineTo(bx - 15, by);
      ctx.lineTo(bx - 20, by + 5);
      ctx.lineTo(bx - 5, by + 5);
      // ctx.fillRect(bullets[b].x,bullets[b].y,bullets[b].w,bullets[b].h);
      ctx.closePath();
      ctx.fill();
    }
    for (var e = 0; e < enemies.length; e++) {
      var dx = enemies[e].x - bullets[b].x;
      var dy = enemies[e].y - bullets[b].y;
      var dis = dx * dx + dy * dy;
      if (dis < 30 * 30 && !enemies[e].dis) {
        enemies[e].dis = true;
        bullets[b].x = stage.w * 2;
        score += 100;
      }
    }

    if (bullets[b].x > stage.w) {
      bullets.splice(b, 1);
    }
  }

  ctx.strokeStyle = "#000";
  drtx = mxpos + 30;
  drty = mypos;
  drx += ((drtx - drx) / 10) * (dtime / 15);
  dry += ((drty - dry) / 10) * (dtime / 15);
  if (drty > dry) {
    an[0] -= ((drty - dry) / 300) * (dtime / 15);
    an[2] -= ((drty - dry) / 300) * (dtime / 15);
  }
  if (drty < dry) {
    an[1] += ((drty - dry) / 300) * (dtime / 15);
    an[3] += ((drty - dry) / 300) * (dtime / 15);
  }
  if (drtx > drx) {
    an[0] -= ((drtx - drx) / 300) * (dtime / 15);
    an[1] -= ((drtx - drx) / 300) * (dtime / 15);
  }
  if (drtx < drx) {
    an[2] += ((drtx - drx) / 300) * (dtime / 15);
    an[3] += ((drtx - drx) / 300) * (dtime / 15);
  }
  // if (Math.abs(drty-dry)>0.01) {
  // h = 1+Math.abs(drty-dry)/200;
  // } else {
  // 	h = 1;
  // }

  // if (Math.abs(drtx-drx)>0.01) {
  // w = 1+Math.abs(drtx-drx)/200;
  // } else {
  // 	w = 1;
  // }
  var fix = Math.PI / 32;
  an[0] -= fix * 2 * (dtime / 15);
  an[1] -= fix * 2 * (dtime / 15);
  an[2] -= fix * (dtime / 15);
  an[3] -= fix * (dtime / 15);

  ctx.lineWidth = 3;
  // ctx.fillRect(drx,dry,100,200);

  if (glitch) {
    gt++;
    if (gt > 60 / (dtime / 15)) {
      gt = 0;
      glitch = false;
    }
    var rand = Math.floor(Math.random() * 4);

    if (rand == 1) {
      droneBody(
        "#32cd32",
        drx + Math.random() * 40 - 20,
        dry + Math.random() * 40 - 20,
        "#32cd80"
      );
      droneBody(
        "#32cd80",
        drx + Math.random() * 40 - 20,
        dry + Math.random() * 40 - 20,
        "#32cd32"
      );

      ctx.fillStyle = "#fff";
      for (var r = 0; r < 10; r++) {
        ctx.fillRect(
          drx - 130,
          dry - 100 + Math.random() * 200,
          190,
          Math.random() * 5 + 1
        );
      }

      // ctx.fillStyle = 'rgba(0,0,0,0.8)';
      // ctx.fillRect(drx-130,dry-95,190,190);
    }

    droneBody(
      "#32cd32",
      drx + Math.random() * 20 - 10,
      dry + Math.random() * 20 - 10,
      "#32cd80"
    );
  } else {
    droneBody("#32cd80", drx, dry, "#32cd32");
  }

  if (glitch) {
    ctx.font = "40px arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(200,0,0," + (120 - gt * 2) / 100 + ")";
    ctx.fillText("-500", drx - 40, dry - gt * 2);
  }

  shld.x -= 3 * (dtime / 15);
  var dxs = drx - shld.x;
  var dys = dry - shld.y;
  var diss = dxs * dxs + dys * dys;
  if (diss < 50 * 50) {
    shield = true;
    st = Date.now();
    shld.x = stage.w * 4;
    shld.y = Math.floor(Math.random() * (stage.h - 200)) + 100;
  }
  if (shld.x < -300) {
    shld.x = stage.w * 4;
  }

  ctx.strokeStyle = "#0044aa";

  shld.a += 0.03 * (dtime / 15);
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (var i = 0; i < 30; i++) {
    var thisa = shld.a + ((i * Math.PI) / 30) * 2;
    ctx.moveTo(shld.x + Math.sin(thisa) * 40, shld.y + Math.cos(thisa) * 40);
    ctx.lineTo(shld.x + Math.sin(thisa) * 60, shld.y + Math.cos(thisa) * 60);
  }
  ctx.stroke();

  shld.a2 -= 0.01 * (dtime / 15);
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (var i = 0; i < 20; i++) {
    var thisa = shld.a2 + ((i * Math.PI) / 20) * 2;
    ctx.moveTo(shld.x + Math.sin(thisa) * 20, shld.y + Math.cos(thisa) * 20);
    ctx.lineTo(shld.x + Math.sin(thisa) * 30, shld.y + Math.cos(thisa) * 30);
  }
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(shld.x, shld.y, 65, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(shld.x, shld.y, 35, 0, 2 * Math.PI);
  ctx.stroke();
}

// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

function mousestart(e) {
  mxpos = (e.pageX - loffset) * scale;
  mypos = (e.pageY - toffset) * scale;

  // shield = true;
  // st = Date.now();
}
function mousemove(e) {
  mxpos = (e.pageX - loffset) * scale;
  mypos = (e.pageY - toffset) * scale;
  pointer.x = mxpos;
  pointer.y = mypos;
}

function mouseend(e) {}

window.addEventListener(
  "mousedown",
  function (e) {
    mousestart(e);
  },
  false
);
window.addEventListener(
  "mousemove",
  function (e) {
    mousemove(e);
  },
  false
);
window.addEventListener(
  "mouseup",
  function (e) {
    mouseend(e);
  },
  false
);

window.addEventListener(
  "touchstart",
  function (e) {
    e.preventDefault();
    mousestart(e.touches[0]);
  },
  false
);
window.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
    mousemove(e.touches[0]);
  },
  false
);
window.addEventListener(
  "touchend",
  function (e) {
    // e.preventDefault();
    mouseend(e.touches[0]);
  },
  false
);

// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager

function _pexresize() {
  var cw = window.innerWidth;
  var ch = window.innerHeight;
  if (cw <= (ch * stageo.w) / stageo.h) {
    portrait = true;
    scale = stageo.w / cw;
    loffset = 0;
    _pexcanvas.style.width = cw + "px";
    _pexcanvas.height = Math.floor((stageo.w * ch) / cw);
    _pexcanvas.style.height = ch + "px";
    _pexcanvas.style.marginLeft = "0px";
    stage.h = Math.floor((stageo.w * ch) / cw);
    stage.w = stageo.w;
  } else {
    scale = stageo.h / ch;
    portrait = false;
    loffset = Math.floor(cw - (ch * stageo.w) / stageo.h) / 2;
    canvas.height = stageo.h;
    canvas.style.height = ch + "px";
    canvas.style.width = Math.floor((ch * stageo.w) / stageo.h) + "px";
    canvas.style.marginLeft = loffset + "px";
    stage.h = stageo.h;
    stage.w = stageo.w;
  }
}

// function _pexresize() {
// 	var cw = window.innerWidth;
// 	var ch = window.innerHeight;
// 	if (cw<=ch*stage.w/stage.h) {
// 		portrait = true;
// 		scale = stage.w/cw;
// 		loffset = 0;
// 		toffset = Math.floor(ch-(cw*stage.h/stage.w))/2;
// 		_pexcanvas.style.width = cw + "px";
// 		_pexcanvas.style.height = Math.floor(cw*stage.h/stage.w) + "px";
// 	} else {
// 		scale = stage.h/ch;
// 		portrait = false;
// 		loffset = Math.floor(cw-(ch*stage.w/stage.h))/2;
// 		toffset = 0;
// 		_pexcanvas.style.height = ch + "px";
// 		_pexcanvas.style.width = Math.floor(ch*stage.w/stage.h) + "px";
// 	}
// 	_pexcanvas.style.marginLeft = loffset +"px";
// 	_pexcanvas.style.marginTop = toffset +"px";
// }

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var fps = 60;

var nfcount = 0;
var trz = false;

var otime = Date.now();
var dtime = 0;
var cnt = 0;
function animated() {
  requestAnimFrame(animated);
  cnt++;
  if (cnt > 0) {
    cnt = 0;

    dtime = Date.now() - otime;
    otime = Date.now();
    if (glitch && false) {
      var trzx = Math.random() * 30 - 15;
      var trzy = Math.random() * 30 - 15;
      ctx.translate(trzx, trzy);
      trz = true;
    } else {
      trz = false;
    }
    enginestep();

    nfcount++;
    ctx.fillStyle = "#2c3e50";
    ctx.font = "14px arial";
    ctx.textAlign = "left";
    ctx.fillText("FPS: " + Math.floor(fps), 1200, stage.h - 20);
    // ctx.fillText("DTM: "+dtime,1200,stage.h-40);
    // ctx.fillText("Score: "+shld.x,1200,stage.h-60);

    if (trz) {
      ctx.translate(-trzx, -trzy);
    }
  }
}

_pexresize();
animated();

function countfps() {
  fps = nfcount;
  nfcount = 0;
}
setInterval(countfps, 1000);
