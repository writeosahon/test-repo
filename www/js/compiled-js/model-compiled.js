"use strict";

/**
 * Created by UTOPIA SOFTWARE on 20/03/2017.
 */

/**
 * file contains the model data of the app.
 *
 * The 'utopiasoftware.template' namespace has being defined in the base js file.
 *
 * The author uses the terms 'method' and function interchangeably; likewise the terms 'attribute' and 'property' are
 * also used interchangeably
 */

// define the model namespace
utopiasoftware.template.model = {

  /**
   * property acts as a flag that indicates that all hybrid plugins and DOM content
   * have been successfully loaded. It relies on the special device ready event triggered by the
   * intel xdk (i.e. app.Ready) to set the flag.
   *
   * @type {boolean} flag for if the hybrid plugins and DOM content are ready for execution
   */
  isAppReady: false
};

// register the event listener for when all Hybrid plugins and document DOM are ready
document.addEventListener("app.Ready", utopiasoftware.template.controller.appReady, false);

// listen for the initialisation of the swipe-delete page
$(document).on("init", "#swipe-delete-page", utopiasoftware.template.controller.swipeDeletePageViewModel.pageInit);

// listen for the initialisation of the fixed-header page
$(document).on("init", "#fixed-header-page", utopiasoftware.template.controller.fixedHeaderPageViewModel.pageInit);

// listen for the initialisation of the fixed-header page
$(document).on("show", "#fixed-header-page", utopiasoftware.template.controller.fixedHeaderPageViewModel.pageShow);

// listen for the initialisation of the login page
$(document).on("init", "#login-page", utopiasoftware.template.controller.loginPageViewModel.pageInit);

//# sourceMappingURL=model-compiled.js.map