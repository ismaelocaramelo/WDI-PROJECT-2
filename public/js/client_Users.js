"use strict";function init(){getToken()?loggedInState():loggedOutState(),$("body").on("click",".logout",logout),$("body").on("click",".userslogin",usersLogin),$("body").on("click",".usersNew",usersNew),$("body").on("submit",".usersCreate",usersCreate),$("body").on("submit",".usersloginform",usersloginResponse),$("body").on("click",".user_favourite",setFav),$("body").on("click",".fav",getFavourites)}function loggedInState(e){$("#button1").addClass("userindex").removeClass("userslogin"),$("#button2").addClass("logout").removeClass("usersNew").html("Log out"),e?($("#button1").html(e.username),setFavourite(e.favourites.length)):googleMap.getUserInfo(function(e){$("#button1").html(e.username),setFavourite(e.favourites.length)})}function loggedOutState(){$("#button1").addClass("userslogin").removeClass("userindex").html("Login"),$("#button2").addClass("usersNew").removeClass("logout").html("Sign up")}function logout(e){e.preventDefault(),setFavourite(""),removeToken(),loggedOutState()}function usersNew(e){e&&e.preventDefault(),$(".modal-content").html('\n    <form method="post" action="'+API+'/register" class="usersCreate">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Welcome to Green Points</h4>\n      </div>\n      <div class="modal-body">\n        <div class="form-group">\n          <label for="user_name">Name</label>\n          <input class="form-control" type="text" name="user[username]" id="user_name" placeholder="Name">\n        </div>\n        <div class="form-group">\n          <label for="user_email">Email</label>\n          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <label for="user_password">Password</label>\n          <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <label for="user_passwordConfirmation">Repeat password</label>\n          <input class="form-control" type="password" name="user[passwordConfirmation]" id="user_passwordConfirmation" placeholder="Repeat Password">\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Save</button>\n      </div>\n    </form>'),$(".modal").modal("show")}function usersCreate(e){e&&e.preventDefault(),$.ajax({url:$(this).attr("action"),type:$(this).attr("method"),data:$(this).serialize()}).done(function(){$(".modal").modal("hide")})}function usersLogin(e){e&&e.preventDefault(),$(".modal-content").html('\n    <form method="post" action="'+API+'/login" class="usersloginform">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Login</h4>\n      </div>\n      <div class="modal-body">\n        <div class="form-group">\n          <label for="user_email">Email</label>\n          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <label for="user_password">Password</label>\n          <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Save</button>\n      </div>\n    </form>'),$(".modal").modal("show")}function usersloginResponse(e){e&&e.preventDefault(),$.ajax({url:$(this).attr("action"),type:$(this).attr("method"),data:$(this).serialize()}).done(function(e){$(".modal").modal("hide"),e.token&&(setToken(e.token),loggedInState(e.user))})}function setRequestHeader(e){return e.setRequestHeader("Authorization","Bearer "+getToken())}function setToken(e){return window.localStorage.setItem("token",e)}function removeToken(){return window.localStorage.clear()}function getToken(){return window.localStorage.getItem("token")}function addFavourite(e){$.ajax({url:API+"/users/favourites/"+e.data("id"),method:"GET",beforeSend:function(e){setRequestHeader(e)}}).done(function(e){setFavourite(e.favourites.length),$(".modal").modal("hide")})}function removeFavourite(e){$.ajax({url:API+"/users/favourites/"+e.data("id"),method:"PUT",beforeSend:function(e){setRequestHeader(e)}}).done(function(e){setFavourite(e.favourites.length),$(".modal").modal("hide")})}function setFav(){if(null!==getToken()){var e=$(".user_favourite").data("action");"remove"===e?($(".user_favourite").removeClass("red-heart"),$(".user_favourite").addClass("heart"),$(".user_favourite").data("action","add"),removeFavourite($(".user_favourite"))):"add"===e&&($(".user_favourite").removeClass("heart"),$(".user_favourite").addClass("red-heart"),$(".user_favourite").data("action","remove"),addFavourite($(".user_favourite")))}else usersLogin()}function setFavourite(e){$(".fav").html(e)}function getFavourites(e){e&&e.preventDefault(),null!==getToken()?$.ajax({url:API+"/users/:id/favourites",method:"GET",beforeSend:function(e){setRequestHeader(e)}}).done(googleMap.loopThroughChargeSpots):usersLogin()}var $=$,API=window.location.origin,googleMap=googleMap||{};$(init);