import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { defaultData } from './InitData'

const AutoSavePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // setTimeout(() => {
        //     console.log("editor.getEditorState()", editor.getEditorState());

        //     console.log("editor.getEditorState().toJSON()", editor.getEditorState().toJSON());

        //     const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());

        //     console.log("stringifiedEditorState", stringifiedEditorState);

        //     const newEditorState = editor.parseEditorState(stringifiedEditorState);

        //     console.log("newEditorState ===>", newEditorState);

        // }, 3000)

        editor.update(() => {
            let data = {}
            const _data = data.editorState ? data : defaultData()
            const json = JSON.parse(_data);
            const editorState = editor.parseEditorState(
                JSON.stringify(json.editorState),
            );
            editor.setEditorState(editorState);
            editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
        })

        editor.focus();

        editor.registerUpdateListener(({ editorState }) => {
            console.log("1", editorState);

            editorState.read(() => {
                // Just like editor.update(), .read() expects a closure where you can use
                // the $ prefixed helper functions.
            });
        });
    }, [editor]);

    return null;
}

export default AutoSavePlugin;