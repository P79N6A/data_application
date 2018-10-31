import { Icon, Popover} from "antd";
import styles from "../index.less";
const logout = window.SSystem.logout;//用户退出地址
const AvatorPanel = ({userName})=>{

    const content = (
        <div style={{ height: "60px",width:"48px" }}>
            <p style={{ color: "#595959" }}>
                <Icon type="setting" />
                设置
            </p>
            <p style={{ color: "#595959" }}>
                <Icon type="poweroff" />
                <a href={`${logout}/logout`}>退出</a>
            </p>
        </div>
    );

    return (
        <div className={styles.userInfoPanel}>
            <Popover
                placement="bottomLeft"
                arrowPointAtCenter
                content={content}
                trigger="click">
                <Icon type="user" />
                <span className={styles.userName}>{userName}</span>
                <Icon type="down" />
            </Popover>
        </div>
    )
}

/**
 * 头像面板
 */
export default AvatorPanel;
