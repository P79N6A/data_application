// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /mock/user/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },

  // GET POST 可省略

  /*  'POST /mock/user/register/user/login': (req, res) => {
      const users={
        admin:'888888',
        user:'123456',
        wan:'qingying',
        skr:'sker',
      };
      let names=Object.keys(users);
      const { passWord, userName, type } = req.body;
      console.log(userName)
      if (names.includes(userName) && users[userName]===passWord){
          res.send({
            status: 'ok',
            type,
            currentAuthority: userName,
          });
          return;
      } else{
        res.send({
          status: 'error',
          type,
          currentAuthority: 'guest',
        });
      }
      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
      });
    }, */

  'GET /mock/user/register/user/login': (req, res) => {
    const users = {
      admin: '888888',
      user: '123456',
      wan: 'qingying',
      skr: 'sker',
    };
    const names = Object.keys(users);
    console.log('===========================', req.url);
    console.log('=========================');
    const { passWord, userName, type } = req.body;
    console.log(userName);
    if (names.includes(userName) && users[userName] === passWord) {
      res.send({
        status: 'ok',
        type,
        currentAuthority: userName,
      });
      return;
    } else {
      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
      });
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },

  'POST /mock/user/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /mock/user/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /mock/user/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /mock/user/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /mock/user/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
