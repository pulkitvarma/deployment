import React, { useEffect } from "react";
import "./Carousel.scss";
import $ from "jquery";
interface Props {
  imageSrcs: Array<string>;
}
const Carousel = (props: any) => {
  useEffect(() => {
    let imgCount;
    let addId;
    let clicked;
    let findTheNumb;
    $(".left-arrow").hide();
    var numImgs = $("div.carousel-image-holder img").length;
    let containerWidth = 726 * numImgs + 100;
    $(".carousel-image-holder").css("width", containerWidth.toString());
    addId = numImgs;
    if (numImgs === 2) {
      clicked = 0;
      imgCount = numImgs - 2;
    } else if (numImgs <= 1) {
      $(".right-arrow").hide();
    } else {
      clicked = 1;
      imgCount = numImgs - 1;
    }
    // if (numImgs > 2) {
    //   for (var i = 0; i < numImgs; i++) {
    //     $("ul").prepend(
    //       '<li class="carousel-buttons" id="carousel' + addId + '"></li>'
    //     );
    //     addId = addId - 1;
    //   }
    // } else {
    // }

    $(".carousel-buttons").click(function() {
      var findIdClicked = $(this).attr("id");

      var splitString = findIdClicked.split("carousel");
      findTheNumb = splitString[1];

      $(".carousel-buttons").removeClass("active");
      $(this).addClass("active");
      clicked = parseInt(findTheNumb);
      let adjustNumberforSlide = findTheNumb - 1;

      $(".carousel-image-holder").animate({
        left: -(726 * adjustNumberforSlide) + "px"
      });

      if (findTheNumb === 1) {
        $(".left-arrow").hide();
        $(".right-arrow").show();
      } else if (findTheNumb === numImgs) {
        $(".right-arrow").hide();
        $(".left-arrow").show();
      } else {
        $(".right-arrow").show();
        $(".left-arrow").show();
      }
    });
    $(".right-arrow").click(function() {
      if (clicked < imgCount) {
        $(".carousel-image-holder").animate({ left: "-=726px" });
      } else {
        $(".carousel-image-holder").animate({ left: "-=726px" });
        $(".right-arrow").hide();
      }

      clicked = clicked + 1;
      $(".left-arrow").show();
      $(".carousel-buttons").removeClass("active");
      $("#carousel" + clicked).addClass("active");
    });

    $(".left-arrow").click(function() {
      if (clicked > 2) {
        $(".carousel-image-holder").animate({ left: "+=726px" });
      } else {
        $(".carousel-image-holder").animate({ left: "+=726px" });
        $(".left-arrow").hide();
      }
      $(".right-arrow").show();
      clicked = clicked - 1;
      $(".carousel-buttons").removeClass("active");
      $("#carousel" + clicked).addClass("active");
    });
  });
  return (
    <React.Fragment>
      <div className="carousel-container">
        <div className="left-arrow"></div>
        <div className="right-arrow"></div>
        <div className="carousel-image-holder">
          {props.images.map((el, index) => {
            return <img src={el} alt="image_record" className="carousel-Image" key={index} />;
          })}
        </div>
      </div>
      <div className="clear"></div>
    </React.Fragment>
  );
};
export default Carousel;
