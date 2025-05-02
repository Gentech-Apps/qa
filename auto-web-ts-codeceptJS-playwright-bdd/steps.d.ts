/// <reference types='codeceptjs' />
type buyerPortalPage = typeof import("./src/pages/buyerPortalPage");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    loginPage: loginPage;
    buyerPortalPage: buyerPortalPage;
    buyerPortalPage: buyerPortalPage;
    templatePage: templatePage;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
