# Applying to FLOSS/fund (by Zerodha)

Based on public information at the time of writing. Always confirm the current rules on https://floss.fund before you apply.

## What FLOSS/fund asks for
- A **Free/Libre Open Source** project. That means a public repository with an open source license (this repo uses MIT).
- A **funding.json** manifest, published on your website or in your repository. The format is described at https://fundingjson.org.
- You then submit the public URL of that file to the FLOSS/fund directory.
- Requests are in amounts of **$10,000 minimum, then multiples of $25,000, up to $100,000 per year**.
- The fund reviews projects on broad criteria such as value, impact, criticality and innovation. After an application, expect email back-and-forth that can take about four weeks.

## Honest advice
Funders look for projects people already depend on. A brand-new project with few users is unlikely to be funded. Build a track record first: real users, regular commits, responsive issues, releases and documentation. A smaller first request ($10,000) with a clear plan is easier to say yes to.

## Checklist
1. Create a **public GitHub repository** and push this folder.
2. Keep the **MIT LICENSE** (change the copyright holder to your name or organisation if you like).
3. Fill in **funding.json**: your name, a short description of you, the repository URL, a payment channel and what the money will pay for. Run `node scripts/check-funding.js`. (You can also build the file with the funding.json Generator at https://vlovsol.com/funding-json-generator/.)
4. Publish the file at **https://vlovsol.com/funding.json** (copy it into `site/` and redeploy) and keep a copy in the repository root.
5. Optional: add `site/.well-known/funding-manifest-urls` containing the line `https://vlovsol.com/funding.json`.
6. **Submit the funding.json URL** on https://floss.fund.
7. Keep a public record of usage and progress: Cloudflare Web Analytics numbers, releases, a changelog and a roadmap.

## What makes a stronger case
- Clear usage numbers and growth.
- A real problem solved better than alternatives, for example private, no-upload tools.
- A plan for how the money is spent (maintenance, security review, accessibility, new tools).
- Healthy project habits: tests, issue replies, release notes, contributors beyond one person.
