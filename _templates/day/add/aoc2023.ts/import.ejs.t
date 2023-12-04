---
inject: true
to: aoc2023.ts
before: end imports
skip_if: import { Day<%= day %> }
---
import { Day<%= day %> } from './day<%= day %>/Day<%= day %>';