export const Priorities = {
  "majorGoal": { sort: { funds: 1 } },
  "minorGoal": { sort: { funds: -1 } },
  "primary": { query: { "details.priority": "primary" } },
  "secondary": { query: { "details.priority": "secondary" } },
  "mostValidated": { sort: { validations: 1 } },
  "poorValidated": { sort: { validations: -1 } },
  "recent": { sort: { createdAt: 1 } },
  "oldest": { sort: { createdAt: -1 } },
  "important": { sort: { funds: 1, validations: 1, } }
}