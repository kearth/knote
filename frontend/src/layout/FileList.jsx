import React, { useEffect, useState } from 'react';
import "./FileList.css";
import { Tree, Input, Space } from 'antd';
import { DownOutlined, FileOutlined } from '@ant-design/icons';
import { FileAddOutlined, FolderOpenOutlined, FolderAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { GetDirectoryTree } from '../../wailsjs/go/main/App';
import 'antd/dist/reset.css';

function FileList({ setSelectedFile }) {

    // 目录树数据
    const [treeData, setTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);

    // 树节点操作
    const onSelect = (keys, info) => {
        console.log('onSelect', keys, info);
        setCurrentNode(info.node);
    };


    // 右键菜单
    const rightClick = (event, node) => {
        console.log('rightClick', event, node);
    }

    // 刷新
    const fresh = () => {
        GetDirectoryTree('').then((data) => {
            data = nodeMap(data)
            setTreeData(data);
        })
    }

    // 节点处理
    const nodeMap = (tree) => {
        return tree.map((node) => {
            const updatedNode = {
                ...node,
                icon: <FileOutlined />,
            };
            if (node.children) {
                updatedNode.children = nodeMap(node.children); // 递归处理子节点
            } else {
                node.icon = ''
            }
            return updatedNode;
        });
    }


    // 添加节点
    const addNode = (tree, goal) => {
        return tree.map((node) => {
            if (node.key === goal.key) {
                let newNode = { title: <Input />, key: "new", isLeaf: goal.isLeaf }
                if (node.icon == '') {
                    // 目录
                    node = { ...node, }
                    node.children.push(newNode)
                }
                return node
            }
            if (node.children) {
                return addNode(node.children, goal); // 递归处理子节点
            }
            return node
        });
    }

    // 添加文件夹
    const addDirectory = (node) => {
        console.log(node);
    }

    // 打开文件夹
    const openDirectory = (node) => {
        console.log(node);
    }

    // 添加文件
    const addFile = () => {
        let newTree = addNode(treeData, currentNode);
        console.log(newTree);
        // setTreeData(newTree);
    }


    useEffect(() => {
        // 调用后端 API 获取目录结构
        GetDirectoryTree('').then((data) => {
            data = nodeMap(data);
            setTreeData(data);
        });
    }, []);

    return (
        <div className="file-list">
            <Space className='tool_space'>
                <FolderOpenOutlined onClick={openDirectory} />
                <FileAddOutlined onClick={addFile} />
                <FolderAddOutlined onClick={addDirectory} />
                <ReloadOutlined onClick={fresh} />
            </Space>
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                showIcon
                defaultExpandAll
                onSelect={onSelect}
                treeData={treeData}
                className='file-list-tree'
            // onRightClick={rightClick}
            />
        </div>
    );
}

export default FileList;
