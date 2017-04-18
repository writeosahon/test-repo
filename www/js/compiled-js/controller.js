/**
 * Created by UTOPIA SOFTWARE on 20/03/2017.
 */

/**
 * file defines all View-Models, Controllers and Event Listeners used by the app
 *
 * The 'utopiasoftware.laundrymart' namespace has being defined in the base js file.
 * The author uses the terms 'method' and function interchangeably; likewise the terms 'attribute' and 'property' are
 * also used interchangeably
 */


// define the controller namespace
utopiasoftware.template.controller = {

    /**
     * method is used to handle the special event created by the intel xdk developer library. The special event (app.Ready)
     * is triggered when ALL the hybrid app pluigins have been loaded/readied and also the document DOM content is ready
     */
    appReady: () => {

        // initialise the onsen library
        ons.ready(function () {
            // set the default handler for the app
            ons.setDefaultDeviceBackButtonListener(function(){
                console.log("DEFAULT BACK BUTTON LISTENER");
                // just hide the loader for fun sake
                $('#loader-modal').get(0).hide();
            });

            if(utopiasoftware.template.model.isAppReady === false){ // if app has not completed loading
                $('#loader-modal').get(0).show(); // show loader
            }

        });

        // set app ready flag to true
        utopiasoftware.template.model.isAppReady = true;
    },

    /**
     * object is view-model for swipe-delete page
     */
    swipeDeletePageViewModel: {

        /**
         * event is triggered when page is initialised
         */
        pageInit: function(){

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware.template.model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                var page = $('#template-navigator').get(0).topPage;
                page.onDeviceBackButton = function(){
                    ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
                        .then(function(index) {
                            if (index === 1) { // OK button
                                navigator.app.exitApp(); // Close the app
                            }
                        });
                };

                // listen for the change event of the carousel
                $('#swipe-delete-page #swipe-delete-list ons-carousel').on("postchange", function(postChangeEvent){
                    console.log("AUTO SCROLL RATIO", postChangeEvent.originalEvent.carousel.autoScrollRatio);
                    // remove the carousel that was swiped away from its parent list
                    $(this).remove();
                    Materialize.toast('Item Deleted <ons-button modifier="quiet" class="transparent light-green-text text-accent-3">Undo</ons-button>', 2750);
                });

                // hide the loader
                //$('#loader-modal').get(0).hide();

                // display a discovery feature
                setTimeout(function(){
                    $('.tap-target').tapTarget('open');
                    console.log("DISCOVERY FEATURE");
                }, 500); // call this function again after half a second
            }
        }
    },

    /**
     * object is view-model for fixed-header page
     */
    fixedHeaderPageViewModel: {

        previousScrollPosition: 0,

        currentScrollPosition: 0,

        /**
         * event is triggered when page is initialised
         */
        pageInit: function(){

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware.template.model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                var page = $('#template-navigator').get(0).topPage;
                page.onDeviceBackButton = function(){
                    ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
                        .then(function(index) {
                            if (index === 1) { // OK button
                                navigator.app.exitApp(); // Close the app
                            }
                        });
                };


                // add listen for the scene progress event. the listen will be used to collapse/expand the fixed header
                $('#fixed-header-page .page__content').on("scroll", utopiasoftware.template.controller.fixedHeaderPageViewModel.collapsibleHeaderHandler);
                console.log("ADDED PROGRESS LISTENER");

                utopiasoftware.template.controller.fixedHeaderPageViewModel.previousScrollPosition = 0;
                utopiasoftware.template.controller.fixedHeaderPageViewModel.currentScrollPosition = 0;
            }
        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function(){
            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware.template.model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 800); // call this function again after half a second
                    return;
                }


                // hide the loader
                $('#loader-modal').get(0).hide();
            }
        },

        /**
         * method is used to listen for scroll event used to collapse or expanse the fixed header
         *
         * @param event
         */
        collapsibleHeaderHandler: function(event){
            console.log("INSIDE PROGRESS LISTENER");

            // set the current scrolltop position
            utopiasoftware.template.controller.fixedHeaderPageViewModel.currentScrollPosition = $(this).scrollTop();

            if(utopiasoftware.template.controller.fixedHeaderPageViewModel.currentScrollPosition >
                utopiasoftware.template.controller.fixedHeaderPageViewModel.previousScrollPosition){ // user scrolled down
                // set the current position as previous position
                utopiasoftware.template.controller.fixedHeaderPageViewModel.previousScrollPosition =
                    utopiasoftware.template.controller.fixedHeaderPageViewModel.currentScrollPosition;

                // check if the collapsible header has been previously hidden. if not, hide it
                if(this.collapsibleHidden != true){ // collapsible header has not been hidden
                    $('#fixed-header-1').css('display', 'none'); // hide collapsible
                    this.collapsibleHidden = true; // flag that collapsible header has been hidden
                }

                return;
            }

            if(utopiasoftware.template.controller.fixedHeaderPageViewModel.currentScrollPosition <
                utopiasoftware.template.controller.fixedHeaderPageViewModel.previousScrollPosition){ // user scrolled up
                // set the current position as previous position
                utopiasoftware.template.controller.fixedHeaderPageViewModel.previousScrollPosition =
                    utopiasoftware.template.controller.fixedHeaderPageViewModel.currentScrollPosition;

                // check if the collapsible header has been previously shown. if not, show it
                if(this.collapsibleHidden == true){ // collapsible has been hidden
                    // collapsible header has not been hidden
                    $('#fixed-header-1').css('display', 'block'); // hide collapsible
                    this.collapsibleHidden = false; // flag that collapsible header has been shown
                }

                return;
            }
        }
    },

    /**
     * object is view-model for login page
     */
    loginPageViewModel: {

        /**
         * event is triggered when page is initialised
         */
        pageInit: function(){

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware.template.model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                var page = $('#template-navigator').get(0).topPage;
                page.onDeviceBackButton = function(){
                    ons.notification.confirm('Do you want to close the app?') // Ask for confirmation
                        .then(function(index) {
                            if (index === 1) { // OK button
                                navigator.app.exitApp(); // Close the app
                            }
                        });
                };

                $(".log-in").click(function(){
                    $(".signIn").addClass("active-dx");
                    $(".signUp").addClass("inactive-sx");
                    $(".signUp").removeClass("active-sx");
                    $(".signIn").removeClass("inactive-dx");
                });

                $(".back").click(function(){
                    $(".signUp").addClass("active-sx");
                    $(".signIn").addClass("inactive-dx");
                    $(".signIn").removeClass("active-dx");
                    $(".signUp").removeClass("inactive-sx");
                });

                // hide the loader
                $('#loader-modal').get(0).hide();
            }
        }
    }
};
