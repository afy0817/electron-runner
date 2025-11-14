group "default" {
  targets = ["builder"]
}

target "builder" {
  context = "."
  dockerfile = "Dockerfile"
  target = "artifacts"

  args = {
    TAG = ""
  }

  output = [
    "type=local,dest=release"
  ]

  platforms = [
    "linux/amd64"
  ]
}
