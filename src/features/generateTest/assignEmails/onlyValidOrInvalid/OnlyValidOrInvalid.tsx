import React, { ReactElement } from 'react'
import greenTick from "../../../../assets/green-tick.svg";
import redCross from "../../../../assets/red-cross.svg";
interface Props {
    type: string
    data: number | string
    quantity: string
}

export default function OnlyValidOrInvalid(props: Props): ReactElement {
    return (
        <React.Fragment>
            <span className="valid-invalid-result-text">
                {
                    props.type === 'valid' ? (
                        <span>
                            <img src={greenTick} alt="Correct" />&nbsp;&nbsp;
                            {props.quantity === 'all' ? (`All ${props.data} Email id’s are valid`) : (`${props.data} is valid`)}
                        </span>)
                        :
                        (<span>
                            <img src={redCross} alt="Correct" />&nbsp;&nbsp;
                            {props.quantity === 'all' ? (`All ${props.data} Email id’s are in-valid`) : (`${props.data} is in-valid`)}
                        </span>
                        )
                }
            </span>
        </React.Fragment>
    )
}
