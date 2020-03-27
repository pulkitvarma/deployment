export default class DataTransformationServcie {
  developRowsForReports = (
    rows: Array<{}>,
    rowsBpt: Array<{}>
  ): { gat: Array<{}>; bpt: Array<{}> } => {
    let rows1 = [];
    let rows2 = [];
    [...rows].forEach(
      (
        element: {
          rank: string;
          email: string;
          testDate: string;
          quant: string;
          verbal: string;
          di: string;
          total: string;
          id: string;
        },
        index: number
      ) => {
        const total = +element.total.slice(0, element.total.length - 1);
        let element1 = {
          rank: element.rank,
          email: element.email,
          testDate: element.testDate,
          quant: element.quant,
          verbal: element.verbal,
          di: element.di,
          total: "",
          id: index
        };
        const label = `
          <label class="total-score">${total + "%"}</label>
          <label class="tooltip-icon"><i class="info-icon"></i></label>`;
        if (total > 80) {
          element1.total = `
            <div class="total-button ${index + 1} dark-green">
             ${label}
            </div>
          `;
        } else if (total > 60) {
          element1.total = `
            <div class="total-button ${index + 1} light-green">
            ${label}
            </div>
          `;
        } else if (total > 40) {
          element1.total = `
            <div class="total-button ${index + 1} yellow">
            ${label}
            </div>
          `;
        } else if (total > 20) {
          element1.total = `
            <div class="total-button ${index + 1} orange">
            ${label}
            </div>
          `;
        } else {
          element1.total = `
          <div class="total-button ${index + 1} red">
          ${label}
          </div>
        `;
        }
        rows1.push(element1);
      }
    );
    [...rowsBpt].forEach(
      (
        element: {
          rank: string;
          email: string;
          testDate: string;
          ds: string;
          dbms: string;
          oops: string;
          total: string;
          id: string;
        },
        index: number
      ) => {
        const total = +element.total.slice(0, element.total.length - 1);
        let element1 = {
          rank: element.rank,
          email: element.email,
          testDate: element.testDate,
          ds: element.ds,
          dbms: element.dbms,
          oops: element.oops,
          total: "",
          id: index
        };
        const label = `
          <label class="total-score">${total + "%"}</label>
          <label class="tooltip-icon"><i class="info-icon"></i></label>`;
        if (total > 80) {
          element1.total = `
            <div class="total-button ${index + 1} dark-green">
             ${label}
            </div>
          `;
        } else if (total > 60) {
          element1.total = `
            <div class="total-button ${index + 1} light-green">
            ${label}
            </div>
          `;
        } else if (total > 40) {
          element1.total = `
            <div class="total-button ${index + 1} yellow">
            ${label}
            </div>
          `;
        } else if (total > 20) {
          element1.total = `
            <div class="total-button ${index + 1} orange">
            ${label}
            </div>
          `;
        } else {
          element1.total = `
          <div class="total-button ${index + 1} red">
          ${label}
          </div>
        `;
        }
        rows2.push(element1);
      }
    );
    return { gat: rows1, bpt: rows2 };
  };

  developDataForCharts = rawData => {
    let tt: number[] = [];
    let tt1: number[] = [];
    for (let i = 0; i <= 100; i++) {
      if (i === rawData.barVal.x) {
        tt1.push(rawData.barVal.y);
      } else {
        tt1.push(0);
      }
      tt.push(i);
    }
    let zp = -10;
    let zz = rawData.tt2.map((d, i): { x: number; y: number } => {
      zp = zp + 10;
      return {
        x: zp,
        y: d
      };
    });
    return { tt, zz, tt1 };
  };
}


export const updateIconsInRows = (rows) => {
  const resend = () => {
  };
  const data = rows;
  data.forEach((element, index) => {
    element.resend = `<div value='${index}' id='${'resend_' + index}' alt="Resend Icon"><i class="resend-icon"></i></div>`;
    element.cancel = `<div value='${index}' alt="cancel Icon" onMouseDown='${() => cancel(element.email)}'><i class="cancel-icon"></i></div>`;
  });
  return data;
}

export function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}  


// export const resend = () => {
//   console.log('fds');
// };
export const cancel = name => { };
