import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Handle,
  Position,
  NodeProps,
  MarkerType,
  Node,
  Edge,
  useReactFlow,
} from 'reactflow';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { selectNodes } from '../../redux/nodes/selectors';
import {INodeData} from '../../interfaces/NodeData.interface';
import {
    Container,
    Display,
    DropdownWrapper,
    DropdownBtn,
    DropdownList,
    DropdownItem,
    Option,
  } from './NodeItem.styled';
  
const NodeItem: React.MemoExoticComponent<
  (T: NodeProps<INodeData>) => React.JSX.Element
> = memo(({ id, data }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [value, setValue] = useState<null | string>(data.option || null);
  const savedNodes: Node[] = useSelector(selectNodes);
  const { setNodes, setEdges } = useReactFlow();
  const currentOption = data.parentOption
    ? `${data.parentOption}-${value ? value : ''}`
    : value
    ? `${value}`
    : '';

  useEffect(() => {
    const node = savedNodes.find(node => node.id === id);
    if (!node) {
      return;
    }
    if (!node?.selected && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [id, isDropdownOpen, savedNodes]);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (data.childrenNodeId) {
      const updateNode = (val: string) => {
        setNodes((nds: Node[]) =>
          nds.map(node => {
            const updNode = { ...node };
            if (updNode.id === id) {
              updNode.data = { ...updNode.data, option: val };
            }
            if (updNode.parentNode === id) {
              updNode.data = { ...updNode.data, parentOption: currentOption };
            }
            return updNode;
          })
        );
      };
      updateNode(value);
      setIsDropdownOpen(false);
      return;
    }

    const addNewNode = () => {
      const newNode = {
        id: `${+id + 1}`,
        type: 'customNode',
        position: { x: 250, y: 200 },
        data: { parentOption: currentOption },
        parentNode: id,
      };
      const newEdge = {
        id: id,
        source: id,
        target: `${+id + 1}`,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      };
      setNodes((nds: Node[]) => {
        nds.map(node => {
          if (node.id === id) {
            node.data = { ...node.data, childrenNodeId: `${+id + 1}` };
          }
          return node;
        });
        return nds.concat(newNode);
      });
      setEdges((eds: Edge[]) => eds.concat(newEdge));
    };
    addNewNode();
    setIsDropdownOpen(false);
  }, [currentOption, data.childrenNodeId, id, setEdges, setNodes, value]);

  const onDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onKeyDown: React.KeyboardEventHandler = (
    e: React.KeyboardEvent
  ) => {
    if (!isDropdownOpen) {
      return;
    }
    if (e.code === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const renderDropdownOptions = () => {
    const options = [];
    for (let i = 1; i <= 6; i++) {
      options.push(
        <DropdownItem key={i}>
          <Option
            type="button"           
            onClick={() => setValue(i.toString())}
          >
            {i.toString() === value ? (
              <FaRegCheckSquare className='check'/>
            ) : (
                <FaRegSquare className='check'/>
            )}
            Варіант {i}
          </Option>
        </DropdownItem>
      );
    }
    return options;
  };

  return (
    <Container onKeyDown={onKeyDown}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: 'hidden' }}
      />
      <Display/>
      <DropdownWrapper className={isDropdownOpen ? 'nodrag' : ''}>
        <DropdownBtn          
          type="button"
          onClick={onDropdownClick}
        >
          {isDropdownOpen
            ? 'Виберіть значення'
            : data.option
            ? `Варіант ${currentOption}`
            : 'Вибрати значення'}
          {isDropdownOpen ? <FaChevronUp className='icon'/> : <FaChevronDown className='icon'/>}
        </DropdownBtn>
        {isDropdownOpen && (
          <DropdownList>{renderDropdownOptions()}</DropdownList>
        )}
      </DropdownWrapper>
      <Handle
        type="source"
        position={data.parentOption ? Position.Right : Position.Bottom}
        style={{
          backgroundColor: '#ADB5BD',
          translate: data.parentOption ? '-5px 45px' : '0px -6px',
          width: 6,
          height: 6,
          border: 'none',
          visibility: !value || isDropdownOpen ? 'hidden' : 'visible',
        }}
      />
    </Container>
  );
});

export default NodeItem;