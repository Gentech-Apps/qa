// import { assert } from "console";
import { buyerPortalData } from "../data/buyerPortalData";
import { Given, When, Then } from '@cucumber/cucumber';
import buyerPortalPage from "../pages/buyerPortalPage";
const { I } = inject();
const assert = require('assert');


Given("I am logged in as tenant user", async () => {
  // login with any user
  await buyerPortalPage.Login(process.env.TENANT_ADMIN_USER_NAME, process.env.TENANT_ADMIN_PASSWORD,);
});

Given("I am present on dashboard page", async () => {
  // verify user is on dashboard page
  await buyerPortalPage.verifyHomeDashboard();
});

When("I open {string} tab of {string} portal", async (menuOptions, portalType) => {
  // verify portal option from the list
  I.waitForElement(await buyerPortalPage.portalMenuOptions(portalType, menuOptions), 10)
  // click on option
  I.click(await buyerPortalPage.portalMenuOptions(portalType, menuOptions))
  I.wait(1)
})

Given("I am present on Portal page of buyer portal", async () => {
  // verify  portal page header
  I.waitForElement(await
    buyerPortalPage.elementByText(buyerPortalData.elements.buyerPortalHeadingText),
    1
  );
  // verify my portal tab
  I.waitForElement(await
    buyerPortalPage.elementByText(buyerPortalData.elements.myPortalTabText),
    2
  );
  // verify All portal tab
  I.waitForElement(await
    buyerPortalPage.elementByText(buyerPortalData.elements.allPortalsTabText),
    2
  );
  // verify portal grid class
  I.waitForElement(await
    buyerPortalPage.elementByClass(buyerPortalData.elements.gridClass),
    2
  );
});

Then("I go to all portal's tab", async () => {
  // verify all portal tab text
  I.waitForElement(await buyerPortalPage.elementByRoleTabAndText(buyerPortalData.elements.allPortalTabText), 10)
  // click on all portal tab
  I.click(await buyerPortalPage.elementByRoleTabAndText(buyerPortalData.elements.allPortalTabText))
})

When("I open {string} portal from the portal grid list", async (portalName) => {
  // click on search bar
  I.waitForElement(await buyerPortalPage.elementByPlaceholder(buyerPortalData.elements.portalPageSearchFieldPlaceholder), 100)
  //Verify search field
  I.waitForElement(await buyerPortalPage.elementByPlaceholder(buyerPortalData.elements.portalPageSearchFieldPlaceholder), 100)
  //Click on the search field
  I.click(await buyerPortalPage.elementByPlaceholder(buyerPortalData.elements.portalPageSearchFieldPlaceholder))
  // enter portal name in search field
  I.fillField(await buyerPortalPage.elementByPlaceholder(buyerPortalData.elements.portalPageSearchFieldPlaceholder), portalName)
  // verify portal name after searching in the list
  I.waitForElement(await buyerPortalPage.anyButtonTypeElement(portalName), 30)
  // click on portal name
  I.click(await buyerPortalPage.anyButtonTypeElement(portalName))
})

Then("I should redirect to member tab of newly created Portal {string} {string} details page", async (portalName, templateName) => {
  // verify template name on header
  I.waitForElement(await buyerPortalPage.elementByText(templateName), 10)
  // verify add member button on template page
  I.waitForElement(await buyerPortalPage.anyButtonTypeElement(portalData.elements.addMemberButtonText), 30)
  // verify default selected tab name
  I.waitForElement(await buyerPortalPage.selectedPageName(buyerPortalData.elements.memberTabPath), 30)
});

Then("I go to the Digital Assets tab", async () => {
  // verify disclaimer tab
  I.waitForElement(await buyerPortalPage.elementByText(buyerPortalData.elements.digitalAssetTab), 10)
  // click on disclaimer tab
  I.click(await buyerPortalPage.elementByText(buyerPortalData.elements.digitalAssetTab))
  // verify access disclaimer card tile title
  I.waitForElement(await buyerPortalPage.elementByTitle(buyerPortalData.elements.digitalAssetPageTitle), 10)
})

Then("I click on Change Digital Assets button", async () => {
  // verify digital assets button
  I.waitForElement(await buyerPortalPage.anyButtonTypeElement(buyerPortalData.elements.changeDigitalAssetsButtonText), 20)
  // click on change digital asset button
  I.click(await buyerPortalPage.anyButtonTypeElement(buyerPortalData.elements.changeDigitalAssetsButtonText))
  I.wait(5)
})

Then("I {string} digital assets {string} from digital asset section", async (type, digitlAssetName) => {
  //select or deselect any digital asset
  await buyerPortalPage.selectDeselectDigitalAsset(type, digitlAssetName)
})

Then("I should see selected digital assets {string} in Selected Digital Assets section", async (digitalAssetName) => {
  // verify right side digital asset section is nor empty
  I.dontSeeElement(await buyerPortalPage.elementByClass('ant-empty-image'))
  // verify selected digital asset name on the right side of the section
  I.waitForElement(await buyerPortalPage.seletedDigitalAssetName(digitalAssetName))
})

Then("I click on the save button", async () => {
  // save user profile
  await buyerPortalData.saveTheProfile();
});

Then("I should see a portal updated success message", async () => {
  // attach template image
  I.waitForElement(await buyerPortalPage.elementByText(portalData.elements.portalUpdatedSuccessMessage), 10)
});

Then("I change order of {string} digital asset to {int}", async (digitalAssetName, position) => {
  // verify selected Ad Hoc digital asset grid title
  I.waitForElement(await buyerPortalPage.elementByText(await buyerPortalData.elements.selectedAdHocGridTitle), 20)
  // verify digital asset order grip line in selected adhoc digital asset list
  I.waitForElement(await buyerPortalPage.orderGripLinesOfSelectedDigitalAsset(digitalAssetName))
  // drag and drop the asset based on the order number
  I.dragAndDrop(await buyerPortalPage.orderGripLinesOfSelectedDigitalAsset(digitalAssetName), await buyerPortalPage.selectedAdHocDigitalAssetPositionInList(position), { sourcePosition: { x: 10, y: 10 } })
})

Then("I should see {string} digital asset order position is set to {int}", async (digitalAssetName, positionCount) => {
  // find the position of digital asset in grid
  var test = await I.grabTextFromAll(await buyerPortalPage.allSelectedDigitalAsset())
  // grab actual order number of digital asset
  var actualOrderNumber = test.indexOf(digitalAssetName);
  var expectedOrderNumber = (positionCount - 1)
  // verify the actual and expected order number
  assert.equal(actualOrderNumber, expectedOrderNumber)
})

Then("I should see a portal updated success message", async () => {
  // attach template image
  I.waitForElement(await buyerPortalPage.elementByText(portalData.elements.portalUpdatedSuccessMessage), 10)
});

Then("I should see {string} digital asset order position is set to {int}", async (digitalAssetName, positionCount) => {
  // find the position of digital asset in grid
  var test = await I.grabTextFromAll(await buyerPortalPage.allSelectedDigitalAsset())
  // grab actual order number of digital asset
  var actualOrderNumber = test.indexOf(digitalAssetName);
  var expectedOrderNumber = (positionCount - 1)
  // verify the actual and expected order number
  assert.equal(actualOrderNumber, expectedOrderNumber)
})