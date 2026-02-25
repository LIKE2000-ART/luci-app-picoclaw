#!/bin/bash
#
# 更新 OpenWrt feeds 中的 Go 工具链
# OpenWrt 24.10 自带 Go 1.23，PicoClaw 需要 Go >= 1.25
# 使用 sbwml 维护的新版 Go 包替换 SDK 自带版本
#
# 用法:
#   本地 SDK 编译: 在 OpenWrt SDK 根目录下执行 bash /path/to/feeds.sh
#   CI 环境:       由 GitHub Actions workflow 自动调用
#

set -e

GOLANG_REPO="https://github.com/sbwml/packages_lang_golang"
GOLANG_BRANCH="23.x"

# 检测运行环境：SDK 根目录（有 feeds/packages）或 CI workspace
if [ -d "feeds/packages/lang/golang" ]; then
    # 本地 SDK 环境：直接替换
    echo ">>> 检测到 SDK 环境，替换 feeds/packages/lang/golang ..."
    rm -rf feeds/packages/lang/golang
    git clone "$GOLANG_REPO" -b "$GOLANG_BRANCH" feeds/packages/lang/golang
else
    # CI 或其他环境：克隆到当前目录
    echo ">>> 克隆 Go 工具链到 golang/ ..."
    rm -rf golang
    git clone "$GOLANG_REPO" -b "$GOLANG_BRANCH" golang
fi

echo ">>> Go 版本信息:"
find . -path "*/golang/golang/Makefile" -exec grep -E 'GO_VERSION_MAJOR_MINOR|GO_VERSION_PATCH' {} \; | head -5 || true
echo ">>> Done."
