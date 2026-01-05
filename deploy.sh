#!/bin/bash
SERVER_IP="115.175.37.0"
SERVER_PATH="/root/www/my-geek-blog"

echo "------------------------------------------"
echo "🚀 正在通过 rsync 增量同步源码..."
echo "------------------------------------------"

# 使用 rsync 同步
# -a: 归档模式，保留权限等信息
# -v: 显示详细过程
# -z: 传输时压缩数据（加快速度）
# --delete: 服务器上如果有多余文件（本地已删）则同步删除
# --exclude: 排除不需要上传的文件夹
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='.env' \
  ./ root@$SERVER_IP:$SERVER_PATH

echo "------------------------------------------"
echo "✅ 同步完成！"
echo "------------------------------------------"