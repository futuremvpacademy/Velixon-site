# Conversion analytics

This file is the source of truth for the Free Business Systems Audit landing-page funnel. It defines event names, safe properties, destinations, consent behavior, attribution boundaries, conversions, and verification.

## Destinations and configuration

| Variable | Format | Behavior |
| --- | --- | --- |
| `PUBLIC_GA_MEASUREMENT_ID` | `G-...` | Loads direct GA4 after analytics consent. Invalid or blank values are ignored. |
| `PUBLIC_GTM_CONTAINER_ID` | `GTM-...` | Loads Google Tag Manager after analytics consent. Canonical events are pushed to `window.dataLayer`. |
| `PUBLIC_CLARITY_PROJECT_ID` | 5–64 letters or digits | Loads Microsoft Clarity after analytics consent and sends an analytics-storage consent signal. Clarity is for consented session diagnostics; the event wrapper does not send custom event properties to Clarity. |
| `PUBLIC_GOOGLE_ADS_CONVERSION_ID` | `AW-...` | Optional direct Google Ads destination. Loads the Google tag only after analytics consent. |
| `PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL` | Google Ads event-snippet label | Sends one direct `conversion` for `qualify_lead`. Requires the conversion ID. |
| `PUBLIC_AUTOMATION_AUDIT_HERO_VARIANT` | `a`, `b`, or `c` | Selects the configured hero variant. Traffic is not split automatically. |

No destination loads when all analytics and conversion IDs are blank or invalid. Google Ads conversion IDs and labels are browser-visible identifiers, not credentials or API secrets. Keep private keys and access tokens out of every `PUBLIC_` variable. Meta Pixel is intentionally absent because no verified Pixel configuration exists.

Configure either direct GA4 or GTM, not both. The production validator rejects simultaneous `PUBLIC_GA_MEASUREMENT_ID` and `PUBLIC_GTM_CONTAINER_ID` values because the repository cannot prove that a container avoids duplicate page views and conversions.

Choose exactly one Google Ads delivery path:

- **GTM-owned:** configure `PUBLIC_GTM_CONTAINER_ID` and leave the direct Google Ads ID and audit label blank.
- **Direct Google tag:** configure `PUBLIC_GOOGLE_ADS_CONVERSION_ID` and `PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL`, and do not create an equivalent Google Ads conversion tag in GTM.

The production validator also rejects a GTM container combined with direct Google Ads values.

## Event contract

All landing-page events use lowercase snake case. `page_path` contains only the pathname, never the query string. `hero_variant` may be included when the event originates on the Free Business Systems Audit landing page.

| Event | Trigger | Required properties | Optional properties | Conversion |
| --- | --- | --- | --- | --- |
| `page_view` | One consented page load. The shared analytics layer disables GA4's automatic page view and emits this event once per page lifecycle to direct GA4 and GTM. Do not call the custom wrapper for page views. | `page_path` | None | No |
| `free_audit_cta_clicked` | One physical activation of a primary audit CTA. Hero, navigation, section, and sticky-mobile placements use the same event. | `location`, `page_path` | `cta_location` compatibility alias, `link_text`, `item_id`, `hero_variant` | Intent only |
| `estimate_request_cta_clicked` | One physical activation of a CTA that opens the Project Estimate route or its form. | `location`, `page_path` | `cta_location` compatibility alias, `link_text`, `item_id` | Intent only |
| `calculator_started` | First user change to any ROI calculator input in the current page lifecycle. | `calculator_name`, `page_path` | `hero_variant` | No |
| `calculator_completed` | The calculator has valid inputs and renders its complete result for the first time after user interaction. Do not fire on initial default rendering or every input change. | `calculator_name`, `page_path` | `completion_method`, `hero_variant` | Supporting |
| `audit_started` | First meaningful interaction with the audit request. | `form_name`, `page_path` | `form_version`, `source`, `hero_variant` | No |
| `audit_step_completed` | A step validates successfully and the visitor advances, once per step per page attempt. | `form_name`, `step_number`, `step_name`, `page_path` | `form_version`, `hero_variant` | No |
| `audit_abandoned` | The page is left after the form started and before an accepted submission, at most once per page lifecycle. | `form_name`, `last_step`, `page_path` | `form_version`, `hero_variant` | No; directional |
| `audit_submitted` | The API confirms that the lead was durably accepted. | `form_name`, `duplicate`, `page_path` | `form_version`, `source`, `hero_variant` | Yes only when `duplicate` is `false` |
| `qualify_lead` | The API accepts a unique audit request. This GA4-recommended event is the primary key event for Google Ads optimization. | `form_name`, `lead_source`, `page_path` | `form_version`, `hero_variant` | Yes |
| `audit_submission_error` | Validation passes locally but the API, storage, or delivery path fails. | `form_name`, `error_type`, `page_path` | `form_version`, `last_step`, `hero_variant` | No |
| `contact_click` | A visitor activates a `tel:` or `mailto:` link. | `contact_method`, `page_path` | `location`, `hero_variant` | Supporting |
| `estimate_request_started` | First meaningful interaction with the Project Estimate form. | `form_name`, `page_path` | None | No |
| `estimate_request_submitted` | Netlify accepts the Project Estimate form. | `form_name`, `page_path` | `source` | Yes |
| `estimate_request_error` | The Project Estimate form passes local validation but delivery fails. | `form_name`, `page_path` | None | No |
| `review_source_clicked` | A visitor opens the public Google review source from the customer-feedback section. | `location`, `page_path` | `item_id`, `link_text` | Supporting intent only |
| `faq_opened` | An FAQ disclosure changes from closed to open. | `faq_id`, `page_path` | `hero_variant` | No |
| `scroll_depth` | The page crosses 25%, 50%, 75%, or 90% for the first time in the current page lifecycle. | `percent`, `page_path` | `page_type`, `hero_variant` | No |

