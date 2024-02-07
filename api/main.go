package main

import "github.com/kataras/iris/v12"

func main() {
	app := iris.New()

	app.Get("/", root)

	apiV1 := app.Party("/api/v1")
	{
		apiV1.Get("/support", apiV1Support)
	}

	app.Run(iris.Addr(":8080"))
}

func root(ctx iris.Context) {
	ctx.Text("Version 1.0.0 - Please use /api/v1/... to access the API.")
}

func apiV1Support(ctx iris.Context) {
	ctx.JSON(iris.Map{"message": "API v1 is up and running!"})
}
