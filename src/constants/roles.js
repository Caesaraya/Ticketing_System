// Central definition of user roles. Import this everywhere instead of
// typing role strings by hand, so a typo becomes a build-time error
// instead of a silent auth bug.
export const ROLES = Object.freeze({
  USER: 'USER',
  PM: 'PM',
  STAFF: 'STAFF',
});
