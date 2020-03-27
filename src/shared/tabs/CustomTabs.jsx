import React, { useState, useLayoutEffect } from "react";
import "./CustomTabs.scss";

// const AntTabs = withStyles({
//   root: {
//     borderBottom: "0.2px solid #e8e8e8",
//     color: "#7F87A6"
//   },
//   indicator: {
//     backgroundColor: "#ff9800",
//     height: "1px"
//   }
// })(Tabs);

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       <span>{children}</span>
//     </Typography>
//   );
// }

// const AntTab = withStyles(theme => ({
//   root: {
//     textTransform: "none",
//     minWidth: 72,
//     fontWeight: theme.typography.fontWeightRegular,
//     fontStyle: "regular",
//     fontSize: 14,
//     marginRight: theme.spacing(2),
//     fontFamily: ["Ubuntu"].join(","),
//     "&$selected": {
//       color: "#323E70",
//       fontWeight: theme.typography.fontWeightRegular
//     },
//     "&:focus": {
//       color: "#323E70"
//     }
//   },
//   selected: {}
// }))(props => {
//   return (
//     <Tab variant="scrollable" scrollbuttons="auto" disableRipple {...props} />
//   );
// });

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   },
//   padding: {
//     padding: theme.spacing(0)
//   },
//   demo1: {
//     backgroundColor: "#FFFFFF"
//   }
// }));

// export default function CustomTabs(props) {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(props.activeTab);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   React.useEffect(() => {
//     setValue(props.activeTab);
//   }, [props.activeTab]);
//   // console.log(props.activeTab,'CustomTabs');
//   return (
//     <div className={classes.root}>
//       <div className={classes.demo1}>
//         <AntTabs value={value} onChange={handleChange} aria-label="ant example">
//           {props.data.map((el, index) => {
//             return <AntTab key={index} label={el.label} />;
//           })}
//         </AntTabs>
//         {props.data.map((el, i) => {
//           return (
//             <TabPanel
//               key={i}
//               style={{ marginTop: "2%" }}
//               value={value}
//               index={i}
//             >
//               <span>{el.element}</span>
//             </TabPanel>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
const styles = {};
export default function CustomTabs(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(props.activeTab);
  const [aab, setAab] = useState(props.activeTab);
  const changeTab = index => {
    setActiveTabIndex(index);
  };
  useLayoutEffect(() => {
    props.data.forEach((element, index) => {
      if (index === activeTabIndex) {
        document.getElementById(`tab${index}${props.uid}`).style.display = "inherit";
        document.getElementById(`tabTitle${index}${props.uid}`).style.color = "#323E70";
        document.getElementById(`tabTitle${index}${props.uid}`).style.borderBottom =
          "1px solid #FF9800";
      } else {
        document.getElementById(`tab${index}${props.uid}`).style.display = "none";
        document.getElementById(`tabTitle${index}${props.uid}`).style.color = "#7F87A6";
        document.getElementById(`tabTitle${index}${props.uid}`).style.borderBottom =
          "1px solid #E5E7ED";
      }
    });
  }, [activeTabIndex]);
  return (
    <React.Fragment>
      <div style={{paddingTop: '12px'}}>
        <div className="tabHeadingsWrapper">
          {props.data.map((el, index) => {
            return (
              <div
                onClick={() => changeTab(index)}
                id={`tabTitle${index}${props.uid}`}
                className="tabHeading"
                key={index}
              >
                {el.label}
              </div>
            );
          })}
          <div className="hLine"></div>
        </div>
        <div>
          {props.data.map((el, index) => {
            return (
              <div className="tb" id={`tab${index}${props.uid}`} key={index}>
                {el.element}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
