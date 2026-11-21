LAST ROUND — MANQ: THE CHAMPIONSHIP UPDATE
==========================================

This update is built on the consolidated 2D master project. It retains the
existing art, career/title-run, roster, shop/accessories, equipment rendering,
combat physics, impact/stagger animations, 90-second rounds, and local modes.

NEW FEATURES
------------
5. 2D Graphics Overhaul
   - Added subtle animated arena light pools and a refined ring-canvas sheen.
   - Added soft chest/shoulder highlights to improve fighter form and depth.
   - Sharpened facial definition with brow, eye catchlight and mouth details.
   - Added a narrow leather highlight to boxing gloves for clearer material depth.
   - Kept the original 2D art style, fighter proportions, controls and game systems.

1. Eight-fighter Championship Tournament
   - Seven consecutive bouts against a fixed roster of contenders.
   - Difficulty and opponent strength increase through the bracket.
   - Progress is saved between bouts; losses allow a retry; completed titles
     can be replayed as a fresh tournament.
   - Championship victory is recorded in the Hall of Fame.

2. Training Gym
   - Punching Power, Hand Speed, Roadwork and Defensive Drills.
   - Five purchasable levels per discipline, paid with in-game coins.
   - Upgrades persist and apply to the player's fighter in solo fights.

3. Hall of Fame and Rivalry Board
   - Tracks wins, knockouts, tournament wins/titles, career belts and defences.
   - Records each solo opponent's wins/losses/fights for a rivalry board.

4. Championship presentation
   - Tournament round labels, progress display and a championship trophy/belt
     presentation on completion. Existing ring walk-in and knockdown slow-motion
     sequences remain part of the fight presentation.

SAVE DATA
---------
New fields are added to the existing local save with defaults. Existing saves,
career progression, purchases and equipped accessories are retained.

VALIDATION
----------
- Inline JavaScript parsed successfully with Node.js syntax checking.
- Static HTML check found no duplicate element IDs.
- Graphics patch presence and ZIP archive integrity checked.
- A full interactive browser playthrough was not completed in this environment;
  please test the game on the published site after uploading.
- Inline JavaScript parsed with Node.js new Function syntax validation.
- ZIP archive integrity checked with unzip -t.
- Static checks confirmed all new UI controls and screen IDs are present.
- A full interactive browser playthrough was not completed in this environment;
  please test the new tournament and training screens after publishing.

PUBLISHING
----------
Extract this ZIP and upload its contents to the root of the existing GitHub
Pages repository, replacing the prior files. Keep index.html at repository root.
The live website is not changed automatically by this ZIP.
