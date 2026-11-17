LAST ROUND — MANQ (2D)

This is the updated 2D project package. Keep all files in the same folder when testing locally.

Career challenge update:
- Added two additional ranked opponents before each division champion (six extra fights across the three divisions).
- Career AI now escalates through Easy, Normal, Hard, Elite and Nightmare tiers as the player climbs.
- Later opponents gain carefully increasing health, speed and punch power; title defences and title rematches use Nightmare AI.
- Added a visible challenge label, AI tier and coin reward to the career fight card.

Latest fight-feel and bout-length update:
- Clean hits now trigger directional torso rotation, head snap, shoulder/guard recoil and knee buckling, blended over the fighter's current pose.
- Fighters briefly skid their feet on impact, with heavier shots producing a stronger slide; low balance adds a visible stagger sway.
- Round duration increased from 60 to 90 seconds.
- Clean-hit damage reduced modestly to extend exchanges while retaining counters, heavy-hit impact, knockdowns and existing balance mechanics.
- Stamina regeneration is slightly slower to make pacing and recovery matter over longer rounds.

Existing visual/combat enhancements retained:
- Fighters visibly accumulate eye swelling and body-shot wear during a bout.
- Sweat highlights become more noticeable as stamina falls.
- Clean impacts trigger a brief visual shock highlight.
- Opponent AI tracks repeated player punch patterns and becomes slightly better at reading them, while retaining its existing style and difficulty differences.
- Existing career progression, fighter roster, arena art, sound, controls, and installable PWA assets are preserved.


Expanded Gym Shop update:
- Added eight wearable cosmetics: three headbands, two chains, war paint, wrist tape and ankle wraps.
- Accessories use separate equipment slots, so the player can combine a head item, neck item, face detail, wrist tape and ankle wraps.
- Accessories are visibly rendered on the player's 2D fighter and are saved between sessions. Existing save data is migrated with empty accessory slots; previous purchases and career progress are retained.
- Added three glove sets: Onyx Elite, Inferno Power and Stormspeed.
- Added Royal Violet and Arctic Silver trunk-trim colours.
- Added three permanent gym upgrades: Altitude Training (stamina recovery), Core Conditioning (less body-shot fatigue) and Reflex Training (shorter stun after blocking).
- Updated the offline cache version so installed copies can fetch the new shop build.

Deployment:
1. Extract the ZIP.
2. Upload/replace the files in the root of the existing GitHub Pages repository.
3. Commit the changes and allow GitHub Pages to rebuild.
4. Refresh the site; if the old version remains cached, close the installed app/browser tab and reload.

Validation: embedded JavaScript passed Node.js syntax checking and ZIP integrity was checked. This package has not been play-tested in a full browser session, so please test a full career run on desktop and mobile after deployment.
