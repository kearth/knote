package layout

import (
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/gogf/gf/v2/os/gfile"
	"github.com/kearth/knote/knote/env"
	"github.com/kearth/knote/knote/global"
)

// 主窗口布局
func MainWindow(w fyne.Window) {
	// 句柄设置
	SetHandle(w)
	// 区域的创建
	c := container.NewHSplit(LeftListArea(), RightContentEditArea())
	c.Offset = 0.3
	c.Horizontal = true
	w.SetContent(c)
}

// 编辑区
func RightContentEditArea() *fyne.Container {
	// 创建不同的功能区域
	edit := widget.NewMultiLineEntry()
	widget.NewRichText()
	preview := widget.NewRichTextFromMarkdown("")
	edit.OnChanged = preview.ParseMarkdown
	c := container.NewHSplit(edit, preview)
	c.Offset = 0.5
	return c
}

// 列表区
func LeftListArea() *fyne.Container {
	leftTopBox := UserInfoArea()
	leftMidBox := CreateNewDocArea()
	leftBottomBox := FileList()
	top := container.NewVBox(leftTopBox, leftMidBox)
	bottom := container.NewBorder(leftBottomBox, container.NewCenter(widget.NewLabel(Version())), nil, nil)
	c := container.NewVBox(top, bottom)
	// c.Resize(fyne.NewSize(0.3*DefaultWidth, DefaultHeigth))
	return c
}

// 新建文件
func CreateNewDocArea() *fyne.Container {
	return container.NewVBox(
		widget.NewButton("新建文件", func() {}),
	)
}

//	左侧上面部分
//
// 头像、用户名、新建文件
// 信息设置、退出登录等
func UserInfoArea() *fyne.Container {
	img, _ := global.LoadPng(env.StaticResousePath("icon/icon.png"))
	img = global.ImageToCircle(img)
	avatarIcon := canvas.NewImageFromImage(img)
	avatarIcon.FillMode = canvas.ImageFillContain
	avatarIcon.SetMinSize(fyne.NewSize(32, 32))
	c := container.NewHBox(
		container.NewCenter(avatarIcon),
		container.NewBorder(widget.NewLabel(UserName), nil, nil, nil),
	)
	c.Resize(fyne.NewSize(0.3*DefaultWidth, 0.3*DefaultHeigth))
	return c
}

// 文件列表
func FileList() *fyne.Container {
	// 下面部分
	s := env.StorePath("")
	r, _ := fyne.LoadResourceFromPath(env.StaticResousePath("icon/file.png"))
	icon := canvas.NewImageFromResource(r)
	icon.FillMode = canvas.ImageFillContain
	icon.SetMinSize(fyne.NewSize(32, 32))

	// 文件列表
	fl := GetCurrentFiles(s, 0)
	al, _ := FilesToAccordionItem(fl)
	a := widget.NewAccordion(al...)
	c := container.NewVBox(a)
	c.Resize(fyne.NewSize(0.3*DefaultWidth, 0.7*DefaultHeigth))
	return c
}

// FileToAccordionItem 将文件转换为AccordionItem
func FilesToAccordionItem(f []FileItem) ([]*widget.AccordionItem, []string) {
	ac := []*widget.AccordionItem{}
	fl := []string{}
	for _, fi := range f {
		if fi.IsDir {
			nac, nfl := FilesToAccordionItem(fi.SubItem)
			d := widget.NewList(func() int {
				return len(nfl)
			}, func() fyne.CanvasObject {
				return widget.NewLabel("")
			}, func(lii widget.ListItemID, co fyne.CanvasObject) {
				co.(*widget.Label).SetText(nfl[lii])
			})
			ac = append(ac, &widget.AccordionItem{
				Title:  strings.Repeat(" ", 4*(fi.Level-1)) + fi.Name + "/",
				Detail: container.NewVBox(widget.NewAccordion(nac...), d),
			})
		} else {
			fl = append(fl, strings.Repeat(" ", 4*(fi.Level-1))+"-"+fi.Name)
		}
	}
	return ac, fl
}

// GetCurrentFiles 获取当前目录下的文件
func GetCurrentFiles(root string, level int) []FileItem {
	// 文件列表
	ftree := []FileItem{}
	fh, _ := gfile.ScanDir(root, "*", false)
	for _, f := range fh {
		if gfile.IsDir(f) {
			// 目录
			ftree = append(ftree, FileItem{
				Name:    gfile.Basename(f),
				Path:    f,
				IsDir:   true,
				SubItem: GetCurrentFiles(f, level+1),
				Level:   level + 1,
			})
		} else {
			// 文件
			ftree = append(ftree, FileItem{
				Name:    gfile.Basename(f),
				Path:    f,
				IsDir:   false,
				SubItem: []FileItem{},
				Level:   level + 1,
			})
		}
	}
	return ftree
}
