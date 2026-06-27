# Portfolio site

Static site, no build step, no dependencies beyond Google Fonts. Three files do the work: `index.html`, `css/style.css`, `js/lab.js` + `js/reveal.js`.

## Before you publish — replace these placeholders

In `index.html`:
- `pavlomalairov@gmail.com` (appears twice)
- `https://linkedin.com/in/yourprofile` (appears twice)
- The "Download PDF" resume link `href="#"` — point it at your actual resume file once you add it to the repo, e.g. `resume.pdf`
- Hero metrics and case-study numbers are pulled from your verified figures — double check them against your latest resume before publishing, in case anything has changed since this was written.

## Deploy to GitHub Pages (free)

1. Create a new repository on GitHub, e.g. `yourname.github.io` (using exactly that pattern as the repo name gives you a clean root URL) — or any other name if you don't mind a `/reponame/` suffix in the URL.
2. Push these files to the repository root (not a subfolder):
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On GitHub: Settings -> Pages -> Source -> select `main` branch, `/ (root)` folder -> Save.
4. Your site goes live within a minute or two at:
   - `https://YOUR_USERNAME.github.io` (if you named the repo `YOUR_USERNAME.github.io`)
   - `https://YOUR_USERNAME.github.io/YOUR_REPO` (otherwise)

## Custom domain (optional, still free hosting)

If you buy a domain later (e.g. from Namecheap or Cloudflare), add a `CNAME` file to the repo root containing just your domain, then point your domain's DNS at GitHub's IPs per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Editing later

- Case studies: each one is a `.case` block inside `index.html` under `<section id="cases">`. Copy/paste the block to add another.
- The lab demo (safety-stock calculator) intentionally uses placeholder numbers, not real production data — keep it that way for anything client-related.
- Colors and spacing are defined as CSS variables at the top of `css/style.css` if you want to retheme.
