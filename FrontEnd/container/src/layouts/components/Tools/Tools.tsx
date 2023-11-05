import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styled from './Tools.less'

interface ToolsInf {
    addPageRouterHandler: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Tools = (props: ToolsInf) => {
    const { addPageRouterHandler } = props;

    return (
        <div className={styled.tools}>
            <SearchOutlined />
            <PlusOutlined onClick={(e) => addPageRouterHandler(e)} />
        </div>
    )
}

export default Tools;