import React from 'react';
import CustomTabs from '../CustomTabs';
import GAT from '../gat/Gat';
import BPT from '../bpt/Bpt';

interface IProps {
  gat: {
    columns: Array<string>,
    rows: Array<{}>
  },
  gatClass: String,
  bpt: {
    columns: Array<string>,
    rows: Array<{}>
  },
  bptClass: String,
  permission: boolean,
  uid?: string
}

export default function TabsHelper(props: IProps) {

  return (
    <React.Fragment>
      {props.bpt.rows.length > 0 && props.gat.rows.length > 0 ? (
        <div className="table-area">
          <CustomTabs
            uid={props.uid}
            data={[
              {
                label: "General Aptitude Test",
                element: (
                  <GAT
                    className={props.gatClass}
                    columns={props.gat.columns}
                    rows={props.gat.rows}
                    permission={props.permission}
                  />
                )
              },
              {
                label: "Basic Programming Test",
                element: (
                  <BPT
                    className={props.bptClass}
                    columns={props.bpt.columns}
                    rows={props.bpt.rows}
                    permission={props.permission}
                  />
                )
              }
            ]}
            activeTab={props.gat.rows.length === 0 ? 1 : 0}
          />
        </div>
      ) : null
      }
    </React.Fragment>
  )
}