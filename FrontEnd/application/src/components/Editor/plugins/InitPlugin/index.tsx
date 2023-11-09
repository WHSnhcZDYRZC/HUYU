import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { memo, useEffect, useRef } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { defaultData } from './InitData'
import { Utils } from '@/utils';
import activeStore from '@/store';

const AutoSavePlugin = memo(() => {
    const setArticleContent = activeStore((state: any) => state.setArticleContent)
    const articleContent = activeStore((state: any) => state.articleContent)
    const setArticleTitle = activeStore((state: any) => state.setArticleTitle)

    const [editor] = useLexicalComposerContext();
    const { setBreadcrumb } = Utils.getUtils()

    const title = useRef("");

    const setDefaultDataHandler = () => {
        let data = articleContent
        if (!data) return;
        const json = JSON.parse(data);
        const editorState = editor.parseEditorState(
            JSON.stringify(json.editorState),
        );
        editor.setEditorState(editorState);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }

    const synchronizationContentHandler = () => {
        const data = {
            editorState: {
                ...editor.getEditorState().toJSON()
            }
        }

        setArticleContent(JSON.stringify(data))
    }

    useEffect(() => {
        editor.update(setDefaultDataHandler)
        editor.focus();
        editor.registerUpdateListener(({ editorState }) => {
            synchronizationContentHandler()
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

            // editorState.read(() => {
            // Just like editor.update(), .read() expects a closure where you can use
            // the $ prefixed helper functions.
            // });
        });
    }, [editor]);

    return null;
})

export default AutoSavePlugin;