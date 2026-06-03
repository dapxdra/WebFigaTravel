---
name: "Chat Recap Handoff"
description: "Recap everything done in the current chat before using /clear. Use when you need a compact but complete handoff of implemented changes, validations, open issues, and next steps."
argument-hint: "Optional focus area, file, or feature to emphasize"
agent: "agent"
tools: [read, search, execute]
---
Create a handoff summary for this repository based on the current workspace state and the recent work in this chat.

Focus on preserving continuity before `/clear`.

Include:
- Main objective reached so far
- Important code changes already implemented
- Files or areas most affected
- Build/lint/test checks already run and their result
- Remaining work, known risks, or unresolved issues
- Recommended immediate next step after the clear
- Any environment, Supabase, Vercel, or auth assumptions that matter for continuing

Requirements:
- Prefer current repository state over speculation
- Be concise but specific enough that a new chat can continue without re-discovery
- Mention concrete file paths when relevant
- If the user passed an argument, emphasize that area in the recap

Output format:
1. Goal summary
2. Completed work
3. Validation status
4. Open items
5. Next step
