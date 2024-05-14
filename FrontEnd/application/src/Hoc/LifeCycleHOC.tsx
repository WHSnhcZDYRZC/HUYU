import React, { createRef } from "react";

interface IPageRef {
  componentDidMount?: () => void;
  componentDidUpdate?: (
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ) => void;
  componentWillUnmount?: () => void;
  getSnapshotBeforeUpdate?: (
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
  ) => any;
  shouldComponentUpdate?: (
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any,
  ) => boolean;
}

const LifeCycleHOC = (WrapComponent) =>
  class LifeCycleHOC extends React.Component {
    pageRef = createRef<IPageRef>();

    componentDidMount(): void {
      return this.pageRef.current?.componentDidMount?.();
    }

    componentDidUpdate(
      prevProps: Readonly<{}>,
      prevState: Readonly<{}>,
      snapshot?: any,
    ): void {
      return this.pageRef.current?.componentDidUpdate?.(
        prevProps,
        prevState,
        snapshot,
      );
    }

    componentWillUnmount(): void {
      return this.pageRef.current?.componentWillUnmount?.();
    }

    getSnapshotBeforeUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>) {
      return this.pageRef.current?.getSnapshotBeforeUpdate?.(
        prevProps,
        prevState,
      );
    }

    shouldComponentUpdate(
      nextProps: Readonly<{}>,
      nextState: Readonly<{}>,
      nextContext: any,
    ): boolean {
      return (
        this.pageRef.current?.shouldComponentUpdate?.(
          nextProps,
          nextState,
          nextContext,
        ) || true
      );
    }

    render(): React.ReactNode {
      return (
        <WrapComponent ref={this.pageRef} {...this.props} {...this.state} />
      );
    }
  };

export default LifeCycleHOC;
