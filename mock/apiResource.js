import { parse } from 'url';
import Mock from 'mockjs';

let datas = Mock.mock({
  'tableListDataSource|5-8': [{
    'apiDesc|1': ['用于学校监控', '用于社区门禁', '用于高速路收费站'],
    'apiName|1': ['管制刀具识别', '危险人物识别', '非法持枪识别'],
    'serviceName|1': ['危险物品识别', '监控识别'],
    'apiPath|1': ['/apiService/identify', '/apiService/watch'],
    'serviceGroup|1': ['安全管制', '威胁预警'],
    'apiState|0-2': 1,
    'id|+1': 1,
    'key|+1': 1,
  }]
});

function getApi(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  let dataSource = datas['tableListDataSource'];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    }
  };

  return res.json(result);
}

function postRuleAdd(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  // const { method, name, desc, key } = body;
  body.apiState = 2;
  body.id = datas.tableListDataSource.length + 1;
  body.key = datas.tableListDataSource.length + 1;
  datas.tableListDataSource.push(body);

  const result = {
    list: datas.tableListDataSource,
    pagination: {
      total: datas.tableListDataSource.length,
    }
  };

  return res.json(result);
}

export default {
  'GET /mock/api/apiList': getApi,
  'POST /mock/api/addApi': postRuleAdd,
};