`free_audit_cta_clicked` is the canonical primary-audit CTA event. Use the `location` property (`hero`, `navigation`, `section`, `sticky_mobile`, or another authored slug) instead of creating separate hero-CTA and navigation-CTA event names. Informational in-page links such as “See how it works” must not emit this event. `estimate_request_cta_clicked` applies the same rule to Project Estimate entry points.

## Dispatch behavior

`window.velixonAnalytics.track(name, properties)` is the only shared custom-event entry point.

- The wrapper accepts GA4-compatible event names and a narrow property allowlist.
- Unknown properties, objects, arrays, non-finite numbers, likely email addresses, and likely phone numbers are dropped before dispatch.
- After consent, each call pushes one canonical `{ event, ...properties }` object to GTM when configured and one `gtag("event", ...)` command to direct GA4 when configured.
- Page-view ownership is separate from custom calls: the shared layer sets `send_page_view: false` on direct GA4 and emits one safe `page_view` with `page_path` after consent. The wrapper ignores manual `page_view` calls.
- Loader and configuration guards prevent the wrapper from inserting a destination script more than once.
- Clarity does not receive the custom property object from this wrapper.

Keep the GTM container equally restrictive. A tag in GTM can read the entire page or data layer, so container configuration must not scrape form values or reintroduce fields blocked by the site wrapper.

## Privacy and attribution

The operational lead record may store these first-touch attribution fields:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- landing page
- referral source
- capture time
- submission page
- landing-page variant

UTM values, Google Ads click identifiers (`gclid`, `gbraid`, `wbraid`), `fbclid`, referrer URLs, and raw query strings are not emitted as analytics event properties. They belong to the consent-independent lead-attribution record described in the privacy policy, not GA4, GTM custom events, or Clarity custom events.

Never send names, email addresses, phone numbers, business names, websites entered by a visitor, free-form answers, current software, budget, revenue, timeline, exact calculator inputs, or exact calculator outputs to analytics.
Review interactions must not send reviewer names, review excerpts, Google query strings, or Google place identifiers. The source-click event uses only the authored placement, page path, safe link label, and normalized destination hostname.

Before enabling Clarity, verify the project belongs to Velixon, enable the appropriate consent settings, and confirm that all form controls and submitted/success states are masked as required. Do not use recordings to expose lead data.

## Consent behavior

- The consent banner appears when at least one valid GA4, GTM, or Clarity ID is configured.
- No external analytics or recording script loads before `granted` consent.
- Up to 50 safe events may wait in memory while no choice exists. Granting consent flushes them; declining consent discards them.
- The decision is stored as `velixon_analytics_consent` in local storage and can be revisited through the footer preferences control.
- Google `analytics_storage` follows the visitor's choice. Advertising storage, ad user data, ad personalization, Google signals, and advertising-personalization signals remain denied.
- Clarity receives `analytics_Storage: granted` only after consent and `analytics_Storage: denied` when consent is withdrawn. Clarity ad storage remains denied.
- Lead attribution and form delivery do not depend on optional analytics consent.

## Conversion setup

Mark these as key events in the chosen reporting destination only after production verification:

1. `qualify_lead`, emitted only for an `audit_submitted` response where `duplicate` is `false`.

Treat CTA clicks, calculator completion, phone clicks, and email clicks as supporting intent. They do not prove that a qualified lead exists. Optional strategy calls are arranged manually after audit delivery and are not a browser conversion event.

## Exact GTM setup

Use this path when GTM owns Google Ads conversion delivery.

1. In Google Ads, open **Goals → Conversions → Summary**.
2. Create a **Website** conversion action named `Free audit - validated submission`.
   - Goal category: **Submit lead form**
   - Value: **Do not use a value** unless Velixon later approves a defensible value model
   - Count: **One**
   - Click-through window: **30 days**
   - Engaged-view window: **3 days** if offered
   - View-through window: **1 day**
   - Attribution: **Data-driven**
   - Primary action: **Yes**
3. Copy the action's conversion ID (`AW-...`) and conversion label. Do not paste them into source files.
4. In GTM, create this Custom Event trigger:
   - `CE - qualify_lead`: Event name exactly `qualify_lead`, regex matching off
