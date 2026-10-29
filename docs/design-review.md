# Design review

| Before                                                             | After                                                                   | Why                                                                               |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| White cards against a dark page and mismatched navigation surfaces | Shared light and dark surface, text, border, and accent tokens          | Makes content and navigation readable and cohesive in both system themes.         |
| Cards lifted eight pixels and animated all properties              | Cards stay in place; border and shadow respond briefly on pointer hover | Keeps a frequently used grid stable and limits motion to useful feedback.         |
| Descriptions were truncated and extra tags needed mouse hover      | Full descriptions and tags are visible                                  | Makes board details available to touch, keyboard, and assistive technology users. |
| Floating, icon-only sharing bar covered content                    | Labeled sharing and suggestion links sit in the page footer             | Keeps actions discoverable without obscuring boards.                              |
| Search empty state suggested nonexistent filters                   | Clear search is available in the empty state                            | Gives users a direct way back to results.                                         |
| Category and collection pages used different navigation            | Shared header, category navigation, and collection links                | Makes moving between sections consistent.                                         |
| Clipboard feedback reported success immediately                    | Feedback reflects the clipboard result and resets safely                | Avoids misleading users when copying fails.                                       |

Motion is deliberately quiet: repeated search and navigation actions do not animate, cards do not move, and pointer-only border feedback is short. Reduced-motion preferences disable transitions.
