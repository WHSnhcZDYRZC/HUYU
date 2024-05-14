import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { exportFile, importFile } from '@lexical/file';
import { useCallback, useMemo } from "react";
import { Dropdown, Skeleton, Button } from 'antd';
import { SettingOutlined, ImportOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import HistoryStorage from "@/utils/HistoryStorage";
import { Utils } from "@/utils";

const OptionsPlugin = () => {
    const { deleteActive } = Utils.getUtils();
    const [editor] = useLexicalComposerContext();

    const importHandler = useCallback(() => {
        importFile(editor)
    }, [editor])

    const exportHandler = useCallback(() => {
        const activeRouter = HistoryStorage.getSessionItem("ActiveRouter")

        exportFile(editor, {
            fileName: `${activeRouter.title || activeRouter.label}`,
            source: 'Playground',
        })
    }, [editor])

    const deleteHandler = useCallback(() => {
        deleteActive();
    }, [
        deleteActive
    ])

    const items = useMemo(() => {
        return [
            {
                key: '1',
                label: (
                    <Button
                        type="primary"
                        icon={<ImportOutlined />}
                        onClick={importHandler}
                    >导入</Button>
                ),
            },
            {
                key: '2',
                label: (
                    <Button
                        icon={<ExportOutlined />}
                        onClick={exportHandler}
                    >导出</Button>
                ),
            },
            {
                key: '3',
                label: (
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={deleteHandler}
                    >删除</Button>
                ),
            },
        ];
    }, [])

    return (
        <div className='editor-setting-hy'>
            <Dropdown menu={{ items }} placement="bottom">
                <Button
                    icon={<SettingOutlined />}
                />
            </Dropdown>
        </div>
    );
}

export default OptionsPlugin;