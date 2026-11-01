<div align="center">
  <br/>
  <img src="./assets/logo.png" width="350px"/>
  <br/>
</div>

## Contents

- [About](#about)
- [Installation](#installation)
  - [Windows](#windows)
  - [MacOS](#macos)
  - [Linux](#linux)

## About

Stress test the specified target with DDoS attack. Unauthorized use is not recommended.

## Installation

### Windows

- [stress-windows-x64.exe](https://github.com/keift/stress/releases/latest/download/stress-windows-x64.exe)

```shell
curl -LO https://github.com/keift/stress/releases/latest/download/stress-windows-x64.exe
```

### MacOS

- [stress-darwin-arm64](https://github.com/keift/stress/releases/latest/download/stress-darwin-arm64)

```shell
curl -LO https://github.com/keift/stress/releases/latest/download/stress-darwin-arm64
```

- [stress-darwin-x64](https://github.com/keift/stress/releases/latest/download/stress-darwin-x64)

```shell
curl -LO https://github.com/keift/stress/releases/latest/download/stress-darwin-x64
```

Briefly as follows.

```shell
# Make the file executable
sudo chmod +x ./stress-darwin-arm64
sudo chmod +x ./stress-darwin-x64
sudo xattr -cr ./stress-darwin-arm64
sudo xattr -cr ./stress-darwin-x64

# Run Stress
sudo ./stress-darwin-arm64
sudo ./stress-darwin-x64
```

### Linux

- [stress-linux-x64](https://github.com/keift/stress/releases/latest/download/stress-linux-x64)

```shell
wget https://github.com/keift/stress/releases/latest/download/stress-linux-x64
```

- [stress-linux-x64-musl](https://github.com/keift/stress/releases/latest/download/stress-linux-x64-musl)

```shell
wget https://github.com/keift/stress/releases/latest/download/stress-linux-x64-musl
```

- [stress-linux-arm64](https://github.com/keift/stress/releases/latest/download/stress-linux-arm64)

```shell
wget https://github.com/keift/stress/releases/latest/download/stress-linux-arm64
```

- [stress-linux-arm64-musl](https://github.com/keift/stress/releases/latest/download/stress-linux-arm64-musl)

```shell
wget https://github.com/keift/stress/releases/latest/download/stress-linux-arm64-musl
```

Briefly as follows.

```shell
# Make the file executable
sudo chmod +x ./stress-linux-x64
sudo chmod +x ./stress-linux-x64-musl
sudo chmod +x ./stress-linux-arm64
sudo chmod +x ./stress-linux-arm64-musl

# Run Stress
sudo ./stress-linux-x64
sudo ./stress-linux-x64-musl
sudo ./stress-linux-arm64
sudo ./stress-linux-arm64-musl
```
