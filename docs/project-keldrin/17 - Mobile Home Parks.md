---
description: The four-state mobile home park target database (365 parks within ~2 hours of Paducah) and the scoring model behind it. Sister dataset to the RV Park and Storage Unit datasets. Part of Project Keldrin — see [[00 - Project Keldrin Overview]] and [[04 - Deals]].
---

# 17 - Mobile Home Parks

## What this is

The third real-world sourcing dataset, built Aug 26 2026 following the same method as the RV Park and Storage Unit datasets. Every privately held mobile home park findable within roughly a two-hour drive of Paducah, KY 42001 — Kentucky, Illinois, Missouri and Tennessee, matching the Storage Unit dataset's four-state radius (not the RV Park dataset's current KY-only scope).

**365 parks in radius: 171 KY · 97 IL · 39 MO · 58 TN.**
**1 Priority A · 120 Priority B · 244 Priority C.**
**5 flagged on-market. 4 flagged as comps/dealers, not targets (Clayton Homes locations, institutional/investor-owned parks). 9 flagged as possible duplicates (repeat names/addresses to verify before outreach.)**

Deliverable: `Keldrin_Mobile_Home_Parks.xlsx` — 7 tabs (Mobile Home Parks, A - Hit List, On-Market Watch, Excluded, Scoring Key, CreativeHive Import, READ ME), same yellow workflow columns and same A/B/C bands as the RV and Storage workbooks. A flat-data copy also lives as a Google Sheet ("Keldrin - Mobile Home Parks") for quick reference. The full dataset is seeded into the `prospects` table in Keldrin OS (`business_type = 'mobile_home_park'`) and has its own tab in the Prospects view, ordered RV Parks → Mobile Home Parks → Storage Units.

Note: per Kyle's direction (Aug 26 2026), "Battle Royale" is not used as a descriptor for this dataset or any future ongoing sourcing work — it was specific to the original RV Park / Storage Unit challenge naming, not a standing convention for Keldrin as a business.

## Scoring model — where it differs from the RV model

Same five components, same weights (30/20/20/15/15 = 100), same A ≥ 82 / B 68-81 / C < 68 bands. Same adaptation as Storage:

- The RV model scores **SCALE** out of 20 because site counts are published.
- Mobile home park lot counts are almost never published in the directories this dataset draws from. That slot became **TENURE** — years in business, sourced from Yellow Pages where available.

Everything else is identical: Owner Signal (30), Digital Footprint (20, lower visibility scores higher), Low Attention (15, fewer reviews/signals scores higher), Proximity (15, drive-time tier by county).

This dataset skews more B/C-heavy than the RV and Storage lists (only 1 Priority A) because structured fields — lot counts, review counts, tenure — are sparser across the mobile home park directories than they were for RV parks or storage facilities. The Scoring Key tab in the workbook documents this explicitly rather than silently recalibrating the bands.

## How it was built (repeatable method)

Four parallel state sweeps (KY, IL, MO, TN), each independently searching MHVillage.com and mobilehomeparkstore.com plus Yellow Pages and LoopNet/Crexi/mobilehome.net for on-market listings, then merged and de-duplicated:

1. **MHVillage / mobilehomeparkstore** — the primary directories; carry park name, address, lot count where published, and owner/notes signals.
2. **Yellow Pages** — carries phone numbers and, for many independents, a years-in-business figure (the tenure input to scoring).
3. **LoopNet / Crexi / mobilehome.net** — on-market listings, opened individually for price, unit count, and cap rate detail where available.

County-tier proximity scoring reused the same CORE/NEAR/MID/OUTER county buckets built for the Storage dataset, extended with a couple of additional counties that showed up in the MHP sweep.

## Patterns worth remembering

- **"Family-name park" is the dominant signal, not the exception** — dozens of parks carry a surname directly in the name (Bush, Frost, Mills & Son, Hovekamp, Craigs, Ritcheys, Watkins, Hester's, Grogan's, Slaughter's) with no other digital footprint. This is the same succession thesis as Storage, just more common here.
- **Repeat family names surfaced hidden multi-park owners** — the Bush family (2 parks in Carbondale, IL), the Hester family (2 parks in Benton, Marshall County KY, "Hester's Spot In The Sun" plus "Hesters Mobile Park").
- **Two owners were identified by name outright**, the strongest signal in the model: Tom & Cathy (Hopkinsville, KY) and Eddy Belew (Oak Grove, KY) and Steve Sullivan (Kevil, KY — same town as the AI data center site) and Ken Westerfield (Owensboro, KY) and Jean Vincent (Morganfield, KY).
- **Comps, not targets:** Clayton Homes dealer lots (Marion IL, Marion TN — different Marions) and two institutionally-owned parks (Cornerstone Village MHP in Carbondale IL, listed for $4M with 400 units; Perryville Mobile Home Park in Perryville MO, owned by Three Lakes Capital) are flagged and excluded from the Hit List.
- **Kevil itself has two parks** — Boone Crossing Community and the Sullivan-owned park at 8353 Paducah Rd — both inside the same small town as the AI data center site, worth a priority drive-by given the market brief's thesis.
- **A few on-market listings surfaced directly**, most notably Nobles 260 LLC / Nobles Rd RV & Mobile Home Park in Paris, TN ($540,000, 22/23 occupied, 10.83% cap, near Kentucky Lake) and a stale 46-space listing in Poplar Bluff, MO.

## Known gaps

- Lot counts are blank for the large majority of parks — a drive-by count, not something the directories publish consistently.
- Nine rows are flagged as possible duplicates (repeat names at the same or adjacent address, e.g. the Saratoga parks in Eddyville KY, Glenncrest/Schuckhardt's Meadowview sharing an address in Union City TN). Verify before outreach.
- Owner names come from business names, directory listings, and Yellow Pages records, not filings. Confirm through the county PVA/assessor and Secretary of State before anything transactional.
- The RV Park dataset is still KY-only; Kyle's stated next step (not yet started) is expanding it to the same four-state, two-hour-drive-time radius as this dataset and Storage Units, so all three datasets share one consistent geography.

## Related

- [[04 - Deals]] — buy box and the other two sourcing datasets
- [[14 - Storage Unit Battle Royale]] — the dataset this one's scoring model and method were adapted from (name predates the "no Battle Royale" convention; not renamed retroactively)
- [[15 - Prospect Board]] — the live tool all three datasets feed
- [[10 - Legacy Index]] — this is the third dataset defining what the CRM layer must support
