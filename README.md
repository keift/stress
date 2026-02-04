<div align="center">
  <br/>
  <img src="./assets/logo.png" width="350px"/>
  <br/>
</div>

## Contents

- [About](#about)
- [Installation](#installation)
  - [Windows](#windows)
  - [Linux](#linux)
  - [MacOS](#macos)
- [Links](#links)
  - [Discord](https://discord.gg/keift)
  - [Telegram](https://t.me/keiftco)
  - [Twitter](https://x.com/keiftco)
  - [GitHub](https://github.com/keift)
- [License](#license)

## About

Stress test the specified target with DDoS attack. Unauthorized use is not recommended.

## Installation

### Windows

- [stress-v1.1--windows-x64.exe](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--windows-x64.exe)

```shell
curl -LO https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--windows-x64.exe
```

### Linux

- [stress-v1.1--linux-x64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-x64)

```shell
wget https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-x64
```

- [stress-v1.1--linux-arm64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-arm64)

```shell
wget https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-arm64
```

- [stress-v1.1--linux-x64-musl](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-x64-musl)

```shell
wget https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-x64-musl
```

- [stress-v1.1--linux-arm64-musl](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-arm64-musl)

```shell
wget https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-arm64-musl
```

Briefly as follows.

```sh-session
# Make the file executable
sudo chmod +x ./stress-v1.1--linux-x64
sudo chmod +x ./stress-v1.1--linux-arm64
sudo chmod +x ./stress-v1.1--linux-x64-musl
sudo chmod +x ./stress-v1.1--linux-arm64-musl

# Run Stress
sudo ./stress-v1.1--linux-x64
sudo ./stress-v1.1--linux-arm64
sudo ./stress-v1.1--linux-x64-musl
sudo ./stress-v1.1--linux-arm64-musl
```

### MacOS

- [stress-v1.1--macos-arm64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--macos-arm64)

```shell
curl -LO https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--macos-arm64
```

- [stress-v1.1--macos-x64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--macos-x64)

```shell
curl -LO https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--macos-x64
```

Briefly as follows.

```sh-session
# Make the file executable
sudo chmod +x ./stress-v1.1--macos-arm64
sudo chmod +x ./stress-v1.1--macos-x64
sudo xattr -cr ./stress-v1.1--macos-arm64
sudo xattr -cr ./stress-v1.1--macos-x64

# Run Stress
sudo ./stress-v1.1--macos-arm64
sudo ./stress-v1.1--macos-x64
```

## Links

- [Discord](https://discord.gg/keift)
- [Telegram](https://t.me/keiftco)
- [Twitter](https://x.com/keiftco)
- [GitHub](https://github.com/keift)

## License

MIT License

Copyright (c) 2025 Keift

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
