import React, { Component } from "react";
import "./TagInput.scss";

interface Props {
  predefinedTags: string[];
  setStore: Function;
  existingTags: string[];
  placeHolder:string
}
interface State {
  items: string[];
  focused: boolean;
  input: string;
}

export default class TagInput extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      items: this.props.existingTags,
      focused: false,
      input: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  componentDidMount(): void {
    if (this.props.existingTags.length > 0) {
      this.props.existingTags.forEach(el => {
        let i = this.props.predefinedTags.findIndex(el1 => el1 === el);
        if (i > -1) {
          let p = document.querySelectorAll(
            `input[value=${el}]`
          )[0] as HTMLInputElement;
          p.checked = true;
          let q = document.getElementById(`${el}`);
          let r = document.getElementById(`${el}Master`);
          q.style.color = "#FFFFFF";
          r.style.background = "#FF9800";
        }
      });
    }
  }

  handleInputChange(evt: any): void {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt: any): void {
    if (evt.keyCode === 13) {
      const { value } = evt.target;
      this.setState(
        {
          items: [...this.state.items, value],
          input: ""
        },
        () => {
          this.props.setStore(this.state.items);
        }
      );
    }
    if (
      this.state.items.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      const value = this.state.items[this.state.items.length - 1];
      this.handleIndividualItems(value);
      this.setState(
        state => ({
          items: state.items.slice(0, state.items.length - 1)
        }),
        () => {
          this.props.setStore(this.state.items);
        }
      );
    }
  }

  handlingStyle(value: string): void {
    let p = document.querySelectorAll(
      `input[value=${value}]`
    )[0] as HTMLInputElement;
    p.checked = false;
    let q = document.getElementById(`${value}`);
    q.style.color = "#666f94";
    let r = document.getElementById(`${value}Master`);
    r.style.background = "#E5E7ED";
  }

  handleIndividualItems(value: string): void {
    this.props.predefinedTags.forEach(element => {
      if (element === value) {
        this.handlingStyle(value);
      }
    });
  }

  handleRemoveItem(index: number, value: string): any {
    return () => {
      this.setState(
        state => ({
          items: state.items.filter((item, i) => i !== index)
        }),
        () => {
          this.props.setStore(this.state.items);
          this.handleIndividualItems(value);
        }
      );
    };
  }

  predefinedTags(): any {
    if (this.props.predefinedTags.length > 0) {
      return (
        <React.Fragment>
          <div className="pre-defined-tags-wrapper">
            {this.props.predefinedTags.map((item: any, i) => {
              return (
                <span id={`${item}Master`} className="pre-defined-tags" key={i}>
                  <input
                    type="checkBox"
                    className="checkbox"
                    value={item}
                    onChange={e => this.handleCheckoxChange(e)}
                  />
                  <span className="predefinedTagsText" id={item}>
                    {item}
                  </span>
                </span>
              );
            })}
          </div>
          <div className="dashed-line-for-send-test"></div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }

  changingPropsStyle = (
    p: HTMLElement,
    q: HTMLElement,
    color: string,
    background: string
  ): void => {
    this.props.setStore(this.state.items);
    p.style.color = color;
    q.style.background = background;
  };

  handleCheckoxChange(evt: any): void {
    let val = evt.target.value;
    let p = document.getElementById(`${val}`);
    let q = document.getElementById(`${val}Master`);
    if (evt.target.checked) {
      this.setState(
        {
          items: [...this.state.items, evt.target.value],
          input: ""
        },
        () => {
          this.changingPropsStyle(p, q, "#FFFFFF", "#FF9800");
        }
      );
    } else {
      const value = evt.target.value;
      let aa = this.state.items.filter(item => item !== value);
      this.setState({ items: aa }, () => {
        this.changingPropsStyle(p, q, "#666F94", "#E5E7ED");
      });
    }
  }

  render() {
    return (
      <label className="tags-wrapper">
        <div className="tags-container">
          {this.state.items.map((item, i) => (
            <label
              key={i}
              className="tags-item"
              onClick={this.handleRemoveItem(i, item)}
            >
              <span className="tags-item-text">{item}</span>
              <span className="tags-item-delete">x</span>
            </label>
          ))}
          <input
            className="tag-input"
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
            placeholder={this.props.placeHolder}
          />
        </div>
        {this.predefinedTags()}
      </label>
    );
  }
}
