
import { MailSlurp } from 'mailslurp-client';
import { buyerPortalData } from '../data/buyerPortalData';
const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_ID });
const { I } = inject();
var emailId: any
var inboxId: any

export = {
  // Element by Class
  async elementByClass(text: string) {
    return `//*[@class='${text}']`;
  },
  async elementByRoleTabAndText(value: string) {
    return `//*[@role='tab' and text()='${value}']`
  },
  //Element by Placeholder
  async elementByPlaceholder(text: string) {
    return `//*[@placeholder="${text}"]`;
  },
  async anyButtonTypeElement(text: string) {
    return `//*[@type="button"]//child::span[text()='${text}']`
  },
  async selectedPageName(pagePath: string) {
    return `//*[contains(@class,'ant-menu-item-selected') and contains(@data-menu-id,'${pagePath}')]`
  },
  async elementById(text: string) {
    return `//*[@Id='${text}']`;
  },
  // Element by title
  async elementByTitle(text: string) {
    return `//*[@title='${text}']`;
  },
  async elementByText(text: string) {
    return `//*[text()='${text}']`;
  },
  async seletedDigitalAssetName(digitalAssetName: string) {
    return `//*[@type="[object Object]"]//following::div[@class="info-digitalasset-table"]//child::span[@class="digitalAssetTitle" and text()='${digitalAssetName}']`
  },
  async portalMenuOptions(portalType: string, menuOption: string) {
    return `(//*[text()='${portalType}']//following::span[text()='${menuOption}'])[1]`
  },
  async orderGripLinesOfSelectedDigitalAsset(digitalAssetName: string) {
    return `//*[text()='${digitalAssetName}']//ancestor::tr//child::td//child::*[name()='svg' and @data-icon="grip-lines"]`
  },
  async selectedAdHocDigitalAssetPositionInList(positionNumber: number) {
    return `//*[@class="ant-table-tbody"]//tr[@role='button'][${positionNumber}]`
  },
  async allSelectedDigitalAsset() {
    return `//*[@class="ant-table-tbody"]//following::td[@type="[object Object]"]//following::span[@class="digitalAssetTitle"]`
  },

  // Login page methods
  async Login(emailId: string, password: string) {
    // go to URL
    I.amOnPage("/");

    // enter data in email field
    I.waitForElement(await this.elementById(buyerPortalData.elements.emailFieldId), 20,);
    I.click(this.email);
    I.fillField(await
      this.elementById(buyerPortalData.elements.emailFieldId), emailId,);

    // click on next button
    I.click(await this.elementByText(buyerPortalData.elements.nextButtonText));

    // enter data in password field
    I.waitForElement(await this.elementById(buyerPortalData.elements.passwordFieldId), 5,);
    I.click(await this.elementById(buyerPortalData.elements.passwordFieldId));
    I.fillField(await this.elementById(buyerPortalData.elements.passwordFieldId), password,);
    I.waitForElement(await this.elementByText(buyerPortalData.elements.submitButtonText), 5,);

    //click on submit button
    I.click(await this.elementByText(buyerPortalData.elements.submitButtonText));
  },
  // buyer portal  method
  async verifyHomeDashboard() {
    // verify buyer portal title
    I.waitForElement(await
      this.elementByText(buyerPortalData.elements.buyerPortalHeadingText), 180);
  },
  async selectDeselectDigitalAsset(type: string, assetName: string) {
    // check or uncheck any digital asset
    switch (type) {
      case 'select':
        // grab the value of check box if it is already checked
        var test = await I.grabTextFromAll(await this.allSelectedDigitalAsset())
        if (test.includes(assetName)) {
          return
        }
        else {
          // click on search bar
          I.waitForElement(await this.elementByPlaceholder(buyerPortalData.elements.searchTitleAndDescriptionField), 5)
          I.click(await this.elementByPlaceholder(buyerPortalData.elements.searchTitleAndDescriptionField))
          // enter digital asset name in search field
          I.fillField(await this.elementByPlaceholder(buyerPortalData.elements.searchTitleAndDescriptionField), assetName)
          // verify digital asset name after searching
          I.waitForElement(await this.selectAnyBuyerPortalDigitalAssetCheckBox(assetName), 10)
          // click on digital asset name checkbox
          I.click(await this.selectAnyBuyerPortalDigitalAssetCheckBox(assetName))
          I.wait(1)
        }
        break;
      case 'deselect':
        // grab the value of check box if it is already checked
        var test = await I.grabTextFromAll(await this.allSelectedDigitalAsset())
        if (test.includes(assetName)) {
          // click on search bar
          I.waitForElement(await this.elementByPlaceholder(buyerPortalData.elements.searchTitleAndDescriptionField), 5)
          I.click(await this.elementByPlaceholder(buyerPortalData.elements.searchTitleAndDescriptionField))
          // enter digital asset name in search field
          I.fillField(await this.elementByPlaceholder(buyerPortalData.elements.searchTitleAndDescriptionField), assetName)
          // verify digital asset name after searching
          I.waitForElement(await this.uncheckAnyDigitalAsset(assetName), 10)
          // click on digital asset name checkbox
          I.click(await this.uncheckAnyDigitalAsset(assetName))
          I.wait(1)
        }
        else {
          return
        }
        break
      default: console.error('Invalid option')
    }
  },
  async saveTheProfile() {
    // click on save button
    I.waitForElement(await
      this.elementByText(buyerPortalData.elements.saveButtonText),
      6,
    );
    I.click(await this.elementByText(buyerPortalData.elements.saveButtonText));
  },
  async verifyUpdatedProfileDetails() {
    // verify user linkedin profile
    // go to linkedIn profile URL field
    I.scrollTo(await
      this.elementByName(buyerPortalData.elements.userLinkedInProfileField),
    );

    // verify user linkedInProfile
    I.waitForElement(await
      this.elementByValue(
        buyerPortalData.data.userLinkedInProfileURLValue,
      ),
      2,
    );

    // verify updated title field data
    // go to title field
    I.scrollTo(await this.elementByTitle(buyerPortalData.elements.titleFieldTitle));

    // verify title field value
    I.waitForElement(await
      this.elementByTitle(buyerPortalData.elements.titleFieldName),
      5,
    );
    let titleValue = I.grabValueFrom(await
      this.elementByTitle(buyerPortalData.elements.titleFieldName),
    );

    // go to user profile title
    I.scrollTo(await
      this.elementByText(buyerPortalData.elements.pictureAvatarText),
    );
    I.waitForElement(await
      this.elementByText(buyerPortalData.elements.pictureAvatarText),
      3,
    );

    // verify image thumbNail
    I.waitForElement(await
      this.elementByClass(
        buyerPortalData.elements.profileImageThumbNailIconClass,
      ),
    );
  },

  async verifyUpdatedProfileImage() {
    // go to user profile title
    I.scrollTo(await
      this.elementByText(buyerPortalData.elements.pictureAvatarText),
    );
    I.waitForElement(await
      this.elementByText(buyerPortalData.elements.pictureAvatarText),
      3,
    );

    // verify image thumbNail
    I.waitForElement(await
      this.elementByClass(
        buyerPortalData.elements.profileImageThumbNailIconClass,
      ),
    );
  },
}