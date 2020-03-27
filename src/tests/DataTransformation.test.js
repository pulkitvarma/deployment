import DataTransformationServcie from "../features/dataTransformation.service";
describe("data service", () => {
  let obj = new DataTransformationServcie();
  let mockInputRows = [
    {
      rank: "1",
      email: "example@gmail.com",
      testDate: "11 Feb 2020 01:23 PM",
      quant: "90%",
      verbal: "90%",
      di: "90%",
      total: "90%",
      id: "1"
    },
    {
      rank: "4",
      email: "pulkit@gmail.com",
      testDate: "Yesterday 12:00 PM",
      quant: "80%",
      verbal: "80%",
      di: "80%",
      total: "80%",
      id: "2"
    }
  ];
  let mockInputRowsBpt = [
    {
      rank: "1",
      email: "example@gmail.com",
      testDate: "11 Feb 2020 01:23 PM",
      ds: "90%",
      oops: "90%",
      dbms: "90%",
      total: "90%",
      id: "1"
    },
    {
      rank: "4",
      email: "pulkit@gmail.com",
      testDate: "Yesterday 12:00 PM",
      ds: "80%",
      oops: "80%",
      dbms: "80%",
      total: "80%",
      id: "2"
    }
  ];

  //   let mockOutput = {
  //     bpt: [{
  //         rank: "1",
  //         email: "example@gmail.com",
  //         testDate: "11 Feb 2020 01:23 PM",
  //         ds: "90%",
  //         dbms: "90%",
  //         oops: "90%",
  //         total: "<div class='total-button 1 dark-green'><label class='total-score'>90%</label><label class='tooltip-icon'><i class='info-icon'></i></label></div>",
  //         id: 0
  //     }, {

  //     }]
  //   };
  let mockOutput = {
    gat: [
      {
        rank: "1",
        email: "example@gmail.com",
        testDate: "11 Feb 2020 01:23 PM",
        quant: "90%",
        verbal: "90%",
        di: "90%",
        total:
          "\n" +
          '            <div class="total-button 1 dark-green">\n' +
          "             \n" +
          '          <label class="total-score">90%</label>\n' +
          '          <label class="tooltip-icon"><i class="info-icon"></i></label>\n' +
          "            </div>\n" +
          "          ",
        id: 0
      },
      {
        rank: "4",
        email: "pulkit@gmail.com",
        testDate: "Yesterday 12:00 PM",
        quant: "80%",
        verbal: "80%",
        di: "80%",
        total:
          "\n" +
          '            <div class="total-button 2 light-green">\n' +
          "            \n" +
          '          <label class="total-score">80%</label>\n' +
          '          <label class="tooltip-icon"><i class="info-icon"></i></label>\n' +
          "            </div>\n" +
          "          ",
        id: 1
      }
    ],
    bpt: [
      {
        rank: "1",
        email: "example@gmail.com",
        testDate: "11 Feb 2020 01:23 PM",
        ds: "90%",
        dbms: "90%",
        oops: "90%",
        total:
          "\n" +
          '            <div class="total-button 1 dark-green">\n' +
          "             \n" +
          '          <label class="total-score">90%</label>\n' +
          '          <label class="tooltip-icon"><i class="info-icon"></i></label>\n' +
          "            </div>\n" +
          "          ",
        id: 0
      },
      {
        rank: "4",
        email: "pulkit@gmail.com",
        testDate: "Yesterday 12:00 PM",
        ds: "80%",
        dbms: "80%",
        oops: "80%",
        total:
          "\n" +
          '            <div class="total-button 2 light-green">\n' +
          "            \n" +
          '          <label class="total-score">80%</label>\n' +
          '          <label class="tooltip-icon"><i class="info-icon"></i></label>\n' +
          "            </div>\n" +
          "          ",
        id: 1
      }
    ]
  };
  it("develop rows reports", () => {
    let p = obj.developRowsForReports(mockInputRows, mockInputRowsBpt);
    expect(p).toStrictEqual(mockOutput);
    // console.log(p);
  });
});
