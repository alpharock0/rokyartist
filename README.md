# ROKY — Portfolio Website

Portfolio site for **Alfarouq Alderwish (Roky)** — stencil and spray paint artist based in Dubai.

> Live demo URL (after deployment): `https://[your-github-username].github.io/[repository-name]/`

---

## File Structure

```
website/
├── index.html          # Single-page portfolio
├── style.css           # All styles (dark stencil aesthetic)
├── script.js           # Nav, lightbox, scroll reveal (vanilla JS)
├── README.md           # This file
└── images/
    ├── the-leader-physical.jpg
    ├── the-leader-digital.jpg
    ├── fleeing-child.jpg
    ├── julius-caesar-blue.png
    ├── julius-caesar-crimson.png
    ├── icj-globe.png
    ├── work-misc-1.jpg
    └── work-misc-2.png
```

---

## Deploy to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** (the `+` icon, top right)
3. Name it something like `roky-portfolio` or `rokyartist`
4. Set visibility to **Public** (required for free GitHub Pages)
5. Leave all other options at defaults — **do not** tick "Add a README"
6. Click **Create repository**

### Step 2 — Upload the website files

**Option A — Upload via browser (simplest):**

1. On the repository page, click **uploading an existing file**
2. Drag and drop ALL files from this `website/` folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - The entire `images/` folder contents
3. **Important:** GitHub's web uploader doesn't support folders directly.
   Upload the images individually into an `images/` folder:
   - After uploading the root files, click **Add file → Upload files** again
   - In the path box at the top, type `images/` before the filenames
   - Upload all image files there
4. Write a commit message like `Initial portfolio upload` and click **Commit changes**

**Option B — Using Git (recommended for future updates):**

```bash
# Install Git if not already installed
# Then from the website/ folder:

git init
git add .
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** (tab at the top)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select `main` and folder `/` (root)
5. Click **Save**
6. Wait 1–3 minutes for deployment
7. GitHub will show your live URL at the top of the Pages settings:
   `https://[username].github.io/[repository-name]/`

### Step 4 — Share your portfolio

Your portfolio is now live. Share the URL:
- Add it to your Instagram bio
- Include it on your artist CV
- Link from any email applications or gallery submissions

---

## Updating the Site

### Add a portrait photo

To replace the placeholder portrait in the **About** section:

1. Save your photo as `portrait.jpg` inside the `images/` folder
2. In `index.html`, find the `<div class="about__portrait-frame">` block
3. Replace the `<div class="about__portrait-placeholder">` with:

```html
<img src="images/portrait.jpg" alt="Alfarouq Alderwish" style="width:100%;height:100%;object-fit:cover;" />
```

### Add new artwork

1. Add the image file to `images/`
2. In `index.html`, copy an existing `<article class="gallery__item">` block
3. Update the `src`, `alt`, title, year, and medium fields
4. Save and commit

### Update contact details

All contact info is in `index.html`. Search for `farouqalder1234@gmail.com` or `rokyartist` and update as needed.

---

## Custom Domain (Optional)

If you own a domain (e.g. `rokyartist.com`):

1. In GitHub Pages settings, enter your domain in **Custom domain**
2. At your domain registrar, add a CNAME record:
   - Name: `www`
   - Value: `[username].github.io`
3. Wait up to 24 hours for DNS propagation

---

## Technical Notes

- **No build tools required** — pure HTML, CSS, vanilla JS
- **No server-side code** — fully static, GitHub Pages compatible
- **Fonts** — loads Bebas Neue, Space Mono, and Inter from Google Fonts
  - Falls back to system fonts (Impact, Courier New, sans-serif) if offline
- **Images** — use `loading="lazy"` for performance
- **Lightbox** — custom-built, no libraries; supports keyboard (←→ Esc) and swipe
- **Responsive** — mobile-first, tested at 320px–1440px+
- **Accessibility** — ARIA labels on interactive elements, focus management in lightbox

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Mobile Chrome / Safari | ✅ Full |
| IE 11 | ❌ Not supported |

---

*Built for Alfarouq Alderwish — May 2026*
