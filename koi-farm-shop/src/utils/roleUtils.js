export const checkRoleAccess = (currentRole, allowedRoles) => {
  return allowedRoles.includes(currentRole);
};
