# MoreThing

Free, private online tools that run in your browser: PDF tools (merge, split, compress, rotate, Word to PDF), image tools, calculators, text and developer tools, and a private personal "desk" (renewals, warranties, autopay reminders, money ledger, streaks) that stays on your device and can be locked with a passphrase or your phone's face/fingerprint.

Live site: https://vlovsol.com

## Why it is different
- **Private by design:** files and text are processed in your browser. Nothing is uploaded.
- **No account:** personal data lives on your device, encrypted if you lock it.
- **Closed-app reminders:** an optional tiny Cloudflare Worker (`morething-push-worker.js`) sends a generic push notification at the times your device saved. It never receives titles or amounts.
- **Maintainer tools:** a funding.json Generator and an Open Source Starter Kit, so other small projects can get ready for funders such as FLOSS/fund.

## Repository layout
- The website itself (HTML, CSS, JavaScript) is at the top level: `index.html`, `app.js`, `style.css`, `sw.js`, and one folder per tool. Deploy it to any static host, for example Cloudflare Workers/Pages.
- `morething-push-worker.js` the optional push-notification Worker.
- `docs/` guides, including how to apply to FLOSS/fund.
- `funding.json` the funding manifest. Check it with `node check-funding.js`.

## Run locally
```
python3 -m http.server 8000
```
Open http://localhost:8000

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md). To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License
MIT. See [LICENSE](LICENSE).
