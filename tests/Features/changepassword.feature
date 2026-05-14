Feature: Change Password Functionality


    Scenario: Verify change password page opens

        Given User opens profile section
        When User clicks on My Profile
        And User clicks on Change Password
        Then Change Password screen should open successfully



    Scenario Outline: Verify password validation scenarios

        Given User opens profile section
        When User clicks on My Profile
        And User clicks on Change Password
        And User enters current password "<currentPassword>"
        And User enters new password "<newPassword>"
        And User enters confirm password "<confirmPassword>"
        And User takes password change screenshot
        And User clicks on Save button
        Then "<validationType>" should be displayed

    Examples:
        | currentPassword | newPassword           | confirmPassword      | validationType                    |
        | OldPass123      | NewPass123            | NewPass123           | Password changed successfully     |
        | OldPass123      | Ab@123                | Ab@123               | Password policy validation        |
        | OldPass123      | MagicPassword@12345   | MagicPassword@12345  | Password policy validation        |
        | OldPass123      | Magic@Pass            | Magic@Pass           | Password policy validation        |
        | OldPass123      | Magic1234             | Magic1234            | Password policy validation        |
        | OldPass123      | @1234567              | @1234567             | Password policy validation        |
        | OldPass123      | Magic~123             | Magic~123            | Password policy validation        |
        | OldPass123      | Magic@123             | Magic@124            | Password mismatch validation      |
        | Wrong@123       | Magic@123             | Magic@123            | Invalid current password validation |



    Scenario Outline: Verify password acceptance scenarios

        Given User opens profile section
        When User clicks on My Profile
        And User clicks on Change Password
        And User enters current password "<currentPassword>"
        And User enters new password "<newPassword>"
        And User enters confirm password "<confirmPassword>"
        Then "<validationType>" should be displayed

    Examples:
        | currentPassword | newPassword    | confirmPassword | validationType                    |
        | OldPass123      | Abc@1234       | Abc@1234        | Password accepted                 |
        | OldPass123      | Magic@1234567  | Magic@1234567   | Password accepted                 |
        | OldPass123      | Test@123       | Test@123        | Password accepted                 |
        | OldPass123      | Magic@123      | Magic@123       | Confirm password matched          |



    Scenario: Verify empty field validation

        Given User opens profile section
        When User clicks on My Profile
        And User clicks on Change Password
        And User clicks on Save button
        Then "Required field validation" should be displayed