(function(){
  "use strict";

  /* ================== CONFIG — à personnaliser ================== */
  // Numéro WhatsApp au format international, sans "+" ni espaces (ex : 212612345678)
  var WHATSAPP_NUMBER = "212690461515";
  /* ============================================================== */

  var d=document, b=d.body, burger=d.querySelector(".burger"), nav=d.getElementById("nav");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  b.classList.add("js");

  /* ---------- Menu mobile ---------- */
  function setMenu(o){b.classList.toggle("menu-open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Fermer le menu":"Ouvrir le menu")}
  burger.addEventListener("click",function(){setMenu(!b.classList.contains("menu-open"))});
  nav.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});

  /* ---------- Apparition au scroll ---------- */
  var els=d.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add("in")});

  var y=d.getElementById("year");if(y)y.textContent=new Date().getFullYear();

  /* ---------- Hero : fond fluide animé (canvas) ---------- */
  (function(){
    var hero=d.querySelector(".hero"), cv=d.querySelector(".hero-canvas");
    if(!cv||!cv.getContext)return;
    var ctx=cv.getContext("2d"), w=0, h=0, dpr=1, running=true, t0=performance.now();
    var blobs=[
      {c:"255,40,40",  r:.55, sx:.00021, sy:.00017, px:0,   py:1.2, ax:.30, ay:.25, a:.55},
      {c:"140,20,60",  r:.50, sx:.00016, sy:.00023, px:2,   py:.4,  ax:.35, ay:.30, a:.50},
      {c:"120,120,130",r:.60, sx:.00013, sy:.00019, px:4,   py:2.6, ax:.40, ay:.22, a:.30},
      {c:"255,120,60", r:.40, sx:.00025, sy:.00014, px:1,   py:3.3, ax:.28, ay:.32, a:.35},
      {c:"60,60,90",   r:.55, sx:.00018, sy:.00026, px:5,   py:.9,  ax:.33, ay:.28, a:.45}
    ];
    function resize(){
      dpr=Math.min(window.devicePixelRatio||1,2);
      w=hero.clientWidth; h=hero.clientHeight;
      cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      draw(performance.now());
    }
    function draw(now){
      var t=now-t0;
      ctx.globalCompositeOperation="source-over";
      ctx.fillStyle="#0d0d0d"; ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation="lighter";
      var base=Math.max(w,h);
      for(var i=0;i<blobs.length;i++){
        var o=blobs[i];
        var x=w*(.5+o.ax*Math.sin(t*o.sx*6+o.px)+.12*Math.sin(t*o.sx*2.3+o.py));
        var yy=h*(.5+o.ay*Math.cos(t*o.sy*6+o.py)+.12*Math.cos(t*o.sy*2.1+o.px));
        var r=base*o.r*(1+.12*Math.sin(t*o.sx*4+i));
        var g=ctx.createRadialGradient(x,yy,0,x,yy,r);
        g.addColorStop(0,"rgba("+o.c+","+o.a*.5+")");
        g.addColorStop(.5,"rgba("+o.c+","+o.a*.18+")");
        g.addColorStop(1,"rgba("+o.c+",0)");
        ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
      }
      // vagues douces en surimpression
      ctx.globalCompositeOperation="source-over";
      for(var k=0;k<3;k++){
        ctx.beginPath(); ctx.moveTo(0,h);
        for(var px=0;px<=w;px+=12){
          var yv=h*(.72+k*.08)+Math.sin(px*.006+t*.0006*(k+1)+k*2)*h*.04+Math.sin(px*.011-t*.0004+k)*h*.02;
          ctx.lineTo(px,yv);
        }
        ctx.lineTo(w,h); ctx.closePath();
        ctx.fillStyle="rgba(255,255,255,"+(.018+k*.008)+")"; ctx.fill();
      }
    }
    function loop(now){ if(running){draw(now);} requestAnimationFrame(loop); }
    window.addEventListener("resize",resize);
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){running=es[0].isIntersecting&&!d.hidden}).observe(hero);
    }
    d.addEventListener("visibilitychange",function(){running=!d.hidden});
    resize();
    if(!reduce)requestAnimationFrame(loop);
  })();

  /* ---------- Curseur lumineux ---------- */
  (function(){
    var glow=d.querySelector(".cursor-glow");
    if(!glow||window.matchMedia("(hover: none), (pointer: coarse)").matches)return;
    var tx=window.innerWidth/2, ty=window.innerHeight/2, cx=tx, cy=ty, active=false;
    window.addEventListener("mousemove",function(e){
      tx=e.clientX; ty=e.clientY;
      if(!active){active=true;cx=tx;cy=ty;glow.classList.add("on")}
    },{passive:true});
    d.addEventListener("mouseleave",function(){glow.classList.remove("on");active=false});
    d.addEventListener("mouseenter",function(){glow.classList.add("on");active=true});
    (function tick(){
      cx+=(tx-cx)*.12; cy+=(ty-cy)*.12;
      glow.style.transform="translate3d("+cx+"px,"+cy+"px,0)";
      requestAnimationFrame(tick);
    })();
  })();

  /* ---------- Formulaire → WhatsApp ---------- */
  (function(){
    var form=d.getElementById("contact-form"), note=d.getElementById("form-note");
    if(!form)return;
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var f=form.elements, ok=true;
      ["nom","email","message"].forEach(function(n){
        var el=f[n], bad=!el.value.trim() || (n==="email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.classList.toggle("is-error",bad); if(bad)ok=false;
      });
      if(!ok){note.textContent="Merci de remplir correctement les champs obligatoires.";return}
      var nom=f.nom.value.trim(), email=f.email.value.trim(), tel=f.tel.value.trim(), msg=f.message.value.trim();
      var text=
        "*Nouveau message depuis le site*\n\n"+
        "*Nom :* "+nom+"\n"+
        "*E-mail :* "+email+"\n"+
        "*Téléphone :* "+(tel||"non renseigné")+"\n\n"+
        "*Message :*\n"+msg;
      var url="https://api.whatsapp.com/send?phone="+WHATSAPP_NUMBER+"&text="+encodeURIComponent(text);
      note.textContent="Ouverture de WhatsApp…";
      var win=window.open(url,"_blank","noopener");
      if(!win)window.location.href=url; // repli si la fenêtre est bloquée
      form.reset();
    });
    form.addEventListener("input",function(e){e.target.classList.remove("is-error")});
  })();

  /* ---------- Bouton social flottant ---------- */
  (function(){
    var box=d.getElementById("social"); if(!box)return;
    var btn=box.querySelector(".social-toggle");
    function set(o){
      box.classList.toggle("open",o);
      btn.setAttribute("aria-expanded",o);
      btn.setAttribute("aria-label",o?"Fermer les réseaux sociaux":"Ouvrir les réseaux sociaux");
    }
    btn.addEventListener("click",function(){set(!box.classList.contains("open"))});
    d.addEventListener("click",function(e){if(!box.contains(e.target))set(false)});
    d.addEventListener("keydown",function(e){if(e.key==="Escape"){set(false);setMenu(false)}});
  })();

  /* ---------- Menu mobile : se ferme si on repasse en desktop ---------- */
  window.addEventListener("resize",function(){if(window.innerWidth>900)setMenu(false)});

  /* ---------- Compétences : balles qui rebondissent dans la boîte ---------- */
  (function(){
    var box=d.getElementById("skills-box"); if(!box)return;
    var nodes=[].slice.call(box.querySelectorAll(".ball")); if(!nodes.length)return;
    var W=0,H=0,balls=[],running=false,last=0,raf=0;

    function size(){
      W=box.clientWidth; H=box.clientHeight;
      var base=Math.max(56,Math.min(92,W/10.5));
      balls.forEach(function(o){
        var len=o.el.textContent.length;
        var dia=Math.round(base*(len>7?1.12:len>5?1.04:1));
        o.r=dia/2;
        o.el.style.width=o.el.style.height=dia+"px";
        o.el.style.fontSize=Math.max(10,Math.round(dia*(len>7?.17:len>5?.2:.25)))+"px";
        o.x=Math.min(Math.max(o.x,o.r),W-o.r);
        o.y=Math.min(Math.max(o.y,o.r),H-o.r);
      });
    }
    function init(){
      W=box.clientWidth; H=box.clientHeight;
      balls=nodes.map(function(el){
        var a=Math.random()*Math.PI*2, v=50+Math.random()*50;
        return {el:el,r:40,x:60+Math.random()*Math.max(W-120,1),y:60+Math.random()*Math.max(H-120,1),vx:Math.cos(a)*v,vy:Math.sin(a)*v};
      });
      size();
    }
    function render(){
      for(var i=0;i<balls.length;i++){
        var o=balls[i];
        o.el.style.transform="translate3d("+(o.x-o.r).toFixed(1)+"px,"+(o.y-o.r).toFixed(1)+"px,0)";
      }
    }
    function step(t){
      var dt=Math.min((t-last)/1000,.04); last=t;
      var i,j,o,p;
      for(i=0;i<balls.length;i++){
        o=balls[i]; o.x+=o.vx*dt; o.y+=o.vy*dt;
        if(o.x<o.r){o.x=o.r;o.vx=Math.abs(o.vx)} else if(o.x>W-o.r){o.x=W-o.r;o.vx=-Math.abs(o.vx)}
        if(o.y<o.r){o.y=o.r;o.vy=Math.abs(o.vy)} else if(o.y>H-o.r){o.y=H-o.r;o.vy=-Math.abs(o.vy)}
      }
      for(i=0;i<balls.length;i++){
        for(j=i+1;j<balls.length;j++){
          o=balls[i]; p=balls[j];
          var dx=p.x-o.x, dy=p.y-o.y, dist=Math.sqrt(dx*dx+dy*dy), min=o.r+p.r;
          if(dist<min){
            if(dist<.001){dx=1;dy=0;dist=1}
            var nx=dx/dist, ny=dy/dist, ov=(min-dist)/2;
            o.x-=nx*ov; o.y-=ny*ov; p.x+=nx*ov; p.y+=ny*ov;
            var rel=(o.vx-p.vx)*nx+(o.vy-p.vy)*ny;
            if(rel>0){o.vx-=rel*nx; o.vy-=rel*ny; p.vx+=rel*nx; p.vy+=rel*ny}
          }
        }
      }
      // vitesse douce et constante : jamais d'arrêt, jamais d'emballement
      for(i=0;i<balls.length;i++){
        o=balls[i]; var s=Math.sqrt(o.vx*o.vx+o.vy*o.vy)||1, target=Math.max(42,Math.min(s,105));
        if(s!==target){o.vx*=target/s; o.vy*=target/s}
      }
      render();
    }
    function loop(t){ if(!running)return; step(t); raf=requestAnimationFrame(loop); }
    function start(){ if(running||reduce)return; running=true; last=performance.now(); raf=requestAnimationFrame(loop); }
    function stop(){ running=false; cancelAnimationFrame(raf); }

    init(); render();
    window.addEventListener("resize",function(){size();render()});
    if("IntersectionObserver" in window){
      new IntersectionObserver(function(es){es[0].isIntersecting&&!d.hidden?start():stop()},{threshold:.05}).observe(box);
    }else start();
    d.addEventListener("visibilitychange",function(){d.hidden?stop():start()});
  })();
})();