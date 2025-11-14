group "default" {
  targets = ["builder"]
}

target "builder" {
  context = "."
  dockerfile = "Dockerfile"
  target = "artifacts"

  output = [
    "type=local,dest=release"
  ]

  platforms = [
    "linux/amd64"
  ]
}
