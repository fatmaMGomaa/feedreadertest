/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a correct url', function () {
            // this function from stackoverflow (https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482)
            function validURL(str) {
                var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return !!pattern.test(str);
            };

            for(let feed of allFeeds){
                // if the string is null, undefined, empty string will return false (truthy and falsy)
                expect(Boolean(feed.url)).toBeTruthy();
                // to check that is string is a url
                expect(validURL(feed.url)).toBeTruthy();
            };
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function () {
            for (let feed of allFeeds) {
                // if the string is null, undefined, empty string will return false (truthy and falsy)
                expect(Boolean(feed.name)).toBeTruthy();
            };
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function () {
        
        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('menu element is hidden by default', function () {
            expect(document.body.classList.contains("menu-hidden")).toBeTruthy();
        });

        /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('menu changes visibility when the menu icon is clicked', function () {
            const menuButton = document.querySelector("a.menu-icon-link");
            menuButton.click();
            expect(document.body.classList.contains("menu-hidden")).toBeFalsy();
            menuButton.click();
            expect(document.body.classList.contains("menu-hidden")).toBeTruthy();
        });

    });
        
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it("should be a single .entry element within the .feed container after calling the loadFeed function", function (done) {
            const enteriesOfContainer = document.querySelectorAll(".feed .entry");
            expect(enteriesOfContainer.length).toBeGreaterThan(0);
            done();
        });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstFeed, secondFeed;
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1, function () {
                    secondFeed = document.querySelector(".feed").innerHTML;
                    done();
                });
            });
        });

        it("changing enteries when we change the feed", function (done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());
