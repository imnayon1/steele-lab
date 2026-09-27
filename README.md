# Steele Lab website

A plain static site (no build tools, no framework) with an editable admin
panel at `/admin`, powered by Decap CMS + Netlify Identity + Git Gateway.

Pages: Home, Research, People, Publications, Join the Lab.
All editable text/photos live in the `content/*.json` files — the pages
fetch that JSON in the browser, so an edit saved in `/admin` shows up on
the live site immediately, with no rebuild required.

## 1. Push this to GitHub

```bash
cd steele-lab
git init
git add .
git commit -m "Initial site"
```

Create a new **empty** repo on GitHub (no README/license), then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. Connect GitHub and pick this repo.
3. Build settings: leave **build command** and **publish directory** as
   they are (the repo's `netlify.toml` already sets `publish = "."` and a
   no-op build command — there's nothing to compile).
4. Click **Deploy site**. You'll get a URL like `random-name-123.netlify.app`.
5. Optional: Site settings → **Change site name** to get something nicer,
   e.g. `steelelab.netlify.app`. (A real `.app` domain from a registrar can
   be attached later under Domain settings — `.app` domains require HTTPS,
   which Netlify provides automatically.)

## 3. Turn on the admin panel (Netlify Identity + Git Gateway)

This is what makes `/admin` work for you and your PI.

1. In the Netlify dashboard for this site: **Site configuration → Identity → Enable Identity**.
2. Under Identity settings, set **Registration** to **Invite only** (so
   random people can't sign up and edit your site).
3. Still under Identity: **Services → Git Gateway → Enable Git Gateway**.
   This lets Identity users save changes back to your GitHub repo without
   ever needing their own GitHub account or access token.
4. Go to the **Identity** tab (top-level, not settings) and **Invite users**.
   Invite yourself and your PI by email. You'll each get an email with a
   link to set a password.
5. Visit `https://<your-site>.netlify.app/admin/`, log in, and you'll see
   the editor: Site Settings, Home Page, Research Page, People Page,
   Publications, and Join the Lab Page. Edit fields, add lab members or
   publications as list items, upload photos, and hit **Publish**.

That's the whole workflow going forward — no code, no GitHub, no Netlify
dashboard needed for day-to-day edits. Just `/admin`.

## 4. Notes on content

- **People page**: `content/people.json` currently has the PI filled in
  and an empty `members` list. Add lab members from `/admin` → **People
  Page** → **Lab members** → **Add "Lab members"**.
- **Publications**: `content/publications.json` has the 8 publications
  from the CV. Add new ones the same way, via `/admin` → **Publications**.
- **DOIs**: leave the DOI field blank if a publication doesn't have one —
  the page just won't show a link for that entry.
- Photos uploaded through `/admin` land in `content/uploads/` and are
  wired up automatically.

## 5. Design notes

- Palette: a clean, saturated orange (`#EF6D13`) as the primary accent —
  not a muted terracotta — paired with a deep moss green (`#33604A`,
  nodding to petri-dish culture and the amoeba theme) and warm
  ink/paper neutrals.
- Type: Newsreader (serif, editorial) for headlines, IBM Plex Sans for
  body text and UI — a "journal meets lab notebook" pairing.
- The one illustrated moment is the hero SVG on the home page: a simple
  line drawing of an amoeba engulfing a rod-shaped bacterium, which is
  literally what the lab studies (predation).

## 6. If you want to preview locally first

Because the pages `fetch()` the JSON files, opening `index.html` directly
from disk (`file://`) will fail silently due to browser CORS rules. To
preview locally, run a tiny local server from the project folder instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. (The live Netlify site doesn't have
this problem — it's only an issue with `file://`.)
