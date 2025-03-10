package main

import (
	"context"
	"fmt"
	"knote/backend/operate"
	"os"
	"path/filepath"

	"github.com/gogf/gf/os/gfile"
)

// App struct
type App struct {
	ctx          context.Context
	rootDir      string // root directory of the app
	resourcesDir string // resources directory of the app
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetDirectoryTree 获取目录树
func (a *App) GetDirectoryTree(path string) ([]*operate.FileNode, error) {
	var fl []*operate.FileNode
	var err error
	if path == "" {
		path = a.resourcesDir
	}
	if !gfile.IsDir(path) {
		return nil, fmt.Errorf("path is not a directory")
	}
	fl, err = operate.GetDirectoryTree(path)
	fl = []*operate.FileNode{
		&operate.FileNode{
			Title:    gfile.Basename(path),
			Key:      "0-root", // 根节点
			Children: fl,
		},
	}
	return fl, err
}

// CreateFile 创建文件
func (a *App) CreateFile(path string, name string) (bool, error) {
	err := operate.CreateFile(gfile.Join(path, name))
	if err != nil {
		return false, err
	}
	return true, nil
}

// App init initializes and runs the application
func (a *App) init() error {
	a.rootDir = gfile.Pwd()                             // 默认情况下，获取当前目录
	a.resourcesDir = gfile.Join(a.rootDir, "resources") // 默认情况下，获取当前目录下的resources目录
	// 创建resources目录
	if !gfile.Exists(a.resourcesDir) {
		err := gfile.Mkdir(a.resourcesDir)
		if err != nil {
			return err
		}
	}
	return nil
}

// CreateDirectory 创建文件夹
func (a *App) CreateDirectory(dir, name string) error {
	return os.MkdirAll(filepath.Join(dir, name), 0755)
}

// RenameFile 重命名文件或文件夹
func (a *App) RenameFile(oldPath, newPath string) error {
	return os.Rename(oldPath, newPath)
}
