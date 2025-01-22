import React, { useEffect, useState } from 'react';
import path from 'path';
import "./FileList.css";
import { Tree, Input, Space } from 'antd';
import { DownOutlined, FileOutlined } from '@ant-design/icons';
import { FileAddOutlined, FolderOpenOutlined, FolderAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { GetDirectoryTree, CreateFile } from '../../wailsjs/go/main/App';
import 'antd/dist/reset.css';

function FileList({ setSelectedFile }) {

    // 目录树数据
    const [treeData, setTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [nodePath, setNodePath] = useState('');

    // 判断是不是根节点
    const isRoot = (key) => { return key === '0-root'; }

    // 树节点操作
    const onSelect = (keys, info) => {
        console.log('onSelect', keys, info);
        setCurrentNode(info.node);
        if (nodePath == '0-root') {
            // TODO
        }
        if (nodePath == '0-new') {
            // skip
        } else {
            setNodePath(info.node.key);
        }
    };

    // 刷新
    const fresh = () => {
        renderData();
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
                updatedNode.icon = ''
            }
            return updatedNode;
        });
    }

    // 重命名
    const newName = (e) => {
        let name = e.target.value;
        if (name == '') {
            name = '未命名';
        }
        let dir = currentNode.key;
        // createFile
        console.log(dir, name);
        CreateFile(dir, name);
        console.log(e.target.value);
    }

    const renameNode = (tree, goal) => {
        return tree.map((node) => {
            if (node.key == goal.key) {
                node = { ...node, title: name };
                return node
            }
            if (node.children) {
                return { ...node, children: renameNode(node.children, goal) };
            }
            return node
        });
    }

    // 添加节点
    const addNode = (tree, goal) => {
        return tree.map((node) => {
            if (node.key == goal.key) {
                let newNode = {
                    title: (
                        <Input defaultValue="未命名"
                            onPressEnter={newName}
                            onBlur={newName}
                            placeholder="Borderless"
                            variant="borderless" />
                    ), key: "0-new", isLeaf: node.isLeaf
                }
                if (node.icon == '') {
                    // 如果是目录，添加子节点
                    setNodePath(node.key);
                    node = { ...node, children: [...(node.children || []), newNode] };
                }
                return node
            }
            if (node.children) {
                return { ...node, children: addNode(node.children, goal) };
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
        setTreeData(addNode(treeData, currentNode));
    }

    // 渲染数据
    const renderData = (tree) => {
        // 调用后端 API 获取目录结构
        GetDirectoryTree('').then((data) => {
            setTreeData(nodeMap(data));
        });
    }


    useEffect(() => {
        renderData();
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
                defaultSelectedKeys={['0-root']}
                onSelect={onSelect}
                treeData={treeData}
                className='file-list-tree'
            />
        </div>
    );
}

export default FileList;
