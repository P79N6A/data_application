import React, { PureComponent } from "react";
import { Layout, Icon, Menu } from "antd";
import { Link } from "dva/router";
// import iconfont from "@/styles/iconfont.css";
// import className from 'classnames';
import zhCN from '@/locales/zh-CN'
// import iconfont from "@iconfont";
import styles from "./index.less";
import iconf from '../../../styles/iconfont.css'

const { Sider } = Layout;

class LeftList extends PureComponent {
    constructor() {
        super();
        this.state = {
            collapsed: false,
        };
    }

    componentDidMount() {
        this.resetScroll();
    }

    handleClick = () => {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed }, () => {
            this.resetScroll(true);
        });
    };

    resetScroll = (need) => {
        const trigger = document.getElementById("j-left-trigger");
        const { collapsed } = this.state
        const left = collapsed ? 79 : 179;
        // console.log("left", left);
        if (need) { trigger.style.left = `${left  }px` };
        window.onscroll = function () {
            // 滚动条滚动时，trigger变化,兼容IE9
            const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            trigger.style.left = `${left - scrollLeft  }px`;
        }
    }

    // 设置路由配置
    fetRouter = (pathname, menuData) => {
      const paths = pathname.split('/')[1]
      const arr = []
      menuData.forEach(item => {
        if(item.path && ! item.hideInMenu) {
          const path = item.path.split('/')[1]
          if(paths === path){
            arr.push(item)
          }
        }
      })
      return arr
    }

    render() {
        const { location , menuData} = this.props;
        const {pathname} = location
        const routes = this.fetRouter(pathname, menuData)
        // console.log(pathname)
        const { collapsed } = this.state;
        return (
          <Sider
            className={styles.sider_body}
            collapsible
            trigger={null}
            collapsed={collapsed}
            style={{
                display: "inline-block",
                backgroundColor: "#f2f3f3",
                borderRight: "1px solid #d1d1d1",
            }}
          >
            {/* 左侧菜单 */}
            <Menu
              theme="light"
              selectedKeys={[pathname]}
              mode="inline"
              style={
                  collapsed
                      ? {
                          backgroundColor: "#f2f3f3",
                          borderRight: "1px solid #d1d1d1",
                      }
                      : { backgroundColor: "#f2f3f3", border: "none" }
              }
            >

              {routes.map((item) => {
                console.log("item is",item);
                if (zhCN[ `menu.${item.name}`]) {
                  return (
                    <Menu.Item key={item.path}>
                      <Link key={item.path} to={item.path}>
                        <i className={styles.titleIcon + " " + iconf.iconfont + " " + iconf[item.icon] }></i>
                        <span className={styles['menu-label']}>{zhCN[ `menu.${item.name}`]}</span>
                      </Link>
                    </Menu.Item>
                  )
                } else {
                  return null
                }
              })}
            </Menu>

            {/* 收起icon */}
            <div
              id="j-left-trigger"
              className={
                        collapsed ? styles.trigger : styles.trigger_collapsed
                    }
              onClick={this.handleClick}
            >
              {collapsed ? <Icon type="right" /> : <Icon type="left" />}
            </div>
          </Sider>
        );
    }
}

export default LeftList;
