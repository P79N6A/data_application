import React, { PureComponent } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button, Alert, Tooltip } from 'antd';
import { formatMessage } from 'umi/locale';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'dva';
import omit from 'omit.js';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import BlockChecbox from './BlockChecbox';
import blank from '../../../assets/blank.svg'
import leftMenu from '../../../assets/leftMenu.svg'
import topMenu from '../../../assets/topMenu.svg'

const { Option } = Select;

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

@connect(({ setting }) => ({ setting }))
class SettingDrawer extends PureComponent {
  state = {
    collapse: false,
  };

  getLayoutSetting = () => {
    const {
      setting: { contentWidth, fixedHeader, layout, autoHideHeader, fixSiderbar },
    } = this.props;
    return [
      {
        title: formatMessage({ id: 'app.setting.content-width' }),
        action: (
          <Select
            onSelect={value => this.changeSetting('contentWidth', value)}
            size="small"
            style={{ width: 80 }}
            value={contentWidth}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                {formatMessage({ id: 'app.setting.content-width.fixed' })}
              </Option>
            )}
            <Option value="Fluid">
              {formatMessage({ id: 'app.setting.content-width.fluid' })}
            </Option>
          </Select>
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.fixedheader' }),
        action: (
          <Switch
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
            size="small"
          />
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.hideheader' }),
        disabled: !fixedHeader,
        disabledReason: formatMessage({ id: 'app.setting.hideheader.hint' }),
        action: (
          <Switch
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
            size="small"
          />
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.fixedsidebar' }),
        disabled: layout === 'topmenu',
        disabledReason: formatMessage({ id: 'app.setting.fixedsidebar.hint' }),
        action: (
          <Switch
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
            size="small"
          />
        ),
      },
    ];
  };

  changeSetting = (key, value) => {
    const { setting } = this.props;
    const nextState = { ...setting };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
    }
    this.setState(nextState, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'setting/changeSetting',
        payload: this.state,
      });
    });
  };

  togglerContent = () => {
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  renderLayoutSettingItem = item => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip
        placement="left"
        title={item.disabled ? item.disabledReason : ''}
      >
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  render() {
    const { setting } = this.props;
    const { navTheme, primaryColor, layout, colorWeak } = setting;
    const { collapse } = this.state;
    return (
      <Drawer
        handler={
          <div className={styles.handle}>
            <Icon
              style={{
                color: '#fff',
                fontSize: 20,
              }}
              type={collapse ? 'close' : 'setting'}
            />
          </div>
        }
        onClose={this.togglerContent}
        onHandleClick={this.togglerContent}
        placement="right"
        style={{
          zIndex: 999,
        }}
        visible={collapse}
        width={300}
      >
        <div className={styles.content}>
          <Body title={formatMessage({ id: 'app.setting.pagestyle' })}>
            <BlockChecbox
              list={[
                {
                  key: 'dark',
                  url: leftMenu,
                  title: formatMessage({ id: 'app.setting.pagestyle.dark' }),
                },
                {
                  key: 'light',
                  url: blank,
                  title: formatMessage({ id: 'app.setting.pagestyle.light' }),
                },
              ]}
              onChange={value => this.changeSetting('navTheme', value)}
              value={navTheme}
            />
          </Body>

          <ThemeColor
            onChange={color => this.changeSetting('primaryColor', color)}
            title={formatMessage({ id: 'app.setting.themecolor' })}
            value={primaryColor}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockChecbox
              list={[
                {
                  key: 'sidemenu',
                  url: leftMenu,
                  title: formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'topmenu',
                  url: topMenu,
                  title: formatMessage({ id: 'app.setting.topmenu' }),
                },
              ]}
              onChange={value => this.changeSetting('layout', value)}
              value={layout}
            />
          </Body>

          <List
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
            split={false}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.othersettings' })}>
            <List.Item
              actions={[
                <Switch
                  checked={!!colorWeak}
                  onChange={checked => this.changeSetting('colorWeak', checked)}
                  size="small"
                />,
              ]}
            >
              {formatMessage({ id: 'app.setting.weakmode' })}
            </List.Item>
          </Body>
          <Divider />
          <CopyToClipboard
            onCopy={() => message.success(formatMessage({ id: 'app.setting.copyinfo' }))}
            text={JSON.stringify(omit(setting, ['colorWeak']), null, 2)}
          >
            <Button
              block
              icon="copy"
            >
              {formatMessage({ id: 'app.setting.copy' })}
            </Button>
          </CopyToClipboard>
          <Alert
            className={styles.productionHint}
            message={
              <div>
                {formatMessage({ id: 'app.setting.production.hint' })}{' '}
                <a
                  href="https://u.ant.design/pro-v2-default-settings"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  src/defaultSettings.js
                </a>
              </div>
            }
            type="warning"
          />
        </div>
      </Drawer>
    );
  }
}

export default SettingDrawer;
