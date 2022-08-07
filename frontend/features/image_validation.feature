Feature: Image Validation
    As a user uploading my passport document
    I want to know that I have uploaded a good document
    So that I am able to fill up the form smoothly

    Background: Getting onto passport page
        Given I am signing up for myself
        And I have filled in my details

    Scenario: Uploading unsatisfactory images for passport
        When I upload a bad <image>
        Then I should observe <error>

    Examples:
        | image                 |      error                                   |
        | "blurry_passport.jpg" | "Image does not meet the requirements, please upload a new image" |
        | "not_passport.png"    | "This is not a valid passport image"         |
        | "textless.png"       | "This image does not have texts, try again with another image"                            |
        | "invalid_file.csv"    | "Only PNG or JPEG is accepted"               | 