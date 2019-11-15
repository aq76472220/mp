执行上线有以下步骤

1. 在这个目录执行
node r.js -o config/build.js

2. 打开index.html
找到 NODE_ENV 改为 product

3. 打开static/main.js
修改 debug 为 false

4. 打开config/config.js
修改 baseUrl 为 /agent/build/

5. 打开config/config.js
注释 urlArgs 选项


ps 以上打开均为编辑器打开


