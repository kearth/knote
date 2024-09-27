package layout

// FileItem 文件项
type FileItem struct {
	Level   int        // 层级
	Name    string     // 文件名
	Path    string     // 文件路径
	IsDir   bool       // 是否是目录
	SubItem []FileItem // 子项
}
