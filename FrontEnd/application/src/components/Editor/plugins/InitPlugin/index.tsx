import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { defaultData } from './InitData'
import { Utils } from '@/utils';
import activeStore from '@/store';

const AutoSavePlugin = () => {
    const setArticleContent = activeStore((state: any) => state.setArticleContent)
    const setArticleTitle = activeStore((state: any) => state.setArticleTitle)

    const [editor] = useLexicalComposerContext();
    const { setBreadcrumb } = Utils.getUtils()

    const title = useRef("");
    // const content = useRef("");

    // const isInit = useRef(true);

    const setDefaultDataHandler = () => {
        // if (isInit.current) {
        let data = {}
        const _data = data.editorState ? data : defaultData()
        const json = JSON.parse(_data);
        const editorState = editor.parseEditorState(
            JSON.stringify(json.editorState),
        );
        editor.setEditorState(editorState);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
        // }
    }

    const synchronizationContentHandler = () => {
        const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());
        setArticleContent(stringifiedEditorState)

        // console.log("stringifiedEditorState", stringifiedEditorState);
    }

    useEffect(() => {
        // setTimeout(() => {
        //     console.log("editor.getEditorState()", editor.getEditorState());

        //     console.log("editor.getEditorState().toJSON()", editor.getEditorState().toJSON());

        //     const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());

        //     // JSON
        //     console.log("stringifiedEditorState", stringifiedEditorState);

        //     const newEditorState = editor.parseEditorState(stringifiedEditorState);

        //     console.log("newEditorState ===>", newEditorState);

        // }, 3000)

        editor.update(setDefaultDataHandler)
        editor.focus();
        editor.registerUpdateListener(({ editorState }) => {
            const { _nodeMap } = editorState;
            if (_nodeMap.size === 2) {
                const res = _nodeMap.values()
                let temp;
                while (!(res.next().done)) {
                    temp = res.next()
                };
                const { value }: any = temp;
                if (!(value?.__parent === "root" && value?.__type === "heading")) {
                    setDefaultDataHandler()
                    // isInit.current = false;
                }
            };

            if (_nodeMap.size > 3) {
                const titleItem = [..._nodeMap][2];
                const titleVal = titleItem[titleItem.length - 1]

                if (!titleVal.__text) return;

                if (title.current === titleVal.__text) return;
                title.current = titleVal.__text;

                setBreadcrumb(title.current);
                setArticleTitle(title.current);
            }

            synchronizationContentHandler()

            // editorState.read(() => {
            // Just like editor.update(), .read() expects a closure where you can use
            // the $ prefixed helper functions.
            // });
        });
    }, [editor]);

    return null;
}

export default AutoSavePlugin;