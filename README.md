<div align="center">
  <br/>
  <img src="https://i.ibb.co/ZnCp3r0/unknown.png" width="350px"/>
</div>

## Contents

- [About](#about)
- [Installation](#installation)
- [Links](#links)
  - [Change Log](CHANGELOG.md)

## About

Stress test the specified target with DDoS attack.

## Installation

### Windows

[stress-v1.1--windows-x64.exe](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--windows-x64.exe)

### Linux

[stress-v1.1--linux-x64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-x64)

[stress-v1.1--linux-arm64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-arm64)

[stress-v1.1--linux-x64-musl](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-x64-musl)

[stress-v1.1--linux-arm64-musl](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--linux-arm64-musl)

Briefly as follows.

```bash
# Make the file executable
chmod +x ./stress-v1.1--linux-x64
chmod +x ./stress-v1.1--linux-arm64
chmod +x ./stress-v1.1--linux-x64-musl
chmod +x ./stress-v1.1--linux-arm64-musl

# Run Stress
./stress-v1.1--linux-x64
./stress-v1.1--linux-arm64
./stress-v1.1--linux-x64-musl
./stress-v1.1--linux-arm64-musl
```

### MacOS

[stress-v1.1--macos-arm64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--macos-arm64)

[stress-v1.1--macos-x64](https://github.com/keift/stress/releases/download/v1.1/stress-v1.1--macos-x64)

Briefly as follows.

```bash
# Make the file executable
chmod +x ./stress-v1.1--macos-arm64
chmod +x ./stress-v1.1--macos-x64
xattr -cr ./stress-v1.1--macos-arm64
xattr -cr ./stress-v1.1--macos-x64

# Run Stress
./stress-v1.1--macos-arm64
./stress-v1.1--macos-x64
```

## Links

- [Change Log](CHANGELOG.md)

## License

[MIT](LICENSE.md)