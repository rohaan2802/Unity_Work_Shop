#!/usr/bin/env python3
"""Check the publishable tree. Does not open Unity and does not publish."""
from pathlib import Path
import hashlib
import re
import sys
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
errors = []

def fail(msg):
    errors.append(msg)

required = [
    "index.html", "css/site.css", "js/site.js", "js/concept-demo.js",
    "README.md", "NOTICE.md", ".gitignore", ".gitattributes", ".nojekyll",
    "Assets/Scenes/CourtyardWalk.unity",
    "Assets/Scripts/Courtyard/Walker.cs",
    "Assets/Scripts/Courtyard/CourtyardBootstrap.cs",
    "Packages/manifest.json",
    "ProjectSettings/ProjectVersion.txt",
    "notes/movement/CharacterController.cs",
    "notes/player-loop/Unity Learning.txt",
    "tests/courtyard_sim.test.js",
]
for rel in required:
    if not (ROOT / rel).is_file():
        fail("missing " + rel)

readme = (ROOT / "README.md").read_text(encoding="utf-8")
live = readme.find("## Live links")
toc = readme.find("## Table of contents")
if live < 0 or toc < 0 or live > toc:
    fail("Live links section must appear before the table of contents")
for phrase in ["not live yet", "6000.0.26f1", "Mohammad Rohaan", "FAST-NUCES", "rohaan2802", "not a Unity player"]:
    if phrase not in readme:
        fail("README missing phrase: " + phrase)

shots = list((ROOT / "docs/screenshots").glob("*.jpg")) if (ROOT / "docs/screenshots").is_dir() else []
if len(shots) != 30:
    fail("expected 30 screenshots, found %d" % len(shots))
hashes = {}
shot_bytes = 0
for shot in shots:
    data = shot.read_bytes()
    shot_bytes += len(data)
    digest = hashlib.sha256(data).hexdigest()
    if digest in hashes:
        fail("duplicate screenshot bytes: %s and %s" % (hashes[digest], shot.name))
    hashes[digest] = shot.name
    if shot.name not in readme:
        fail("README does not name " + shot.name)
    if len(data) > 400_000:
        fail("screenshot too large: %s %d" % (shot.name, len(data)))
    if data[:2] != b"\xff\xd8":
        fail("not a jpeg: " + shot.name)

originals = {
    "notes/movement/CharacterController.cs": "861f50ea66501f2296b2a2fbec5bf4457bb9a1f01ca6911d1067b2f93c6da49c",
    "notes/movement/NewMonoBehaviourScript.cs": "56de785ea5612a817ba0a71cdb4c375dd9d1cb031516384cfdd5f9303c843403",
    "notes/player-loop/Unity Learning.txt": "5657987aee7c68aaf2b4b6f0675f62355d0cb7154e35adf35e0c2e44b5088385",
}
for rel, digest in originals.items():
    got = hashlib.sha256((ROOT / rel).read_bytes()).hexdigest()
    if got != digest:
        fail("hash mismatch " + rel)

walker = (ROOT / "Assets/Scripts/Courtyard/Walker.cs").read_text(encoding="utf-8")
original = (ROOT / "notes/movement/CharacterController.cs").read_text(encoding="utf-8")
if "> -2" in walker or ">-2" in walker:
    fail("Walker still has the always-true axis test")
if ">-2" not in original and "> -2" not in original:
    fail("original script lost the axis test")
if "class Walker" not in walker or ".Move(" not in walker:
    fail("Walker is missing Move")

scene = (ROOT / "Assets/Scenes/CourtyardWalk.unity").read_text(encoding="utf-8")
meta = (ROOT / "Assets/Scripts/Courtyard/CourtyardBootstrap.cs.meta").read_text(encoding="utf-8")
if "c0ffee01a11c4b0a9e5d11c0ffee0001" not in scene or "c0ffee01a11c4b0a9e5d11c0ffee0001" not in meta:
    fail("bootstrap guid mismatch")
if "4f8a1c2d6e7b49a0b3c5d6e7f8091a2b" not in (ROOT / "ProjectSettings/EditorBuildSettings.asset").read_text(encoding="utf-8"):
    fail("build settings scene guid")

layout = (ROOT / "Assets/Scripts/Courtyard/CourtyardLayout.cs").read_text(encoding="utf-8")
js = (ROOT / "js/concept-demo.js").read_text(encoding="utf-8")
for number in ["12f", "0.5f", "5f", "-8f", "0.45f", "0.6f"]:
    if number not in layout:
        fail("layout missing " + number)
if "arenaHalf: 12" not in js or "moveSpeed: 5" not in js:
    fail("concept demo layout drifted")

version = (ROOT / "ProjectSettings/ProjectVersion.txt").read_text(encoding="utf-8")
if "6000.0.26f1" not in version:
    fail("editor version pin")

