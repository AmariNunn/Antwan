---
name: Uploaded assets and publishing
description: Why new workspace uploads can be missing from the GitHub-backed Netlify build.
---

New uploads in `attached_assets/` are ignored by the environment's global Git ignore rules. Existing tracked uploads are unaffected.

**Why:** The workspace preview can render an uploaded image while Netlify fails to build because its Git checkout does not contain that image.

**How to apply:** Before importing newly uploaded media into the app, check Git inclusion. For small static images, create optimized copies in the app's source assets folder and import those. Keep large durable media in App Storage rather than Git.
