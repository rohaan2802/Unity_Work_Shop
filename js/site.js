(function () {
  var root = document.body.getAttribute("data-root") || "";
  var params = new URLSearchParams(location.search);

  var catalog = [
    { kind: "Learning", title: "Player loop", href: "learning/player-loop.html", text: "Awake, Start, Update, LateUpdate, and FixedUpdate, with the workshop note corrected." },
    { kind: "Learning", title: "Render pipelines", href: "learning/render-pipelines.html", text: "Built-in, URP, HDRP, and the Scriptable Render Pipeline. The workshop project used URP." },
    { kind: "Learning", title: "Movement and input", href: "learning/movement.html", text: "Legacy Input.GetAxis, the CharacterController name clash, and the test that is always greater than -2." },
    { kind: "Learning", title: "Collision, collectibles, reset", href: "learning/collision-collectibles-reset.html", text: "CharacterController.Move, trigger orbs, the reset pad, restart, and the HUD." },
    { kind: "Learning", title: "XR context", href: "learning/xr-context.html", text: "Rift and Quest notes. The VR scene is not republished and no finished VR game is claimed." },
    { kind: "Learning", title: "Learning index", href: "learning/index.html", text: "All corrected notes and the topics they cover." },
    { kind: "Source", title: "Original CharacterController.cs", href: "source/index.html#original-root", text: "Unchanged workshop root script and the always-true axis test." },
    { kind: "Source", title: "Original NewMonoBehaviourScript.cs", href: "source/index.html#original-asset", text: "Unchanged asset script. Same axis test, assignment form." },
    { kind: "Source", title: "Walker.cs", href: "source/index.html#walker", text: "Portfolio movement. CharacterController.Move, gravity, no always-true test." },
    { kind: "Source", title: "CourtyardBuild.cs", href: "source/index.html#build", text: "Builds the primitive courtyard: walls, orbs, pad, and walker." },
    { kind: "Source", title: "CourtyardSession.cs", href: "source/index.html#session", text: "Score, clear message, and the R key restart." },
    { kind: "Source", title: "FollowCamera.cs", href: "source/index.html#camera", text: "LateUpdate camera follow after the walker moves." },
    { kind: "Project", title: "Open, play, and build", href: "project/index.html", text: "Unity 6000.0.26f1 setup, controls, and build steps. Editor was not run here." },
    { kind: "Project", title: "Browser concept demo", href: "index.html#concept-demo", text: "JavaScript canvas. Not Unity and not a WebGL build." },
    { kind: "Project", title: "Architecture", href: "index.html#architecture", text: "Bootstrap, data flow, and how the scene creates the yard." },
    { kind: "Notes", title: "Unity Learning.txt", href: "notes/player-loop/Unity%20Learning.txt", text: "Original workshop notes on the player loop and pipelines." },
    { kind: "Notes", title: "Redacted workshop links", href: "notes/links/Unity%20Workshop_TXT.redacted.txt", text: "Official links kept. Unofficial download URLs removed." },
    { kind: "Notes", title: "Provenance and exclusions", href: "provenance/index.html", text: "What was kept, and which third-party files stay local only." },
    { kind: "Notes", title: "Workshop scenes", href: "workshop-evidence/README.md", text: "Small vrscene and the 3.5 MB VRScene are different GUIDs. City prefabs, disabled movement script, not playable here." },
    { kind: "Project", title: "Participation certificate", href: "proof/techconnect-2024.pdf", text: "TechConnect 2024 Unity Basics Bootcamp Competition. Participation only, not an award." },
    { kind: "Project", title: "Lecture slides", href: "proof/lecture-slides.pptx", text: "17 slides. Presenter Usama Bin Imran. Mohammad Rohaan workshop participant, not the author." },
    { kind: "Project", title: "Workshop photo 1", href: "proof/photos/workshop-dsc07283.jpg", text: "Two people holding a participation certificate in a classroom." },
    { kind: "Project", title: "Workshop photo 2", href: "proof/photos/workshop-img5587.jpg", text: "Workshop photo 2." },
    { kind: "Project", title: "Workshop recording", href: "proof/video/unity-workshop.mp4", text: "Workshop recording." },
    { kind: "Project", title: "Required and generated Unity files", href: "docs/unity-files.md", text: "Which meta files and settings are required, and which caches Unity regenerates." },
    { kind: "Notes", title: "Corrections", href: "docs/corrections.md", text: "Axis test, pipelines, LateUpdate, FixedUpdate, and the class name." }
  ];

  function applyTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("courtyard-theme", theme); } catch (err) {}
    var button = document.getElementById("theme-toggle");
    if (button) {
      var next = theme === "dark" ? "light" : "dark";
      button.textContent = theme === "dark" ? "Light theme" : "Dark theme";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      button.setAttribute("aria-label", "Switch to " + next + " theme");
    }
  }

  applyTheme(document.documentElement.getAttribute("data-theme") || "light");

  var themeButton = document.getElementById("theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNav(false);
    });
  }
  if (params.get("nav") === "open") setNav(true);

  var input = document.getElementById("search");
  var chips = Array.prototype.slice.call(document.querySelectorAll("[data-kind]"));
  var results = document.getElementById("search-results");
  var activeKind = params.get("kind") || "All";
  var query = params.get("q") || "";

  function render() {
    if (!results) return;
    var q = query.trim().toLowerCase();
    var rows = catalog.filter(function (item) {
      if (activeKind !== "All" && item.kind !== activeKind) return false;
      if (!q) return true;
      return (item.title + " " + item.text + " " + item.kind).toLowerCase().indexOf(q) !== -1;
    });
    results.innerHTML = "";
    if (!rows.length) {
      var empty = document.createElement("p");
      empty.className = "card";
      empty.textContent = "No notes, source files, or project pages match that search.";
      results.appendChild(empty);
      return;
    }
    rows.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "result";
      var k = document.createElement("span");
      k.className = "kicker";
      k.textContent = item.kind;
      var a = document.createElement("a");
      a.href = root + item.href;
      a.textContent = item.title;
      var p = document.createElement("p");
      p.textContent = item.text;
      li.appendChild(k);
      li.appendChild(a);
      li.appendChild(p);
      results.appendChild(li);
    });
  }

  if (input && results) {
    input.value = query;
    chips.forEach(function (chip) {
      var on = chip.getAttribute("data-kind") === activeKind;
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      chip.addEventListener("click", function () {
        activeKind = chip.getAttribute("data-kind");
        chips.forEach(function (other) {
          other.setAttribute("aria-pressed", other === chip ? "true" : "false");
        });
        render();
      });
    });
    input.addEventListener("input", function () {
      query = input.value;
      render();
    });
    render();
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.getAttribute("data-copy");
      var node = document.getElementById(id);
      var text = node ? node.innerText : "";
      function done() {
        var old = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(function () { button.textContent = old; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      }
    });
  });

  var top = document.getElementById("back-to-top");
  function onScroll() {
    if (!top) return;
    var show = window.scrollY > 280;
    top.classList.toggle("is-visible", show);
    top.tabIndex = show ? 0 : -1;
    top.setAttribute("aria-hidden", show ? "false" : "true");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.addEventListener("keydown", function (event) {
    var tag = event.target && event.target.tagName;
    if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      if (input) {
        event.preventDefault();
        input.focus();
      }
    }
  });

  var canvas = document.getElementById("demo-canvas");
  if (canvas && window.CourtyardConcept) {
    var demo = window.CourtyardConcept.mount(canvas, document.getElementById("demo-status"), {
      mode: params.get("demo") || "start"
    });
    window.__demo = demo;
    document.querySelectorAll("[data-stick]").forEach(function (button) {
      var parts = button.getAttribute("data-stick").split(",");
      var x = Number(parts[0]);
      var z = Number(parts[1]);
      function press(event) {
        event.preventDefault();
        demo.setStick(x, z);
      }
      function release() { demo.setStick(0, 0); }
      button.addEventListener("pointerdown", press);
      button.addEventListener("pointerup", release);
      button.addEventListener("pointerleave", release);
      button.addEventListener("pointercancel", release);
    });
    var restart = document.getElementById("demo-restart");
    if (restart) restart.addEventListener("click", function () { demo.restart(); });
  }
})();