PROOF_EXPECTED = {
    "proof/photos/workshop-dsc07283.jpg": (358199, "c6a8f9c653f0a17fc7532384ab1aeba40490b95d7b1ff3d17cc514e60b3cbef6"),
    "proof/photos/workshop-img5587.jpg": (591996, "7756216a04f1ab8003beca1095157a3e8f3a1f878c6b75f674597823f58866f4"),
    "proof/video/unity-workshop.mp4": (24168913, "989c27753cc5d806d9e5aacabe7990cffaddc9eb57942a0b40c2f04e1be97f57"),
}
proof_absent = []
banned_ext = {".fbx", ".pptx", ".mp4", ".exe", ".dll", ".wav", ".tif", ".tiff", ".pdf", ".zip", ".png", ".unitypackage"}
banned_text = ["mrohaan28", "e033b286", "unityfreaks", "unityassetcollection", "unityassets4free", "C:\\Users", "C:/Users", "CodeTech", "filter=lfs"]
skip_scan = {"tools/validate_portfolio.py"}
for path in ROOT.rglob("*"):
    if not path.is_file():
        continue
    rel = path.relative_to(ROOT).as_posix()
    allowed_proof = rel in {"proof/techconnect-2024.pdf", "proof/lecture-slides.pptx"} or rel in PROOF_EXPECTED
    if path.suffix.lower() in banned_ext and "docs/screenshots" not in rel and not allowed_proof:
        fail("forbidden file " + rel)
    if path.suffix.lower() in {".jpg", ".jpeg"} and not rel.startswith("docs/screenshots/") and not rel.startswith("proof/photos/"):
        fail("jpeg outside screenshots " + rel)
    if rel == "proof/video/unity-workshop.mp4":
        limit = 100 * 1024 * 1024
    elif rel.startswith("proof/"):
        limit = 20_000_000
    else:
        limit = 5_000_000
    if path.stat().st_size > limit:
        fail("file over size limit " + rel)
    if rel in PROOF_EXPECTED:
        expect_size, expect_hash = PROOF_EXPECTED[rel]
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if path.stat().st_size != expect_size or digest != expect_hash:
            fail("proof asset hash mismatch " + rel)
    if path.suffix.lower() in {".html", ".md", ".cs", ".js", ".txt", ".json", ".css", ".asset", ".unity"} and rel not in skip_scan:
        text = path.read_text(encoding="utf-8", errors="replace")
        for bad in banned_text:
            if bad in text:
                fail("banned text %s in %s" % (bad, rel))

def local_target(from_file, url):
    """Resolve a same-site link. Percent-decoding is applied once, which is what a browser does."""
    if url.startswith(("http://", "https://", "mailto:", "#", "data:")):
        return None
    if url.startswith("/"):
        fail("root-absolute link in %s: %s" % (from_file.relative_to(ROOT), url))
        return None
    raw = unquote(url.split("#", 1)[0].split("?", 1)[0])
    if raw == "" or raw.startswith("#"):
        return None
    target = (from_file.parent / raw).resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        fail("link leaves the tree in %s -> %s" % (from_file.relative_to(ROOT), url))
        return None
    if not target.exists():
        try:
            rel = target.relative_to(ROOT.resolve()).as_posix()
        except ValueError:
            rel = ""
        if rel in PROOF_EXPECTED:
            if rel not in proof_absent:
                proof_absent.append(rel)
            return None
        fail("broken link in %s -> %s" % (from_file.relative_to(ROOT), url))
        return None
    if target.is_dir() and not (target / "index.html").is_file():
        fail("directory link with no index.html in %s -> %s" % (from_file.relative_to(ROOT), url))
    return target

link_re = re.compile(r'(?:href|src)="([^"]+)"')
for html_path in ROOT.rglob("*.html"):
    text = html_path.read_text(encoding="utf-8")
    for match in link_re.finditer(text):
        local_target(html_path, match.group(1))

md_link = re.compile(r'\[[^\]]+\]\(([^)]+)\)')
for md in ROOT.rglob("*.md"):
    text = md.read_text(encoding="utf-8")
    for match in md_link.finditer(text):
        local_target(md, match.group(1))

gi = (ROOT / ".gitignore").read_text(encoding="utf-8")
for needle in ["ibrary", "local-only", "csproj"]:
    if needle not in gi:
        fail("gitignore missing " + needle)
ga = (ROOT / ".gitattributes").read_text(encoding="utf-8")
if "filter=" in ga:
    fail("gitattributes still has a filter rule")

index = (ROOT / "index.html").read_text(encoding="utf-8")
if "not a Unity player" not in index and "not a Unity player" not in index.lower():
    if "It is not a Unity player" not in index and "not a Unity player" not in index:
        fail("home page missing not-unity warning")
if "Launch WebGL" in index or 'href="Build/' in index:
    fail("home page points at a WebGL build")

# sizes
files = [p for p in ROOT.rglob("*") if p.is_file()]
total = sum(p.stat().st_size for p in files)
ranked = sorted(((p.stat().st_size, p.relative_to(ROOT).as_posix()) for p in files), reverse=True)
def over(n):
    return sum(1 for size, _ in ranked if size >= n)

probe = ROOT / "learning" / "movement.html"
for sample in ("../notes/movement/", "../notes/movement", "../notes/%6dovement/", "../notes/%6Dovement"):
    raw = unquote(sample.split("#", 1)[0].split("?", 1)[0])
    probed = (probe.parent / raw).resolve()
    if not (probed.is_dir() and not (probed / "index.html").is_file()):
        fail("directory-link probe did not fire for " + sample)

print("files", len(files))
print("total_bytes", total)
print("screenshot_bytes", shot_bytes)
print("over_10_25_50_100", over(10*1024*1024), over(25*1024*1024), over(50*1024*1024), over(100*1024*1024))
print("largest", ranked[0][1], ranked[0][0])
if errors:
    print("FAILED", len(errors))
    for err in errors:
        print(" -", err)
    sys.exit(1)
if proof_absent:
    print("proof media absent in this workspace (expected on the installed roots):")
    for rel in proof_absent:
        print(" -", rel)
print("validate_portfolio.py: passed")
