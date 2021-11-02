import memo from 'memoize-one';
import isEqual from 'fast-deep-equal';
import React from 'react';
import {
  areEqual as areRowPropsEqual,
  FixedSizeList as List,
  ListChildComponentProps,
} from 'react-window';
import { AnyNode } from '../../domain/ITreeNode';
import Tree from '../../domain/Tree';

interface TreeComponentProps {
  tree: Tree<any>;
  onScroll: () => void;
  height: number;
  width: number;
  renderNodes: (config: { key: any; node: AnyNode<any>; style: any }) => any;
}

class TreeComponent extends React.Component<TreeComponentProps> {
  public renderRow = memo(({ index, style, data }: ListChildComponentProps) => {
    const node = data[index];

    return this.props.renderNodes({
      node,
      key: node.id,
      style,
    });
  }, areRowPropsEqual);

  public shouldComponentUpdate(nextProps: Readonly<TreeComponentProps>) {
    return (
      !isEqual(this.props.tree, nextProps.tree) ||
      this.props.height !== nextProps.height ||
      this.props.width !== nextProps.width
    );
  }

  public keySelector = (index: number, data: any) =>
    (data[index] as AnyNode<any>).id;

  public render() {
    const { tree, onScroll, height, width } = this.props;
    const visibleNodes = tree.visibleNodes();

    return (
      <List
        height={height}
        itemCount={visibleNodes.length}
        onScroll={onScroll}
        itemSize={30}
        width={width}
        itemKey={this.keySelector}
        itemData={visibleNodes}
      >
        {this.renderRow}
      </List>
    );
  }
}

export default TreeComponent;
