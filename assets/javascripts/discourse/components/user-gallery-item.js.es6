import { postUrl } from "discourse/lib/utilities";
import discourseComputed from "discourse-common/utils/decorators";
import Component from "@ember/component";

export default Component.extend({
  //   @discourseComputed("item.topic_slug", "item.topic_id", "item.post_number")
  postUrl(slug, topicId, postNumber) {
    return postUrl(slug, topicId, postNumber);
  },
  didRender() {
    var location = window.location.href;
    // if(location.includes('portfolio')){ /old
    if (location.includes("gallery")) {
      //add the submit button only if the loged in user sees its own portfolio
      //skip it in dev
      var logInUser = api.getCurrentUser().username;
      var userPorfolio = window.location.pathname.split("/")[2];
      if (logInUser != userPorfolio && false) {
        return;
      }
      // console.log('img')

      var id = this.elementId;
      if (id) {
        //add a link to the image openning a div with all the open challenges
        var topicDetail = $("#" + id).find("a");
        var elementToAdd = $(
          '<div class="open-challenge-list"><a id="modal' + id + '">+</a></div>'
        );
        // topicDetail.prepend(elementToAdd)
        elementToAdd.insertBefore(topicDetail);

        //console.log('id found')

        //success so far

        //create the modal to be opened
        var linkOpeningSubmissionForm = $("#modal" + id);
        linkOpeningSubmissionForm.on("click", function (event) {
          //close all opened div
          //$('.challenge-wrapper').toggle()
          //check if the div exists
          var exists = $("#zbc-submission" + event.target.id);
          if (exists.length != 0) {
            exists.toggle();
          } else {
            //get the open challeges
            console.log("modal exists");
            var topicmetaid = event.target.id;

            $.ajax(
              "https://pixologic.com/zbc-challenge/get-challenges.php"
            ).then((res) => {
              var submissionDiv = $(
                '<div class="challenge-wrapper" id="zbc-submission' +
                  topicmetaid +
                  '"></div>'
              );
              var globalul = $("<ul class='ul-challenge'></ul>");
              for (const [key, value] of Object.entries(res)) {
                let challengeName = value["name"];
                let challengeId = value["topicid"];
                //check if the image is already submited to the challenge.
                //get the stream for this topic

                var liChallenge = $(
                  '<li data-challenge-id="' +
                    challengeId +
                    '" class="challenge-name">' +
                    challengeName +
                    '<span class="challenge-gallery-status">+</span></li>'
                );
                globalul.append(liChallenge);
              }
              submissionDiv.append(globalul);
              // var appen = $('#'+topicmetaid).parents('.topic-meta')
              var appen = $("#" + topicmetaid).parents(".item");
              //check if the image was already submited to the challenge
              $.ajax(
                "https://www3.zbrushcentral.com/u/" +
                  userPorfolio +
                  "/activity.json",
                {
                  headers: {
                    Accept: "application/json",
                  },
                }
              ).then((activity) => {
                //get the challenge id for the li attribute
                var lis = $(globalul).find("li");
                var data_topic_id = [];
                lis.each((index, el) => {
                  data_topic_id.push($(el).attr("data-challenge-id"));
                });
                //get the image link
                var imageLinki = $("#" + topicmetaid)
                  .parents(".item")
                  .children("a")
                  .find("img")
                  .attr("src");
                console.log(imageLinki);
                for (let act in activity) {
                  var topid = activity[act]["topic_id"];
                  if (
                    typeof topid !== "undefined" &&
                    data_topic_id.includes(topid.toString())
                  ) {
                    //if the user interacted with one of the challenge
                    //check if he posted the image
                    let cooked = activity[act]["cooked"];
                    var postIdDel = activity[act]["id"];
                    if (cooked.search(imageLinki) != -1) {
                      console.log("yes");
                      //the image has been used in a challenge
                      $("li[data-challenge-id='" + topid + "']")
                        .find("span")
                        .html("-");
                      //delete the onclick event to post the image and replace it by a onclick to delete the post
                      $("li[data-challenge-id='" + topid + "']").off("click");
                      $("li[data-challenge-id='" + topid + "']").on(
                        "click",
                        function (event) {
                          $.ajax("https://www3.zbrushcentral.com/posts.json", {
                            contentType: "application/json",
                            headers: {
                              "Api-Username":
                                window.location.pathname.split("/")[2],
                              "Api-Key":
                                "9410ad25edbc853073e7eda513f25f97a2dc2ed6c3f366597296ad1ab0447c15",
                            },
                            type: "DELETE",
                            data: JSON.stringify({
                              raw: "https:" + imgSrc,
                              topic_id: challengeid,
                            }),
                          });
                        }
                      );
                    }
                  }
                }
              });

              submissionDiv.prependTo(appen);

              //hide the menu is the user leave the image
              console.log("#" + topicmetaid);
              $("#zbc-submission" + topicmetaid).mouseleave(function () {
                $(this).hide();
              });

              //add the actual submission to the challenge
              $(".challenge-name").on("click", function (event) {
                //hide the challenge selection list
                $(".challenge-wrapper").hide();
                //show modal
                //passing the parameter to the model so they can be rendered in the modal
                let currentLocale = I18n.currentLocale();
                I18n.translations[
                  currentLocale
                ].js.challenge_submission_modal_title = "Challenge Entry";
                const showModal = require("discourse/lib/show-modal").default;

                var challengeId = $(this).attr("data-challenge-id");
                var imgSrc = $(this)
                  .parents(".topic-meta")
                  .siblings(".topic-thumbnail")
                  .find("img")
                  .attr("src");
                var challengeName = $(this).text();
                challengeName = challengeName.substring(
                  0,
                  challengeName.length - 1
                );
                var modalModel = {
                  challengeId: challengeId,
                  image: imgSrc,
                  challengeName: challengeName,
                };
                showModal("challengeSubmissionModal", {
                  model: modalModel,
                });

                // var challengeid = $(this).attr("data-challenge-id")
                // //post to the actual topic
                // var imgSrc = $(this).parents('.topic-meta').siblings('.topic-thumbnail').find('img').attr('src')
                // var username = window.location.pathname.split('/')[2]
                // $.ajax('https://www3.zbrushcentral.com/posts.json',{
                //     "contentType":"application/json",
                //     "headers": {
                //         'Api-Username': username,
                //         'Api-Key': '9410ad25edbc853073e7eda513f25f97a2dc2ed6c3f366597296ad1ab0447c15'
                //     },
                //     "type":"POST",
                //     "data":JSON.stringify({
                //         "raw":"https:"+imgSrc,
                //         "topic_id":challengeid
                //     })
                // }).then(res=>{
                //     console.log(res)
                // }).catch(err=>{
                //     console.log(err)
                // })
              });
            });
          }
        });
      }
    }
  },
});
