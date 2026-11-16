# 会话开始前同步代码

- 每次会话开始，先运行 `git fetch` 检查当前仓库远端状态。
- 远端有新提交且本地工作区干净时，执行 `git pull` 同步最新代码后再开始工作。
- 当前目录不是 Git 仓库或没有远端时，跳过同步，不视为错误。

# Git 提交身份

- 任何 git 提交前，检查 `git config user.name` 和 `git config user.email`。
- 若与 `st2eam` / `379403404@qq.com` 不一致，先运行 `git config user.name "st2eam"` 和 `git config user.email "379403404@qq.com"`，再继续提交。
- 只设置当前仓库级配置，不修改全局 `--global` 配置。

# NPM 源

- 配置 npm / yarn / pnpm 源时，只允许使用公共 registry：官方源 `https://registry.npmjs.org` 或国内镜像 `https://registry.npmmirror.com`。
- 任何输出（命令、日志、文档、聊天回复）不得包含私有/内网 registry 地址、认证 token 或相关敏感信息。
- 发现环境已配置私有源时，只提示“存在私有源配置”，不展示其地址与内容。
