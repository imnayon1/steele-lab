# Steele Lab website

A plain static site (no build tools, no framework) with an editable admin
panel at `/admin`, powered by Decap CMS + Netlify Identity + Git Gateway.

**Every piece of visible text on the site — every heading, label, button,
and paragraph — now lives in the `content/*.json` files and is editable
through `/admin`.** Nothing you can see on the page is hidden in code
anymore, so there's no more mismatch between what a field is called in
`/admin` and what it actually changes on the site.

## Important — this replaces everything you had before

Because things got mixed up with piecemeal edits, the cleanest fix is to
delete what's currently in your GitHub repo and upload this complete set
of files in one go, rather than trying to patch individual files again.

### Step 1 — Delete the old files from GitHub

1. Go to your repo on GitHub.
2. For each file and folder currently there (`index.html`, `research.html`,
   `people.html`, `publications.html`, `join.html`, `netlify.toml`,
   `README.md`, and the `css`, `js`, `content`, `admin` folders), open it
   and click the trash-can icon (delete file), then commit each deletion
   directly to `main`.
   - Faster alternative: if you're comfortable with GitHub Desktop, just
     delete everything inside your local cloned folder, then follow Step
     2 below to copy the new files in and push once.

### Step 2 — Upload the new files

1. Unzip the new `steele-lab.zip` I've given you.
2. On your GitHub repo page, click **Add file → Upload files**.
3. Drag in the loose files first: `index.html`, `research.html`,
   `people.html`, `publications.html`, `join.html`, `netlify.toml`,
   `README.md`.
4. Commit those.
5. Click **Add file → Upload files** again, and this time drag in the
   four folders — `css`, `js`, `content`, `admin` — together. (If your
   browser won't accept dragged folders, use GitHub Desktop instead: copy
   everything into your local cloned repo folder, commit, and push — see
   the note at the end of this file.)
6. Commit.
7. Refresh the repo page and confirm you see, at the top level:
   `index.html`, `research.html`, `people.html`, `publications.html`,
   `join.html`, `netlify.toml`, `README.md`, `admin/`, `content/`, `css/`,
   `js/` — nine loose files plus four folders.
8. Open the `content` folder and confirm it has exactly 6 files:
   `settings.json`, `home.json`, `research.json`, `people.json`,
   `publications.json`, `join.json`.
9. Open the `admin` folder and confirm it has `config.yml` and
   `index.html`.

Netlify will automatically redeploy within a minute or so of your last
commit — no dashboard action needed, since it's already connected to
this repo.

## Everything from here on is unchanged

The rest of the setup — Netlify Identity, Git Gateway, inviting your PI,
and using `/admin` day to day — works exactly as before. If you've
already done that setup, you don't need to redo it; it applies to
whatever files are in the repo, and you've just replaced those files.

If you haven't set up Identity/Git Gateway yet, here's the short version
again:

1. Netlify dashboard → **Site configuration → Identity → Enable Identity**.
2. **Identity → Registration** → set to **Invite only**.
3. **Identity → Services → Git Gateway → Enable Git Gateway**.
4. **Identity** tab → **Invite users** → enter your email and your PI's.
5. Open the invite email, set a password.
6. Visit `https://<your-site>.netlify.app/admin/`, log in, and edit.

## What's editable now, page by page

Every one of these is a field in `/admin`:

- **Site Settings**: lab name, PI name/title, department, university,
  email, phone, office — used in every page's footer/contact info.
- **Home Page**: the kicker line, headline, intro paragraph, the label
  above the 3 highlight boxes, each highlight's title/text, and the green
  box's heading/paragraph/button text/button link.
- **Research Page**: page title, intro paragraph, the "two strategies"
  heading/text, each research project's title/description, and the "why
  an amoeba" heading/text.
- **People Page**: page title, the label above the PI section, the label
  above the members list, the "no members yet" message, the PI's full
  bio, and an add-as-many-as-you-like list of lab members with photos.
- **Publications Page**: page title, and an add-as-many-as-you-like list
  of publications (year, authors, title, journal, details, DOI, note).
- **Join the Lab Page**: page title, postdoc/grad/undergrad section
  headings and text, the fellowship links list, and the "Get in touch"
  box heading.

Things that are **not** in `/admin` on purpose, because they're part of
the site's structure/design rather than its content: the navigation menu
labels, the "Steele Lab" logo text in the header, and the hero
illustration (the line-drawn amoeba/bacterium graphic) on the home page.
If you ever want any of those changed, just ask me and I'll edit the code
directly — they're rare enough changes that it's not worth cluttering
the CMS with fields for them.

## Adding or changing photos

In `/admin`, on the **People Page**, both the PI entry and each lab
member entry have a **Photo** field — click it, upload an image from your
computer, done. Decap CMS stores it in `content/uploads/` automatically.

## Local preview (optional)

Opening `index.html` directly from disk won't work (browsers block the
`fetch()` calls over `file://`). To preview locally, run this from inside
the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Note on GitHub Desktop (if folder drag-and-drop fails)

1. Install [GitHub Desktop](https://desktop.github.com/), sign in.
2. **File → Clone repository** → pick your repo.
3. Delete everything inside the cloned local folder, then copy in every
   file and folder from the unzipped `steele-lab` folder.
4. In GitHub Desktop: type a commit message, **Commit to main**, then
   **Push origin**.
