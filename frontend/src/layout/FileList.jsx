import React, { useEffect, useState, useCallback } from 'react';
import path from 'path';
import "./FileList.css";
import { Tree, Input, Space, Tooltip, message } from 'antd';
import { DownOutlined, FileOutlined } from '@ant-design/icons';
import { FileAddOutlined, FolderOpenOutlined, FolderAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { GetDirectoryTree, CreateFile, CreateDirectory, RenameFile } from '../../wailsjs/go/main/App';
import 'antd/dist/reset.css';

function FileList({ setSelectedFile }) {

    // 目录树数据
    const [treeData, setTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [nodePath, setNodePath] = useState('');
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameKey, setRenameKey] = useState(null);

    // 判断是不是根节点
    const isRoot = (key) => { return key === '0-root'; }

    // 树节点操作
    const onSelect = (keys, info) => {
        const node = info.node;
        setCurrentNode(node);
        if (!node.isLeaf) {
            setNodePath(node.key);
        } else {
            setSelectedFile(node.key); // 联动编辑区显示文件
        }
    };

    // 刷新目录树
    const fresh = () => {
        renderData();
        message.success('目录已刷新');
    };

    // 节点映射，设置图标
    const nodeMap = (tree) => {
        return tree.map((node) => {
            const updatedNode = {
                ...node,
                icon: node.isLeaf ? <FileOutlined /> : <FolderOutlined />,
            };
            if (node.children) {
                updatedNode.children = nodeMap(node.children);
            }
            return updatedNode;
        });
    };

    // 重命名逻辑
    const startRenaming = (node) => {
        setRenameKey(node.key);
        setIsRenaming(true);
    };
    const finishRenaming = async (e, node) => {
        let newName = e.target.value.trim();
        if (!newName) newName = '未命名';

        try {
            const dir = path.dirname(node.key);
            await RenameFile(node.key, path.join(dir, newName));
            setTreeData((prevData) => renameNode(prevData, node, newName));
            message.success('重命名成功');
        } catch (error) {
            message.error('重命名失败');
            console.error(error);
        } finally {
            setIsRenaming(false);
            setRenameKey(null);
        }
    };
    const renameNode = (tree, goal, newName) => {
        return tree.map((node) => {
            if (node.key === goal.key) {
                return { ...node, title: newName };
            }
            if (node.children) {
                return { ...node, children: renameNode(node.children, goal, newName) };
            }
            return node;
        });
    };
    // 添加节点（文件/文件夹）
    const addNode = async (type) => {
        if (!currentNode) {
            message.warning('请先选择一个目录');
            return;
        }

        const newNodeKey = `${currentNode.key}/new-${Date.now()}`;
        const newNode = {
            title: (
                <Input
                    defaultValue="未命名"
                    onPressEnter={(e) => finishAdding(e, newNodeKey, type)}
                    onBlur={(e) => finishAdding(e, newNodeKey, type)}
                    placeholder="请输入名称"
                    variant="borderless"
                    autoFocus
                />
            ),
            key: newNodeKey,
            isLeaf: type === 'file',
        };

        setTreeData((prevData) => addNodeToTree(prevData, currentNode, newNode));
    };

    const addNodeToTree = (tree, goal, newNode) => {
        return tree.map((node) => {
            if (node.key === goal.key) {
                return {
                    ...node,
                    children: [...(node.children || []), newNode],
                };
            }
            if (node.children) {
                return { ...node, children: addNodeToTree(node.children, goal, newNode) };
            }
            return node;
        });
    };

    const finishAdding = async (e, key, type) => {
        let name = e.target.value.trim();
        if (!name) name = '未命名';

        try {
            const dir = path.dirname(key);
            const newPath = path.join(dir, name);
            if (type === 'file') {
                await CreateFile(dir, name);
            } else {
                await CreateDirectory(dir, name);
            }
            setTreeData((prevData) => updateNodeTitle(prevData, key, name));
            message.success(`${type === 'file' ? '文件' : '文件夹'}创建成功`);
        } catch (error) {
            message.error(`${type === 'file' ? '文件' : '文件夹'}创建失败`);
            console.error(error);
        }
    };

    const updateNodeTitle = (tree, key, newTitle) => {
        return tree.map((node) => {
            if (node.key === key) {
                return { ...node, title: newTitle };
            }
            if (node.children) {
                return { ...node, children: updateNodeTitle(node.children, key, newTitle) };
            }
            return node;
        });
    };

    // 添加文件
    const addFile = () => addNode('file');

    // 添加文件夹
    const addDirectory = () => addNode('directory');

    // 打开文件夹（暂未实现具体逻辑）
    const openDirectory = () => {
        message.info('打开文件夹功能待实现');
    };

    // 拖拽支持
    const onDrop = (info) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        // TODO: 实现拖拽逻辑，后端更新文件位置
        console.log('Drag:', dragKey, 'Drop:', dropKey);
    };

    const renderData = useCallback(() => {
        GetDirectoryTree('').then((data) => {
            setTreeData(nodeMap(data));
        }).catch((error) => {
            message.error('获取目录结构失败');
            console.error(error);
        });
    }, []);

    useEffect(() => {
        renderData();
    }, [renderData]);

    // 快捷键支持
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                addFile();
            }
            if (e.key === 'F2' && currentNode) {
                e.preventDefault();
                startRenaming(currentNode);
            }
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                fresh();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentNode]);

    // 自定义树节点标题
    const renderTitle = (node) => {
        if (isRenaming && renameKey === node.key) {
            return (
                <Input
                    defaultValue={node.title}
                    onPressEnter={(e) => finishRenaming(e, node)}
                    onBlur={(e) => finishRenaming(e, node)}
                    autoFocus
                    variant="borderless"
                />
            );
        }
        return (
            <div className="tree-node-title" onDoubleClick={() => startRenaming(node)}>
                {node.title}
            </div>
        );
    };

    return (
        <div className="file-list">
            <Space className="tool-space">
                <Tooltip title="打开文件夹 (Ctrl+O)">
                    <FolderOpenOutlined onClick={openDirectory} />
                </Tooltip>
                <Tooltip title="新建文件 (Ctrl+N)">
                    <FileAddOutlined onClick={addFile} />
                </Tooltip>
                <Tooltip title="新建文件夹">
                    <FolderAddOutlined onClick={addDirectory} />
                </Tooltip>
                <Tooltip title="刷新 (Ctrl+R)">
                    <ReloadOutlined onClick={fresh} />
                </Tooltip>
            </Space>
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['0-root']}
                onSelect={onSelect}
                treeData={treeData}
                className="file-list-tree"
                draggable
                onDrop={onDrop}
                titleRender={renderTitle}
            />
        </div>
    );
}

export default FileList;