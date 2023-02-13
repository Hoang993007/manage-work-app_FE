import React from "react";

class BuggyCounter extends React.Component<any, { isBuggyCounter: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { isBuggyCounter: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ isBuggyCounter }) => ({
      isBuggyCounter: true
    }));
  }

  render() {
    if (this.state.isBuggyCounter) { throw new Error('I crashed!') }

    return <button onClick={this.handleClick}>Buggy counter</button>;
  }
}

export default BuggyCounter;