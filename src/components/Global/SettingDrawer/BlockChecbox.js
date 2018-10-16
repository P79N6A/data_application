import React from 'react';
import { Tooltip, Icon } from 'antd';
import style from './index.less';

const BlockChecbox = ({ value, onChange, list }) => (
  <div className={style.blockChecbox}
      key={value}
  >
    {list.map(item => (
      <Tooltip key={item.key}
          title={item.title}
      >
        <div className={style.item}
            onClick={() => onChange(item.key)}
        >
          <img alt={item.key}
              src={item.url}
          />
          <div
              className={style.selectIcon}
              style={{
              display: value === item.key ? 'block' : 'none'
            }}
          >
            <Icon type="check" />
          </div>
        </div>
      </Tooltip>
    ))}
  </div>
);

export default BlockChecbox;
