export default {
  regName: new RegExp(
    '[`~!-+@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]',
  ), // 匹配名称
  regUrl: new RegExp('[`~!$^*()|{}\':;\',\\[\\]<>/~！￥……（）——|{}【】‘；”“\'。，、]'), // 匹配地址
  regCode: new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]'), // 编号
  regQQ: /\D+/g,
  regDesc: new RegExp('[`^|【】]'), // 描述
};
