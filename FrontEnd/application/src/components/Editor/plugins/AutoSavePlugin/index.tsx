import { $getRoot, $getSelection, $createParagraphNode, $createTextNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';

const AutoSavePlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.focus();

        setTimeout(() => {
            console.log("editor.getEditorState()", editor.getEditorState());

            console.log("editor.getEditorState().toJSON()", editor.getEditorState().toJSON());

            const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());

            console.log("stringifiedEditorState", stringifiedEditorState);

            const newEditorState = editor.parseEditorState(stringifiedEditorState);

            console.log("newEditorState ===>", newEditorState);

        }, 3000)

        // editor.update(() => {
        //     const json = JSON.parse(`
        //     {"editorState":{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"213","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"12","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ewq","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"dee","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"as","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"d ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}}`
        //     );

        //     console.log("json", json);
            

        //     const editorState = editor.parseEditorState(
        //         JSON.stringify(json.editorState),
        //     );
        //     editor.setEditorState(editorState);
        //     editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);

        //     // // Get the RootNode from the EditorState
        //     // const root = $getRoot();

        //     // // Get the selection from the EditorState
        //     // const selection = $getSelection();

        //     // // Create a new ParagraphNode
        //     // const paragraphNode = $createParagraphNode();

        //     // // Create a new TextNode
        //     // const textNode = $createTextNode(JSON.parse());

        //     // // 文本追加至段落
        //     // paragraphNode.append(textNode);

        //     // // 段落追加到根标签
        //     // root.append(paragraphNode);
        // })
    }, [editor]);

    return null;
}

export default AutoSavePlugin;