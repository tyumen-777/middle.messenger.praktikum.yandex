export enum ROUTES {
  LOGIN = '/',
  SIGN_UP = '/sign-up',
  PROFILE_PAGE = '/settings',
  PROFILE_PAGE_EDIT = '/settings-edit',
  CHATS = '/chats',
  ERROR_PAGE = '/500',
  CHANGE_PASSWORD = '/change-password',
}

export const AuthRoutes = [ROUTES.PROFILE_PAGE, ROUTES.PROFILE_PAGE_EDIT, ROUTES.CHATS];
