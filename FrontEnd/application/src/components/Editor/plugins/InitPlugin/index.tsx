import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { memo, useCallback, useEffect, useRef } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { defaultData } from './InitData'
import { Utils } from '@/utils';
import activeStore from '@/store';

const AutoSavePlugin = () => {
    const setArticleContent = activeStore((state: any) => state.setArticleContent)
    const articleContent = activeStore((state: any) => state.articleContent)
    const setArticleTitle = activeStore((state: any) => state.setArticleTitle)

    const articleContentStatic = useRef<string>("");

    const [editor] = useLexicalComposerContext();
    const { setBreadcrumb } = Utils.getUtils()

    const title = useRef("");

    const setDefaultDataHandler = useCallback(() => {
        let data = articleContent;
        if (!data) data = defaultData();
        const json = JSON.parse(data);
        const editorState = editor.parseEditorState(
            JSON.stringify(json.editorState),
        );
        editor.setEditorState(editorState);
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }, [articleContent, editor])

    const timer = useRef<any>();
    const synchronizationContentHandler = () => {
        // if (timer.current) clearTimeout(timer.current);

        const data = {
            editorState: {
                ...editor.getEditorState().toJSON()
            }
        }

        // timer.current = setTimeout(() => {
        setArticleContent(JSON.stringify(data))
        // }, 500)
        // articleContentStatic.current = JSON.stringify(data)
    }

    const init = useCallback(() => {
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
    }, [editor, synchronizationContentHandler, setDefaultDataHandler])

    useEffect(() => {
        init();
    }, [init]);

    return null;
}

export default AutoSavePlugin;