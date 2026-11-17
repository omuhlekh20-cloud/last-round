LAST ROUND — MANQ | COMPLETE 2D MASTER BUILD

This is the consolidated project package containing the improvements developed across the earlier art, career, physics, impact, round-length and shop updates. It remains the original 2D canvas game; it has not been converted to 3D.

INCLUDED SYSTEMS

1. Fighter art and presentation
- Cleaner, more readable 2D fighter designs with clearer faces, skin tones, anatomy, gloves, trunks and boots.
- Improved visual distinction between fighters while retaining the game's original style and roster.
- Existing arena presentation, effects, audio and installable PWA assets retained.

2. Career and roster progression
- Six additional ranked opponents across the three division ladders.
- More visible career challenge labels, AI tier and coin reward on the fight card.
- AI difficulty progresses through Easy, Normal, Hard, Elite and Nightmare.
- Later opponents receive controlled health, speed and power scaling.
- Title fights, title defences and rematches become more demanding.

3. Fighting physics and impact animation
- Balance and stamina respond to clean hits, blocking and body damage.
- Punch impact factors include stamina fatigue, punch range quality and forward momentum.
- Heavy shots create stronger knockback and can cause knockdowns when balance is depleted.
- Visible directional torso rotation, head snap, shoulder/guard recoil, knee buckling and stagger recovery.
- Impact foot sliding and stronger movement from heavier shots.
- Existing swelling, cuts, sweat, hit sparks and impact emphasis retained.

4. Longer bouts
- Round timer increased from 60 to 90 seconds.
- Clean-hit damage adjusted modestly to allow longer exchanges.
- Stamina regeneration slowed slightly to reward pacing and ringcraft.

5. Gym shop and equipment
- 22 wearable accessories across head, neck, face, wrists and ankles.
- Three additional glove sets: Onyx Elite, Inferno Power and Stormspeed.
- Additional trunk trims: Royal Violet and Arctic Silver.
- Three permanent training upgrades: Altitude Training, Core Conditioning and Reflex Training.
- Accessory purchases and equipped slots are saved in the existing local save.
- Equipped cosmetics are drawn on the active player's fighter in the live fight renderer. A rendering bug in the prior shop package was corrected in this master build.

6. Existing game modes and features
- Career / Title Run.
- Quick Fight.
- Local 2-Player.
- Existing roster, controls, weapons, auras, arenas, sound and save progression.

PUBLISHING TO GITHUB PAGES
1. Make a backup of the current repository before replacing files.
2. Extract this ZIP.
3. Upload all extracted root files into the root of the existing GitHub Pages repository, replacing files with the same names.
4. Commit and push the changes.
5. Wait for GitHub Pages to finish deploying, then hard-refresh the game.
6. If an installed/offline copy still shows the old build, close it fully and reopen it so the new service-worker cache (v13 master) can activate.

SAVE DATA
The game continues using its existing localStorage save key and migration defaults. Existing local progress should remain on the same browser/device. As always, back up the current project and avoid clearing browser site data when updating.

TESTING
See MASTER-TEST-REPORT.txt for the checks completed on this package. A local browser smoke test was completed for shop rendering, purchasing/equipping all five accessory slots, fighter rendering in a live quick fight, career setup, and JavaScript runtime errors. A complete long-form career playthrough across all divisions has not been performed.
