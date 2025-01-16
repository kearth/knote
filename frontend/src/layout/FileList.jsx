import React, { useEffect, useState } from 'react';
import "./FileList.css";
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { GetDirectoryTree } from '../../wailsjs/go/main/App';
import 'antd/dist/reset.css';


// icon: <CarryOutOutlined />,

function FileList({ setSelectedFile }) {
    const [treeData, setTreeData] = useState([]);
    const [showIcon, setShowIcon] = useState(false);
    const onSelect = (keys, info) => {
        console.log('Selected:', keys, info);
    };

    const onExpand = () => {
        console.log('Expand');
    };

    useEffect(() => {
        // 调用后端 API 获取目录结构
        GetDirectoryTree('').then((data) => {
            setTreeData(data);
        });
    }, []);

    return (
        <div className="file-list">
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                showIcon={showIcon}
                defaultExpandedKeys={['root']}
                onSelect={onSelect}
                treeData={treeData}
                className='file-list-tree'
            />
        </div>
    );
}

export default FileList;
