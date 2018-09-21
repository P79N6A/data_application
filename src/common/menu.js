import {isUrl} from '../utils/utils';

const menuData = [
  {
    name: '首页',
    path: 'home',
  },
  {
    name: '数据采集',
    path: 'collect',
  },
  {
    name: '数据资源',
    path: 'resource',
  },
  {
    name: '数据应用',
    path: 'application',
  }
];

function formatter(data, parentPath = '/') {
  return data.map(item => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  })
}

export const getMenuData = () => formatter(menuData);