5. Create a **Conversion Linker** tag with the trigger **All Pages**. Do not add cross-domain linking without a separately verified need.
6. Create one **Google Ads Conversion Tracking** tag:
   - `Google Ads - Validated audit submission`: use the validated-submission ID and label; trigger `CE - qualify_lead`
   - Leave value, currency, order ID, and enhanced-conversion fields unset. The site intentionally sends no PII to the data layer.
7. In GTM Consent Settings, require `analytics_storage`. The site keeps `ad_storage`, `ad_user_data`, and `ad_personalization` denied. Do not configure a tag to bypass consent checks.
8. In Netlify, set `PUBLIC_GTM_CONTAINER_ID` for the intended deploy contexts and leave the direct Google Ads ID and audit label blank.
9. Use GTM Preview on a deploy preview. Grant analytics, then verify:
    - one `qualify_lead` event and one validated-submission tag fire after a unique accepted API response;
    - a duplicate API response does not fire `qualify_lead`;
    - the tag does not fire when analytics is declined.
10. Publish the GTM container only after preview evidence is clean. Publishing the container does not create or publish an ad campaign.

## Exact direct Google tag setup

Use this only when GTM does not own the audit conversion tag.

1. Create the same Google Ads conversion action and copy the `AW-...` ID and label.
2. In Netlify, set:

   ```text
   PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-123456789
   PUBLIC_GOOGLE_ADS_AUDIT_CONVERSION_LABEL=replace_with_google_ads_label
   ```

3. Leave both values blank to disable direct conversion delivery. Do not put API keys, OAuth tokens, customer IDs, email addresses, or form values in these variables.
4. Remove or pause equivalent Google Ads conversion tags in GTM before enabling the direct variables.
5. After analytics consent, the site loads one Google tag and maps `qualify_lead` to a `conversion` command with `send_to` set to the configured ID/label. It sends no value, currency, transaction ID, enhanced-conversion data, contact data, or click ID.
6. Verify with Tag Assistant and the Google Ads conversion-action diagnostics before making the action primary.

## Google Ads optimization guardrails

- Optimize bidding to `Free audit - validated submission` only after it is receiving one conversion per unique stored submission.
- Do not import both the GA4 `qualify_lead` key event and a native Google Ads conversion tag as primary goals for the same action.
- Do not mark `audit_submitted`, CTA clicks, phone clicks, or email clicks as primary conversions.
- Preserve Google Ads auto-tagging. The site stores first-touch `gclid`, `gbraid`, and `wbraid` with the operational lead whether optional analytics is accepted or declined, but never emits those identifiers in analytics event properties.
- This setup does not create, enable, or publish a Google Ads campaign.

## Manual verification

Use test properties or destination preview modes; never commit production IDs.

1. With all analytics and direct-conversion IDs blank, confirm no consent banner, GA4, GTM, Google Ads, or Clarity request appears and the page remains fully usable.
2. With each destination configured independently, decline consent and confirm its external script never loads, pending events are discarded, and form attribution still persists.
3. Grant consent and confirm no more than one Google tag script, one GTM container script, and one Clarity script are inserted.
4. In Google Tag Assistant, inspect the data layer and confirm each custom interaction produces one object with the canonical event name and only documented properties.
5. In GA4 DebugView, confirm `page_view` fires once and each interaction event fires once. A GTM GA4 tag must trigger from the canonical `page_view` data-layer event, not an additional Initialization or All Pages trigger. If GTM also contains GA4 tags, explicitly test for duplicate page views and conversions.
6. Confirm `free_audit_cta_clicked` uses one event name across hero, navigation, section, and sticky-mobile CTAs while `location` distinguishes them.
7. Change calculator inputs repeatedly. Confirm one `calculator_started` and one `calculator_completed`, with no raw inputs or result values in the payload.
8. Move forward, backward, and forward again through the form. Confirm each validated step fires once per page attempt and invalid steps do not fire.
9. Test accepted, duplicate, validation-error, storage-error, and offline submissions. Only an accepted non-duplicate submission is a primary conversion.
10. Confirm no public booking URL, scheduler iframe, provider script, calendar event, or booked-call event appears.
11. Open and close the same FAQ repeatedly and verify the chosen once-per-open behavior matches the implementation without sending the answer text.
12. Cross 25%, 50%, 75%, and 90% in both directions and confirm each threshold fires once per page lifecycle.
13. Open the Google review source from the summary and from a review card. Confirm one `review_source_clicked` event per activation, distinct from the audit CTA event, with no reviewer name, excerpt, or Google query string.
14. Inspect every event object for names, emails, phone numbers, free-form text, raw attribution, budget, revenue, timeline, and calculator values.
15. Withdraw consent after granting it. Confirm subsequent GA4/GTM events are blocked and Clarity receives denied analytics storage.
16. Configure an invalid `AW-...` ID or label in a safe local build. Confirm the value is rejected, no conversion destination loads, and diagnostics print only variable names—not configured values.
