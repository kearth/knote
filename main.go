package main

import (
	"fyne.io/fyne/v2/app"
	"github.com/kearth/knote/knote/global"
	"github.com/kearth/knote/knote/layout"
)

// 入口
func main() {
	// new主窗口
	a := app.New()
	// 设置主题
	w := a.NewWindow(global.APP_NAME)
	// 设置Icon
	w.SetIcon(layout.AppIcon())
	// 初始大小
	w.Resize(layout.DefaultSize())
	// 布局设置
	layout.MainWindow(w)
	// 运行
	w.ShowAndRun()
}
