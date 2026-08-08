# Third-party software notices

Velixon uses open-source packages during development and production builds. The authoritative license terms are the license files distributed with each installed package.

The production dependency audit performed on July 23, 2026 found packages under permissive MIT, ISC, BSD, Apache-2.0, Blue Oak, CC0, Python-2.0, 0BSD, and SIL Open Font licenses, plus build-time components under MPL-2.0 and LGPL-3.0-or-later.

Notable obligations:

- **Gloock and Host Grotesk fonts:** SIL Open Font License 1.1. Retain the OFL text supplied with each Fontsource package and do not sell either font by itself.
- **Outfit font in the video workspace:** SIL Open Font License 1.1. Retain the OFL text supplied with the video source and do not sell the font by itself.
- **Lightning CSS:** MPL-2.0. Preserve its license and notices when distributing covered source or binaries in a manner that triggers those obligations.
- **sharp/libvips build tooling:** Includes LGPL-3.0-or-later components. Preserve upstream notices and comply with the applicable license when redistributing binaries.
- **All packages:** Do not remove copyright or license notices from redistributed source or binary materials.

Before a release:

1. Run `npm audit`.
2. Generate and review a current production license inventory.
3. Investigate unknown, custom, copyleft, source-available, or unlicensed entries.
4. Preserve required license files and notices in distributed products.
5. Review licenses again whenever dependencies or bundled media change.

The site’s own package is marked `private` and `UNLICENSED`; that entry is not a third-party dependency license.
