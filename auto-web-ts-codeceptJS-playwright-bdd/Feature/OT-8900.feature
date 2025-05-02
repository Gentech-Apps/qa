Feature: change order functionality of digital asset

    Background:
        Given I am logged in as tenant user
        And I am present on dashboard page
        And I open "Portals" tab of "Buyer Portals" portal
        And I am present on Portal page of buyer portal
        And I go to all portal's tab
    @TEST_OT-8900 @Regression @Regression3 @buyerPortal2 @smoke2 @dailyRegression
    Scenario Outline: verify reordering functionality of digital asset in digital asset tab of buyer portal
        Given I open "<portalName>" portal from the portal grid list
        And I should redirect to member tab of newly created Portal "<portalName>" "<templateName>" details page
        And I go to the Digital Assets tab
        And I click on Change Digital Assets button
        And I "select" digital assets "<digitalAssetName>" from digital asset section
        And I should see selected digital assets "<digitalAssetName>" in Selected Digital Assets section
        And I click on the save button
        And I should see a portal updated success message
        And I click on Change Digital Assets button
        When I change order of "<digitalAssetName>" digital asset to 4
        Then I should see "<digitalAssetName>" digital asset order position is set to 4
        And I click on the save button
        And I should see a portal updated success message
        And I should see "<digitalAssetName>" digital asset order position is set to 4 on the digital asset grid
        Examples:
            | digitalAssetName | portalName | templateName      |
            | xyrt 4567        | XYZ portal | ABC sample portal |