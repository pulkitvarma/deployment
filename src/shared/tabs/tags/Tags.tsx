import React from 'react';
import './Tags.scss';

export default function Tags(props) {
    return (
        <div className="scheduled-tags">
            <p className="scheduled-desc">Tags</p>
            {props.tags.map((el, i) => {
                return (
                    <article key={i} id={`master${i}`} className="compact-wrap">
                        <input
                            value={el}
                            onChange={e => props.change(e, i)}
                            type="checkbox"
                        />
                        <p id={`slave${i}`} className="tagname">
                            {el}
                        </p>
                    </article>
                );
            })}
        </div>
    )
}