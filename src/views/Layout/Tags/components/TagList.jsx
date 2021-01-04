import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { Tag } from "antd";
import { deleteTag, emptyTaglist, closeOtherTags } from "@/store/actions";

class TagList extends Component {
    tagListContainer = React.createRef();
    contextMenuContainer = React.createRef();
    state = {
        left: 0,
        top: 0,
        menuVisible: false
    }
    // 跳转
    handleClose = (tag) => {
        const { history, deleteTag, taglist } = this.props;
        const path = tag.path; // 路径路由
        const currentPath = history.location.pathname; // 跳转显示页面
        const length = taglist.length;
        // 若关闭当前页，跳转到最后一个tag
        if (path === currentPath) {
            history.push(taglist[length - 1].path);
        }
        // 若关闭最后的tag，当前显示的也是最后的tag页面，做路由跳转
        if (path === taglist[length - 1].path && currentPath === taglist[length - 1].path) {
            // 故 cutTagList在最后执行，所以跳转到上一个tags的对应路由， -2
            if (length - 2 > 0) {
                history.push(taglist[length - 2].path)
            } else if (length === 2) {
                history.push(taglist[0].path)
            }
        }
        // 先跳转路由再修改state树的taglist
        deleteTag(tag)
    }
    handleClick = (path) => {
        this.props.history.push(path)
    }
    openContextMenu = (tag, event) => {
        event.preventDefault();
        const menuMinWidth = 105;
        const clickX = event.clientX; //事件X坐标
        const clickY = event.clientY; //事件Y坐标
        const clientWidth = this.tagListContainer.current.clientWidth; // container width
        const maxLeft = clientWidth - menuMinWidth; // left boundary
        // 当鼠标点击位置大于左侧边界时，说明鼠标点击的位置偏右, 菜单放左
        if (clickX > maxLeft) {
            this.setState({
                left: clickX - menuMinWidth + 15,
                top: clickY,
                menuVisible: true,
                currentTag: tag
            })
        } else {
            // 相反
            this.setState({
                left: clickX,
                top: clickY,
                menuVisible: true,
                currentTag: tag,
            });
        }
    }
    // 隐藏菜单
    closeContextMenu() {
        this.setState({
            menuVisible: false,
        });
    }
    // 监听
    handleClickOutside = (event) => {
        const { menuVisible } = this.state;
        const isOutside = !(
            this.contextMenuContainer.current &&
            this.contextMenuContainer.current.contains(event.target)
        );
        if (isOutside && menuVisible) {
            this.closeContextMenu();
        }
    };
    componentDidMount() {
        document.body.addEventListener("click", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.body.removeEventListener("click", this.handleClickOutside);
    }
    // 关闭其他
    handleCloseOtherTags = () => {
        const currentTag = this.state.currentTag;
        const { path } = currentTag;
        this.props.closeOtherTags(currentTag);
        this.props.history.push(path);
        this.closeContextMenu();
    }
    // 关闭全部
    handleCloseAllTags = () => {
        this.props.emptyTaglist();
        this.props.history.push("/dashboard");
        this.closeContextMenu();
    }
    render() {
        const { left, top, menuVisible } = this.state;
        const { taglist, history } = this.props;
        const currentPath = history.location.pathname;
        return (
            <>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    hideTracksWhenNotNeeded={true}
                    renderView={(props) => (
                        <div {...props} className="scrollbar-container" />
                    )}
                    renderTrackVertical={(props) => (
                        <div {...props} className="scrollbar-track-vertical" />
                    )}
                >

                    <ul className="tags-wrap" ref={this.tagListContainer}>
                        {
                            taglist.map((tag) => (
                                <li key={tag.path}>
                                    <Tag
                                        onClose={this.handleClose.bind(null, tag)}
                                        closable={tag.path !== "/dashboard"}
                                        color={currentPath === tag.path ? "green" : "orange"}
                                        onClick={this.handleClick.bind(null, tag.path)}
                                        onContextMenu={this.openContextMenu.bind(null, tag)}
                                    >
                                        {tag.title}
                                    </Tag>
                                </li>
                            ))
                        }
                    </ul>
                </Scrollbars>
                {
                    menuVisible ? (
                        <ul
                            className="contextmenu"
                            style={{ left: `${left}px`, top: `${top}px` }}
                            ref={this.contextMenuContainer}>
                            <li onClick={this.handleCloseOtherTags}>关闭其他</li>
                            <li onClick={this.handleCloseAllTags}>关闭全部</li>
                        </ul>
                    ) : null
                }
            </>
        )
    }
}

export default withRouter(
    connect((state) => state.tags, {
        deleteTag,
        emptyTaglist,
        closeOtherTags,
    })(TagList)
);
