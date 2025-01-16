package operate

import (
	"os"
	"path/filepath"
)

type FileNode struct {
	Title    string      `json:"title"`              // 节点名
	Key      string      `json:"key"`                // 节点唯一标识
	Children []*FileNode `json:"children,omitempty"` // 子节点
}

// 获取目录结构
func GetDirectoryTree(rootPath string) ([]*FileNode, error) {
	var walk func(string) ([]*FileNode, error)
	walk = func(path string) ([]*FileNode, error) {
		entries, err := os.ReadDir(path)
		if err != nil {
			return nil, err
		}

		var nodes []*FileNode
		for _, entry := range entries {
			node := &FileNode{
				Title: entry.Name(),
				Key:   filepath.Join(path, entry.Name()),
			}
			if entry.IsDir() {
				children, err := walk(filepath.Join(path, entry.Name()))
				if err != nil {
					return nil, err
				}
				node.Children = children
			}
			nodes = append(nodes, node)
		}
		return nodes, nil
	}

	return walk(rootPath)
}
