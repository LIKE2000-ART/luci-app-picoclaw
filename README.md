# 🦐 PicoClaw for OpenWrt

超轻量级 AI 助手 · OpenWrt LuCI 管理界面

[![PicoClaw](https://img.shields.io/badge/PicoClaw-v0.1.2-blue.svg?style=flat-square)](https://github.com/sipeed/picoclaw)
[![luci-app-picoclaw](https://img.shields.io/badge/luci--app--picoclaw-v1.0.0-green.svg?style=flat-square)](https://github.com/LIKE2000-ART/luci-app-picoclaw/releases)
[![License](https://img.shields.io/badge/License-MIT-orange.svg?style=flat-square)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/LIKE2000-ART/luci-app-picoclaw/picoclaw-release.yml?style=flat-square&label=CI)](https://github.com/LIKE2000-ART/luci-app-picoclaw/actions)

> [!CAUTION]
> **🚧 项目状态：实验性 / Vibe Coding 初作 🚧**
>
> 本项目是作者的 **Vibe Coding 初次尝试**，代码主要由 AI 辅助生成，作者进行整合与调试。
> 项目尚处于 **早期实验阶段**，可能存在未发现的 Bug、安全隐患或不稳定行为。
> **请勿将本项目用于任何生产环境或关键业务场景！**
> 使用本项目所产生的一切后果，由使用者自行承担。
>
> **🤖 AI 生成代码声明**
>
> 本项目（包括 Makefile、init 脚本、LuCI 界面、RPC 后端等）的代码 **主要由 AI（大语言模型）生成**，
> 作者在此基础上进行了人工审查、调整和测试，但 **无法保证代码完全没有缺陷或安全漏洞**。
> 如果你在意路由器的安全性和稳定性，请在充分理解代码的前提下使用，或等待项目更加成熟后再考虑部署。

---

## 📖 项目简介

> **自研声明**：本项目为个人兴趣驱动的 **第三方社区作品**，与 PicoClaw 官方及 Sipeed 公司无关。
> 仅对 PicoClaw 的 OpenWrt 打包和 LuCI 管理界面进行尝试性开发，不代表官方立场或质量标准。

本项目为 [PicoClaw](https://github.com/sipeed/picoclaw)（Sipeed 出品的超轻量级 Go 语言 AI 助手）提供**尝试性的** **OpenWrt IPK 打包编译** 支持及 **LuCI Web 管理界面**，让你可以：

- ✅ 在 OpenWrt 路由器上一键安装部署 PicoClaw
- ✅ 通过 LuCI Web 界面配置和管理 PicoClaw 服务
- ✅ 尝试性支持多种 AI 模型（DeepSeek、GPT-4、Claude、Gemini 等）
- ✅ 尝试性集成 Telegram / Discord / 钉钉 / 企业微信等消息通道
- ✅ 实时查看运行状态和日志

### 什么是 PicoClaw？

PicoClaw 是一个由 [Sipeed](https://sipeed.com) 开发的超轻量级个人 AI 助手，使用 Go 语言编写：

| 特性 | 说明 |
| ------ | ------ |
| 🪶 **超轻量** | 运行内存 < 10MB，比同类产品小 99% |
| 💰 **低成本** | 可在 $10 硬件上运行，比 Mac mini 便宜 98% |
| ⚡ **极速启动** | 1 秒启动，即使在 0.6GHz 单核设备上 |
| 🌍 **全平台** | 单一二进制文件，支持 RISC-V / ARM / x86 |
| 🤖 **AI 驱动** | 95% 代码由 AI Agent 自主生成 |

> 🔗 PicoClaw 官方仓库：<https://github.com/sipeed/picoclaw>

---

## 📦 包含内容

本项目包含两个 OpenWrt 软件包：

### 1. `picoclaw` — 核心二进制包

| 文件 | 说明 |
| ------ | ------ |
| `Makefile` | OpenWrt Go 交叉编译配置，自动从 GitHub 下载源码并编译 |
| `files/picoclaw.init` | procd init.d 启动脚本，支持 `picoclaw gateway` 守护进程模式 |
| `files/picoclaw.conf` | UCI 默认配置（网关、代理、心跳等参数） |
| `files/picoclaw-config.json` | PicoClaw 默认 JSON 配置（模型列表、通道、工具等） |
| `files/picoclaw.uci-default` | 首次安装时自动初始化工作区并启用服务 |

### 2. `luci-app-picoclaw` — LuCI Web 管理界面

| 文件 | 说明 |
| ------ | ------ |
| `htdocs/.../picoclaw/config.js` | 基本设置页：服务状态、网关、Agent、心跳 |
| `htdocs/.../picoclaw/manual.js` | 手动设置页：在线编辑 `config.json`，保存后自动重启 |
| `htdocs/.../picoclaw/log.js` | 日志页面：实时日志查看、按时间倒序、一键清除 |
| `root/.../luci-app-picoclaw.json` | LuCI 菜单定义 |
| `root/.../acl.d/luci-app-picoclaw.json` | 权限控制 (ACL) |
| `root/.../rpcd/ucode/luci.picoclaw` | RPC 后端（版本查询、状态检查、配置读写） |
| `po/zh_Hans/picoclaw.po` | 简体中文翻译 |

---

## 📁 目录结构

```text
.
├── picoclaw/                              # 核心二进制包
│   ├── Makefile                           # OpenWrt Go 交叉编译 Makefile
│   └── files/
│       ├── picoclaw-config.json           # 默认 JSON 配置文件
│       ├── picoclaw.conf                  # UCI 默认配置
│       ├── picoclaw.init                  # procd init.d 启动脚本
│       └── picoclaw.uci-default           # 首次安装初始化脚本
│
├── luci-app-picoclaw/                     # LuCI Web 管理界面
│   ├── Makefile                           # LuCI 应用 Makefile
│   ├── htdocs/
│   │   └── luci-static/resources/view/picoclaw/
│   │       ├── config.js                  # 基本设置页面（JS 视图）
│   │       ├── manual.js                  # 手动设置页面（JSON 编辑器）
│   │       └── log.js                     # 日志页面（JS 视图）
│   ├── po/
│   │   ├── templates/picoclaw.pot         # 翻译模板
│   │   └── zh_Hans/picoclaw.po            # 简体中文翻译
│   └── root/
│       └── usr/share/
│           ├── luci/menu.d/
│           │   └── luci-app-picoclaw.json # LuCI 菜单
│           └── rpcd/
│               ├── acl.d/
│               │   └── luci-app-picoclaw.json  # 权限控制
│               └── ucode/
│                   └── luci.picoclaw      # RPC 后端脚本
│
└── README.md                              # 本说明文件
```

---

## 🛠️ 编译安装

### 前提条件

- OpenWrt SDK 或完整的 OpenWrt 源码编译环境
- 已安装 `golang/host` 编译依赖（Go 交叉编译器）
- 已配置 `feeds/packages` 和 `feeds/luci`

> [!IMPORTANT]
> **更新 Go 工具链**：PicoClaw 编译需要 **Go >= 1.25**，而 OpenWrt 24.10 SDK 自带的是 Go 1.23。
> 编译前必须执行 `scripts/feeds.sh` 更新 Go 工具链：
>
> ```bash
> # 在 OpenWrt SDK 根目录下执行
> bash /path/to/luci-app-picoclaw/scripts/feeds.sh
> ```
>
> 该脚本会自动将 `feeds/packages/lang/golang` 替换为 [sbwml/packages_lang_golang](https://github.com/sbwml/packages_lang_golang) 的新版 Go 包。
> **注意**：通过 GitHub Actions CI 编译时无需手动执行，CI 已使用 `go1.25` 分支自动处理。

### 方法一：通过 feeds 安装（推荐）

#### 1. 添加源

编辑 OpenWrt 源码根目录下的 `feeds.conf.default`，添加：

```bash
src-git picoclaw https://github.com/LIKE2000-ART/luci-app-picoclaw.git
```

#### 2. 更新并安装

```bash
# 更新 feeds
scripts/feeds update picoclaw

# 安装 picoclaw 相关包
scripts/feeds install picoclaw
scripts/feeds install luci-app-picoclaw
```

#### 3. 配置编译选项

```bash
make menuconfig
```

在菜单中选择：

- `Network` → `Web Servers/Proxies` → `<*> picoclaw`
- `LuCI` → `Applications` → `<*> luci-app-picoclaw`

#### 4. 编译

```bash
# 编译 picoclaw 核心包
make package/picoclaw/compile V=s

# 编译 LuCI 界面包
make package/luci-app-picoclaw/compile V=s
```

### 方法二：直接克隆源码

```bash
# 克隆到 package 目录
git clone https://github.com/LIKE2000-ART/luci-app-picoclaw.git package/picoclaw-suite

# 或只拷贝需要的目录
cp -r picoclaw/ <openwrt-source>/package/picoclaw/
cp -r luci-app-picoclaw/ <openwrt-source>/package/luci-app-picoclaw/

# 配置并编译
make menuconfig
make package/picoclaw/compile V=s
make package/luci-app-picoclaw/compile V=s
```

### 方法三：下载预编译包安装

前往 [Releases](https://github.com/LIKE2000-ART/luci-app-picoclaw/releases) 下载对应架构的 `.tar.gz` 压缩包，解压后安装：

```bash
# 解压
tar -xzf SNAPSHOT-aarch64_generic.tar.gz

# OpenWrt 24.10+（apk 格式）
apk add --allow-untrusted packages_ci/*.apk

# OpenWrt 23.05 及更早（ipk 格式）
opkg install packages_ci/*.ipk

# 重启 rpcd 和 uhttpd 使 LuCI 界面生效
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
```

---

## ⚙️ 配置说明

### UCI 配置 (`/etc/config/picoclaw`)

安装后会自动生成 UCI 配置文件，包含以下配置段：

#### 基本配置 (basic)

```ini
config basic 'config'
        option enabled '0'       # 是否启用服务（0=关闭，1=启用）
        option logger '1'        # 是否启用日志记录
        option delay '0'         # 开机延时启动（秒）
```

#### 网关配置 (gateway)

```ini
config gateway 'gateway'
        option host '0.0.0.0'    # 监听地址（0.0.0.0 = 所有接口）
        option port '18790'      # 监听端口
```

#### Agent 配置 (agent)

```ini
config agent 'agent'
        option workspace '/etc/picoclaw/workspace'  # 工作目录
        option restrict_to_workspace '0'             # 是否限制在工作目录
```

> 💡 AI 模型、Token 数、温度等高级参数请通过 LuCI **手动设置** 页面或直接编辑 `/etc/picoclaw/config.json` 配置。

#### 心跳配置 (heartbeat)

```ini
config heartbeat 'heartbeat'
        option enabled '1'       # 是否启用心跳
        option interval '30'     # 心跳间隔（分钟）
```

### JSON 配置 (`/etc/picoclaw/config.json`)

PicoClaw 的详细配置存储在 JSON 文件中，首次启动时会从 `/usr/share/picoclaw/picoclaw-config.json` 自动拷贝生成。

**配置 AI 模型 API Key**（必须）：

```bash
# 方式一：通过 LuCI 界面编辑（推荐）
# 服务 → PicoClaw → 手动设置

# 方式二：SSH 登录路由器后编辑
vi /etc/picoclaw/config.json
```

在 `model_list` 中填入你的 API Key：

```json
{
  "model_list": [
    {
      "model_name": "deepseek",
      "model": "deepseek/deepseek-chat",
      "api_key": "在此填入你的 DeepSeek API Key",
      "api_base": ""
    }
  ]
}
```

支持的 AI 模型提供商：

| 提供商 | model 格式 | 获取 API Key |
| -------- | ----------- | ------------- |
| DeepSeek | `deepseek/deepseek-chat` | [platform.deepseek.com](https://platform.deepseek.com) |
| OpenAI | `openai/gpt-5.2` | [platform.openai.com](https://platform.openai.com) |
| Anthropic | `anthropic/claude-sonnet-4.6` | [console.anthropic.com](https://console.anthropic.com) |
| Google | `antigravity/gemini-2.0-flash` | [aistudio.google.com](https://aistudio.google.com/api-keys) |
| OpenRouter | `openrouter/...` | [openrouter.ai/keys](https://openrouter.ai/keys) |
| 智谱 AI | `zhipu/...` | [open.bigmodel.cn](https://open.bigmodel.cn/usercenter/proj-mgmt/apikeys) |
| Ollama (本地) | `ollama/...` | 无需 API Key |

### 消息通道配置

PicoClaw 支持多种消息通道，在 `config.json` 的 `channels` 段配置：

| 通道 | 配置项 | 说明 |
| ------ | -------- | ------ |
| **Telegram** | `token`, `allow_from` | 需要 BotFather 创建机器人 |
| **Discord** | `token`, `allow_from` | 需要 Discord Developer 创建应用 |
| **钉钉** | `client_id`, `client_secret` | 需要钉钉开放平台创建应用 |
| **企业微信** | `token`, `encoding_aes_key` | 支持智能机器人和自建应用两种模式 |
| **MaixCAM** | `host`, `port` | Sipeed MaixCAM 硬件集成 |

---

## 🖥️ LuCI 界面说明

安装 `luci-app-picoclaw` 后，在 LuCI 管理界面中可通过以下路径访问：

**`服务` → `PicoClaw`**

### 基本设置页

功能包括：

- **运行状态指示** — 实时显示 PicoClaw 是否运行中（每 5 秒自动刷新）
- **版本信息** — 显示当前安装的 PicoClaw 版本号
- **Web 界面入口** — 一键跳转到 PicoClaw Gateway Web 界面
- **服务控制** — 启用/禁用 PicoClaw 服务
- **网关设置** — 配置监听地址和端口
- **Agent 设置** — 工作目录和目录限制
- **心跳设置** — 启用/禁用定时任务心跳

### 手动设置页

功能包括：

- **在线编辑** — 直接编辑 `/etc/picoclaw/config.json` 配置文件
- **JSON 校验** — 保存前自动校验 JSON 格式
- **一键格式化** — 自动美化 JSON 缩进
- **保存并应用** — 保存配置后自动重启 PicoClaw 服务
- **配置参考** — 右下角链接到 [PicoClaw 官方文档](https://github.com/sipeed/picoclaw/blob/main/README.md)

### 日志页

功能包括：

- **实时日志** — 每 5 秒自动刷新日志内容
- **倒序显示** — 最新日志显示在最上方
- **一键清除** — 清空日志文件
- **智能滚动** — 自动保持滚动位置

---

## 📂 工作目录结构

PicoClaw 运行时会在工作目录（默认 `/etc/picoclaw/workspace`）中创建以下文件结构：

```text
/etc/picoclaw/
├── config.json              # 主配置文件
└── workspace/               # Agent 工作目录
    ├── sessions/            # 对话会话和历史
    ├── memory/              # 长期记忆 (MEMORY.md)
    ├── state/               # 持久化状态
    ├── cron/                # 定时任务数据库
    ├── skills/              # 自定义技能
    ├── AGENTS.md            # Agent 行为指南
    ├── HEARTBEAT.md         # 定时任务提示词
    ├── IDENTITY.md          # Agent 身份定义
    ├── SOUL.md              # Agent 灵魂
    ├── TOOLS.md             # 工具描述
    └── USER.md              # 用户偏好设置
```

---

## 🔧 常用命令

```bash
# 启用/禁用服务
uci set picoclaw.config.enabled='1'
uci commit picoclaw
/etc/init.d/picoclaw restart

# 查看服务状态
/etc/init.d/picoclaw status

# 查看运行日志
cat /var/log/picoclaw.log

# 清空日志
> /var/log/picoclaw.log

# 手动运行 PicoClaw Agent（交互模式）
picoclaw agent

# 一次性提问
picoclaw agent -m "你好，今天天气怎么样？"

# 查看版本
picoclaw version

# 查看 PicoClaw 状态
picoclaw status
```

---

## ⚠️ 注意事项与免责声明

> [!IMPORTANT]
> **本项目代码主要由 AI 生成，作者进行了人工整合与调试。**
> 虽然已尽力测试，但仍可能存在未知的 Bug 或安全隐患。
> **在路由器等关键网络设备上使用时，请格外谨慎，务必做好备份！**

### 🛡️ 安全警告

- ⚠️ PicoClaw 及本 LuCI 插件均处于 **早期开发阶段**，**严禁用于生产环境**
- ⚠️ `restrict_to_workspace` 默认关闭，AI Agent **可以访问路由器系统文件**，存在潜在安全风险。如需限制，请务必在 UCI 配置中启用
- ⚠️ 网关默认监听 `0.0.0.0:18790`，**所有网络接口均可访问**，强烈建议通过防火墙限制访问来源
- ⚠️ AI Agent 拥有在路由器上执行命令的能力，请确保你理解这意味着什么

### 📝 其他注意事项

1. **编译源码分支**：`picoclaw/Makefile` 当前配置为从 PicoClaw 仓库的 `main` 分支拉取最新源码编译。每次编译都会获取 `main` 分支的最新提交。如需锁定特定版本，可将 `PKG_SOURCE_VERSION` 改为具体的 commit hash 或 tag。

2. **API Key 必填**：PicoClaw 需要至少配置一个 AI 模型的 API Key 才能正常工作。推荐使用 [DeepSeek](https://platform.deepseek.com)（价格实惠）或连接本地 [Ollama](https://ollama.com) 实例。

3. **Go 编译依赖**：编译 PicoClaw 需要 OpenWrt 的 `golang/host` 包，确保 `feeds/packages` 已正确配置。

4. **内存需求**：PicoClaw 运行仅需约 10-20MB RAM，适合大多数 OpenWrt 路由器。但编译过程中 Go 交叉编译需要较多内存（建议至少 4GB）。

5. **支持架构**：PicoClaw 使用 Go 编写，支持 OpenWrt 的所有主流架构：
   - `x86_64` / `i386`
   - `aarch64` (ARM64)
   - `arm` (ARMv7)
   - `mipsel` / `mips`
   - `riscv64`

---

## 🔄 升级方法

```bash
# 更新 feeds
scripts/feeds update picoclaw

# 重新编译
make package/picoclaw/compile V=s
make package/luci-app-picoclaw/compile V=s

# 将生成的 IPK 上传到路由器安装
opkg install --force-reinstall picoclaw_*.ipk
opkg install --force-reinstall luci-app-picoclaw_*.ipk
```

---

## 📋 版本记录

### 2026.02.27 v1.1.0

- **切换编译分支**：picoclaw 源码从固定版本 tarball（v0.1.2）改为从 `main` 分支 git 拉取最新源码编译
- 新增 **手动设置** 页面 — 在线编辑 `config.json`，支持 JSON 校验、格式化、保存自动重启
- 新增 **配置参考** 链接到 PicoClaw 官方文档
- 新增 GitHub Actions CI 多架构自动构建（openwrt-24.10 + SNAPSHOT）
- 优化 Makefile 构建配置，修复 Go linker `-X` flag 问题
- 精简基本设置页，移除模型/Token 等参数（改由手动设置页管理）

### 2026.02.26 v1.0.0

- 🎉 首次发布（Vibe Coding 初作 🐣）
- 新增 PicoClaw v0.1.2 OpenWrt 编译打包支持（尝试性）
- 新增 LuCI Web 管理界面（luci-app-picoclaw）
- 尝试性支持 UCI 配置管理（基本设置/网关/Agent/心跳）
- 尝试性支持多种 AI 模型选择（DeepSeek/GPT-4/Claude/Gemini）
- 支持实时日志查看和一键清除
- 支持简体中文界面
- 基于官方 `config.example.json` 预生成默认配置
- 首次安装自动执行 `picoclaw onboard` 初始化工作区

---

## 🙏 鸣谢

- [PicoClaw](https://github.com/sipeed/picoclaw) — Sipeed 出品的超轻量级 AI 助手
- [Sipeed](https://sipeed.com) — AIoT 开源硬件平台
- [OpenWrt](https://openwrt.org) — 自由的嵌入式 Linux 操作系统
- [sbwml](https://github.com/sbwml) — openwrt-gh-action-sdk 及 Go 工具链维护
- [sirpdboy](https://github.com/sirpdboy) — OpenWrt 插件开发与维护
- 各路 AI 大模型 — 本项目的主要「码农」🤖

---

## 📜 免责声明

本项目为个人学习和实验性质的开源项目（**Vibe Coding 初作**），代码主要由 AI 辅助生成。

- 本项目与 PicoClaw 官方、Sipeed 公司 **无任何关联**，不代表其立场或质量标准
- 代码未经全面的安全审计，**不保证安全性、稳定性和可靠性**
- 在路由器等网络基础设施上部署未经充分验证的软件存在风险，**使用者需自行承担一切后果**
- 作者不对因使用本项目导致的设备故障、数据丢失、安全事故等承担任何责任
- 如发现 Bug 或安全问题，恳请提交 Issue，受限于个人能力，修复可能不够及时，还望海涵

**简而言之：这是一个初学者与 AI 协作的尝试性作品，旨在探索与学习。由于经验有限，难免存在疏漏，请务必在非生产环境下谨慎测试。** 🙏

---

## 📞 相关链接

| 链接 | 说明 |
| ------ | ------ |
| [PicoClaw 官方仓库](https://github.com/sipeed/picoclaw) | PicoClaw 源码和文档 |
| [PicoClaw 官网](https://picoclaw.io) | 官方网站 |
| [Sipeed 官网](https://sipeed.com) | 硬件购买渠道 |
| [OpenWrt 官网](https://openwrt.org) | OpenWrt 固件下载 |

---
