export const Priorities = {
  "majorGoal": { sort: { funds: 1 } },
  "minorGoal": { sort: { funds: -1 } },
  "primary": { query: { "detail.priority": { $exists: true, $eq: "primary" } } },
  "secondary": { query: { "detail.priority": { $exists: true, $eq: "secondary" } } },
  "mostValidated": { sort: { validations: 1 } },
  "poorValidated": { sort: { validations: -1 } },
  "recent": { sort: { createdAt: 1 } },
  "oldest": { sort: { createdAt: -1 } },
  "important": { sort: { funds: 1, validations: 1, } }
}

export const PrioritiesKeys = {
  "MajorGoal": "majorGoal",
  "MinorGoal": "minorGoal",
  "Primary": "primary",
  "Secondary": "secondary",
  "MostValidated": "mostValidated",
  "PoorValidated": "poorValidated",
  "Recent": "recent",
  "Oldest": "oldest",
  "Important": "important"
}



