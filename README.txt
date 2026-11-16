LAST ROUND 3D — MANQ
=====================
This is a new browser-based 3D prototype replacing the previous 2D canvas game.

Files:
- index.html: user interface and HUD
- game.js: Three.js 3D arena, procedural fighters, lighting, camera, combat and AI
- manifest.webmanifest: installable web app metadata
- sw.js: offline shell cache (Three.js itself is loaded from CDN, so first launch needs internet)

How to run:
1. Upload all files to the root of your GitHub Pages repository, replacing the old 2D version.
2. Commit the changes and wait for GitHub Pages to publish.
3. Open the site in Chrome. Internet is required on first load for the Three.js module.
4. On mobile, use the on-screen move and action buttons.

Controls:
WASD / arrow keys = movement
J = jab
K = cross
L = block (hold)
Space = dodge
R = reset bout

Prototype scope:
- Procedural 3D fighter meshes with articulated arms and legs
- 3D boxing ring, ropes, posts, stylized audience, spotlights and shadows
- Follow camera that adjusts to fighter spacing
- Health and stamina, punch range, block reduction, dodge, knockback and recovery
- Four opponent profiles with different range, pace, aggression and counter tendencies

This is a playable foundation, not a finished commercial-grade boxing simulator. The models are procedural low-poly 3D, not scanned photorealistic humans. Combat physics are gameplay-oriented approximations, and animation blending, true skeletal motion capture, full career save system, referees, multiple rounds and polished sound still need further development.
