# ASHFALL V9.4.2 — Merchant Reborn (alpha)

- Based on V9.4.1, no GitHub changes.
- Removed old merchant page and old JS render/transaction implementation.
- Merchant uses a single grid/detail interface for buy/sell.
- Stock contains historical weapon offers plus five equipment categories generated per shop refresh and stored in the existing merchant save object.
- Sales use AshEquipment2.sell and exclude equipped items.
- Purchases insert into stash or eq2.gear, validate and persist with rollback on failure.
- Source-level validation only: iPhone rendering and transaction integration require real-device testing.
- Economic note: equipment buy prices are newly introduced; existing E2 resale values retained.
