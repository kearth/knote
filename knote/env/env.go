package env

const (
	EnvDev    = "dev"    // 开发环境
	EnvNormal = "normal" // 生产环境

	StaticDir = "static" // 静态资源目录
	StoreDir  = "store"  // 存储目录
)

// 获取静态资源路径
func StaticResousePath(name string) string {
	return StaticDir + "/" + name
}

func StorePath(name string) string {
	return StoreDir + "/" + name
}
