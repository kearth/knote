package global

import (
	"image"
	"image/draw"
	"image/png"

	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/os/gfile"
)

// 加载 Png 图像
func LoadPng(path string) (image.Image, error) {
	if !gfile.IsFile(path) {
		return nil, gerror.New("file not exist")
	}
	f, err := gfile.Open(path)
	defer f.Close()
	if err != nil {
		return nil, err
	}
	img, err := png.Decode(f)
	if err != nil {
		return nil, err
	}
	return img, nil
}

// 将方形图像转换为圆形图像
func ImageToCircle(src image.Image) image.Image {
	// 创建一个新的白色背景，作为圆形图像的背景
	dst := image.NewNRGBA(image.Rect(0, 0, src.Bounds().Dx(), src.Bounds().Dx()))
	// 使用白色填充背景
	draw.Draw(dst, dst.Bounds(), image.White, image.Point{}, draw.Src)
	// 计算圆的半径
	radius := src.Bounds().Dx() / 2
	r2 := radius * radius
	// 在圆形背景上绘制圆形图像
	cx, cy := radius, radius
	for y := 0; y < src.Bounds().Max.Y; y++ {
		for x := 0; x < src.Bounds().Max.X; x++ {
			// 计算点到圆心的距离
			dx := x - cx
			dy := y - cy
			if (dx*dx + dy*dy) <= r2 {
				// 设置该点的颜色为源图像的对应点的颜色
				dst.Set(x, y, src.At(x, y))
			}
		}
	}
	return dst
}
