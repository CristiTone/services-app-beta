---
name: Push without interruption
description: User wants git commits and pushes done in one shot, no confirmation prompts
type: feedback
---

Always stage, commit, and push in a single uninterrupted sequence. Do not stop between steps to show status or ask for confirmation before pushing.

**Why:** User repeatedly interrupted multi-step push flows asking to "push all" — they expect it done in one go.
**How to apply:** When pushing, run `git add -A && git commit ... && git push` as a single chained command.
