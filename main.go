package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	var err error
	// Create an instance of the app structure
	app := NewApp()
	err = app.init()
	if err == nil {
		// Create application with options
		err = wails.Run(&options.App{
			Title:  "knote",
			Width:  1024,
			Height: 768,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
			OnStartup:        app.startup,
			Bind: []interface{}{
				app,
			},
			Mac: &mac.Options{
				About: &mac.AboutInfo{
					// Title:   "My Application",
					// Message: "© 2021 Me",
					Icon: icon,
				},
			},
		})
	}
	if err != nil {
		println("Error:", err.Error())
	}
}
