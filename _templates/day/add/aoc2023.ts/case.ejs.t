---
inject: true
to: aoc2023.ts
before: case "test"
skip_if: case "<%= `${parseInt(day)}` %>"
---
    case "<%= `${parseInt(day)}` %>": day = new Day<%= day %>(isTest);break;