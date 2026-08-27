---
description: The four-state self-storage target database (269 facilities within ~2 hours of Paducah) and the scoring model behind it. Sister dataset to the RV Park Battle Royale. Part of Project Keldrin — see [[00 - Project Keldrin Overview]] and [[04 - Deals]].
---

# 14 - Storage Unit Battle Royale

## What this is

The second real-world sourcing dataset, built Aug 23 2026 alongside the RV Park Battle Royale. Every privately held self-storage facility findable within roughly a two-hour drive of Paducah, KY 42001 — deliberately **not** Kentucky-only. Kentucky, Illinois, Missouri and Tennessee.

**269 facilities in radius:** 119 KY · 65 IL · 50 MO · 35 TN.
**14 Priority A · 130 Priority B · 125 Priority C.**
**46 with a person named outright. 297 of 350 (with the RV set) have no website at all.**

Deliverable: `Keldrin_Storage_Units_BattleRoyale.xlsx` — 7 tabs (Storage Facilities, A - Hit List, On-Market Watch, Excluded, Scoring Key, CreativeHive Import, READ ME). Same yellow workflow columns and same A/B/C bands as the RV workbook so the two lists work as one pipeline.

## Scoring model — where it differs from the RV model

Same five components, same weights (30/20/20/15/15 = 100), same A ≥ 82 / B 68-81 / C < 68 bands. **One slot changed:**

- The RV model scores **SCALE** out of 20 because site counts are published.
- Storage unit counts almost never are. That slot became **TENURE** — years in business, which Yellow Pages publishes for most independents, and which is a better succession signal anyway.

Everything else is identical: Owner Signal (30), Digital Footprint (20, lower visibility scores higher), Low Attention (15, fewer reviews scores higher), Proximity (15).

## How it was built (repeatable method)

Two directory layers swept city by city across all four states, then merged and de-duplicated:

1. **A legacy self-storage directory** (selfstorages.com) — still carries the tiny independents nobody else lists: no phone, no website, no Google presence. This is where the invisible ones come from.
2. **Yellow Pages** — carries phone numbers *and* a years-in-business figure. That tenure column is the single most valuable field in the sheet.

On-market listings came from a separate sweep of LoopNet, Crexi and BizBuySell, then each listing was opened individually for detail. Coordinates are city centroids with a deterministic offset so map pins don't stack — right town, not right lot. The Google Maps Link column searches the real street address.

## Patterns worth remembering

- **Surname on the sign is the whole thesis.** Babb, Clark, Hooks, Roper, King Brothers, Kimbrell, Larry Seay, Gene Turnage, Chris Pitts, Wendell Alexander, Shawn Pobst, Badgley Larry & June. A family name plus no website plus 25+ years is the profile.
- **Repeated phone numbers reveal hidden portfolios.** 573-686-5599 links three Missouri sites across Sikeston, Miner and Dexter. 270-443-1511 links AAA Stowaway in Paducah to On Track Storage in Kevil. 270-584-2812, 270-841-1599 and 618-942-4859 each link two more. Cross-referencing phone numbers found portfolios no directory lists as portfolios.
- **Out-of-area area codes flag absentee owners.** A 901 (Memphis) number on a Murray facility, 859 (Lexington) on a Ballard County one, 574 (Indiana) on a Metropolis one, 662 (Mississippi) on a McKenzie one.
- **Storage keeps showing up bolted to another buy-box category** — A+ Storage & Laundry in La Center (storage + laundromat), Cadiz Car Wash & Mini Storage, Stinger Car Wash & Storage in Jackson MO, Porter's Storage & RV Rentals in Du Quoin. One owner, two categories, one conversation.
- **Paducah's largest locally-held portfolio is Stow-A-Way** — six sites in McCracken County under one name. Marion Self Storage (4+ sites) and Stone Creek Storage (3 sites) are the equivalents in southern Illinois and Paducah respectively.
- **The REITs are already here.** CubeSmart and Extra Space in Paducah, Extra Space in Dawson Springs and Central City, Storage Rentals of America in Carbondale and Cape Girardeau, Devon in Cape Girardeau, National Storage Affiliates in Harrisburg. They are comps, not targets — but their presence sets the exit.

## On-market as of Aug 23 2026

| Property | City | Price | Detail |
|---|---|---|---|
| West 68 Self-Storage, 1411 W 7th St | Hopkinsville KY | **$900,000 vs $1,600,000** | Price discrepancy: LoopNet says $1.6M, Century 21 (MLS 41584) says $900K for the same address — 64 units plus a leased office/retail building. Either a 44% drop or a stale listing. Highest-value question on the tab. |
| Smartlock Self Storage, 4 S Catalpa St | Dexter MO | $1,175,000 | 125 units, 13,730 rentable SF, ~90% occupied, 100% climate-controlled, Noké smart entry, opened May 2023. Listed 12 May 2026. Part of a six-property MO/OK/TX portfolio — seller is an operator recycling capital, not a retiring owner. |
| 9966 Samuel Rd | Carterville IL | $395,000 | **Not an operating facility.** 6,000 SF building on 1.24 acres, seven bay doors, built 1970, tagged self-storage on LoopNet. Conversion play. 320 days on market. |
| Big Stuff Storage, 50 Voss Ln | Huntingdon TN | $1,395,000 | 47 units, stated 7.50% cap. Only 2 years old — builder exit. Its cap rate is the useful regional benchmark. |
| 27-door and 37-door "portfolios" | Paducah KY | $2.88M / $4.23M | Listed by a residential brokerage — almost certainly single-family rentals mis-tagged as self storage. Verify before spending time. |

## Known gaps

- Unit counts and square footage are blank for nearly every facility. That is a drive-by door count, not a search result — and it is the number that sets the price.
- Several addresses carry two brand names (Energy IL, Martin TN, Dyersburg TN, Jackson MO, Carbondale IL). Each is a rebrand, a completed sale, or a stale record.
- Clarksville TN (~1h55, REIT-heavy) and the Evansville IN / Henderson KY corridor (~15 more facilities) were only partially swept. Both are in radius if the ring widens.
- Owner names come from business names and directory records, not filings. Confirm through the county PVA/assessor and the relevant Secretary of State before anything transactional.

## Related

- [[04 - Deals]] — buy box and the RV Park Battle Royale
- [[15 - Prospect Board]] — the live tool both datasets feed
- [[10 - Legacy Index]] — this is the second dataset defining what the CRM layer must support
