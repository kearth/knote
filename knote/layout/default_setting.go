package layout

import (
	"fmt"

	"fyne.io/fyne/v2"
	"github.com/kearth/knote/knote/env"
	"github.com/kearth/knote/knote/global"
)

const (
	DefaultWidth  = 1024 //默认窗口宽度
	DefaultHeigth = 768  //默认窗口高度
)

var (
	UserName = "user_name"
)

// 获取默认窗口大小
func DefaultSize() fyne.Size {
	return fyne.NewSize(DefaultWidth, DefaultHeigth)
}

// 应用 Icon
func AppIcon() fyne.Resource {
	r, _ := fyne.LoadResourceFromPath(env.StaticResousePath("icon/icon.png"))
	return r
}

// 应用名称
func Version() string {
	return fmt.Sprintf("版本 v%s", global.VERSION)
}
