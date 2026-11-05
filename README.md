# NellyNellz — An Original Creative Universe

## Content Studio preparation

This is the existing Underground Layer site with its original tree artwork and layout, plus separate editable JSON files in `content/` for Homepage, Music, Stories, Books, About, and Contact. Changes to those files publish automatically when committed to the connected GitHub repository.

The `/admin/` Decap CMS interface is **not yet ready for login**. Its GitHub backend needs an OAuth authentication service configured. Merely visiting `/admin/` will not provide a working editor.

To safely test: upload these extracted files to GitHub repository root, replacing `index.html` and `README.md`, adding `content/`, `admin/`, and `content-loader.js`. Cloudflare Pages will deploy from GitHub. Keep the previous commit for rollback.

The website uses original static HTML as a fallback if JSON cannot load. Do not upload passwords or credentials to this public repository.
