import React, {createElement} from 'react';
import {Spin} from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';

let routerDataCache;

function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
  } else if (props.pastDelay) {
    return <Spin size="large" className="global-spin"/>;
  } else {
    return null;
  }
}

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({namespace}) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

let i = 0;
// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  i++;
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      app.model(require(`../models/${model}`).default);
    }
  });

  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);

      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }

  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    render(loaded, props) {
      let Component = loaded;
      return <Component {...props}/>;
    },
    loading: Loading,
    delay: 400,
    timeout: 4000,
  });
};

export const getRouterData = app => {
  const routerConfig = {
    '/home': {
      component: dynamicWrapper(app, [], () => import('../routes/home')),
    },
    '/collect': {
      component: dynamicWrapper(app, [], () => import('../routes/dataCollect')),
      name: '数据采集'
    },
    '/collect/list': {
      name: '数据采集列表',
      component: dynamicWrapper(app, [] , () => import('../components/DataCollect/CollectList'))
    },
    '/collect/resources': {
      name: '数据采集源',
      component: dynamicWrapper(app, [], () => import('../components/DataCollect/CollectResource'))
    },
    '/resource': {
      component: dynamicWrapper(app, [], () => import('../routes/dataResource')),
    },
    '/resource/list': {
      component: dynamicWrapper(app, [], () => import('../routes/dataResource/resourceList')),
    },
    '/resource/manage': {
      component: dynamicWrapper(app, [], () => import('../routes/dataResource/resourceManage')),
    },
    '/': {
      component: dynamicWrapper(app, [], () => import('../layouts/DefaultLayout')),
    },
  };
  const routerData = {};
  Object.keys(routerConfig).forEach(path => {
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name
    };
    routerData[path] = router;
  });
  return routerData;
};
