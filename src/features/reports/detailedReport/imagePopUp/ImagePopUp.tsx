import React, { ReactElement } from "react";
import "./imagePopUp.scss";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "../../../../shared/Carousel/Carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import Modal from "../../../calibrateTest/sendCalibrate/modal/Modal";

interface Props {
  open: boolean;
  closeModal: Function;
  imageSrcs: Array<string>;
}
// const closeModal = () => {
//     const modal = document.getElementById("accountModal");
//     modal.style.display = "none";
//   };
export default function ImagePopUp(props: Props): ReactElement {
  return (
    <React.Fragment>
      {props.open ? (
        <div id="accountModal" className="modal image__popup">
          <Modal
            width="728px"
            onClose={() => props.closeModal()}
            dataToDisplay={
              <div className="popup-container">
                <Carousel images = {props.imageSrcs} />
                {/* </Carousel> */}
              </div>
            }
            title={"Images & Videos"}
          />
        </div>
      ) : (
        <span></span>
      )}

      {/* <Popup
                on="focus"
                modal
                open={props.open}
                closeOnDocumentClick
                repositionOnResize={true}
                onClose={()=>props.closeModal()}
            > */}

      {/* </Popup> */}
    </React.Fragment>
  );
}
