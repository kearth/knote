package layout

import "fyne.io/fyne/v2"

var (
	handle fyne.Window
)

// 窗口句柄
func Handle() fyne.Window {
	return handle
}

// 设置窗口句柄
func SetHandle(h fyne.Window) {
	handle = h
}
