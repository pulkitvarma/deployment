import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { rowsObjectArray } from "./scheduledTest/modals/scheduleTest.modals";

export const Features = (event, index, tags) => {
  let p = document.getElementById(`master${index}`);
  let q = document.getElementById(`slave${index}`);
  if (event.target.checked) {
    p.style.backgroundColor = "rgba(255, 152, 0, 0.26)";
    q.style.color = "#FF9800";
    tags.push(event.target.value);
  } else {
    p.style.backgroundColor = "#E5E7ED";
    q.style.color = "#666F94";
    let r = [];
    tags.forEach(element => {
      if (element !== event.target.value) {
        r.push(element);
      }
    });
    tags = [...r];
  }
  return tags;
};

type filterRowsFunc = (rows: rowsObjectArray, selectedTags: Array<string>) => rowsObjectArray;
export const filterRows: filterRowsFunc = (rows, selectedTags) => {
  const filteredRows: rowsObjectArray = [];
  rows.forEach(row => {
    for (let key in row) {
      selectedTags.forEach(filteredItem => {
        if (row[key].toLowerCase() === filteredItem.toLowerCase()) {
          filteredRows.push(row);
        }
      });
    }
  });
  return filteredRows;
};

export const downloadPDF = (): void => {
  var HTML_Width = document.getElementById('myID').offsetWidth;
  var HTML_Height = document.getElementById('myID').offsetHeight;
  var top_left_margin = 0;
  if (HTML_Width && HTML_Height) {
    var PDF_Width = [HTML_Width + top_left_margin * 2];
    var PDF_Height = PDF_Width[0] * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    var svgElements = document.querySelectorAll("svg");
    svgElements.forEach(function (item) {
      let p = item.getBoundingClientRect().width;
      let q = item.getBoundingClientRect().height;
      item.setAttribute("width", p.toString());
      item.setAttribute("height", q.toString());
    });
    html2canvas(document.getElementById('myID')).then(function (canvas: any) {
      canvas.getContext("2d");
      var imgData = canvas.toDataURL("image/png", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width[0], PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, "portrait");
        pdf.addImage(
          imgData,
          "PNG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      pdf.save("HTML-Document.pdf");
    });
  }
};