import fs from 'fs/promises';
import path from 'path';

// 定义目标目录的路径
const targetDir = path.resolve(process.cwd(), './../node_modules/code-example/txt');

// 定义匹配文件名模式的正则表达式
const filePattern = /^sample\..*\.txt$/;

// 新文件的路径
const outputFilePath = path.resolve(process.cwd(), './../src/assets/langCodeMap.json');

async function processFiles() {
  try {
    // 读取目录内容
    const files = await fs.readdir(targetDir);

    // 过滤出符合正则表达式的文件
    const matchedFiles = files.filter(file => filePattern.test(file));

    // 用于存储处理后的信息
    const result = {};

    // 遍历匹配的文件，获取信息
    for (const file of matchedFiles) {
      const filePath = path.join(targetDir, file);

      // 读取文件内容
      const content = await fs.readFile(filePath, 'utf8');
      
      // 处理文件内容并根据需要添加到对象中
      // 这里假设你要以文件名作为键，文件内容作为值
      // 例如 result[file] = content;
      // 如果目标是 {a: 'ss'}，这表示你会根据内容处理逻辑进行设置
      const name = file?.replace("sample.", '')?.replace(".txt", '')
      result[name] = content; // 根据需求修改以符合 {a: 'ss'} 格式
    }

    // 将结果对象转换为JSON字符串并写入文件
    await fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`处理结果已写入 ${outputFilePath}`);
  } catch (err) {
    console.error('处理文件或目录时出错:', err);
  }
}

processFiles();