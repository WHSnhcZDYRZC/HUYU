import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { $createListItemNode, $createListNode } from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createLinkNode } from '@lexical/link';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import { TableContext } from './plugins/TablePlugin';
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { memo, useCallback, useEffect, useState } from 'react';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';

import { createWebsocketProvider } from './collaboration';
import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import PlaygroundNodes from './nodes/PlaygroundNodes';

import TableCellNodes from './nodes/TableCellNodes';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutocompletePlugin from './plugins/AutocompletePlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import CommentPlugin from './plugins/CommentPlugin';
import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import InlineImagePlugin from './plugins/InlineImagePlugin';

import MentionsPlugin from './plugins/MentionsPlugin';
import PageBreakPlugin from './plugins/PageBreakPlugin';
import PollPlugin from './plugins/PollPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';

import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';

import { LayoutPlugin } from './plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from './plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin';
import { TablePlugin as NewTablePlugin } from './plugins/TablePlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import styled from './Editor.less'
import InitPlugin from './plugins/InitPlugin';
import OptionsPlugin from './plugins/OptionsPlugin';
import HistoryStorage from '@/utils/HistoryStorage';

export const CAN_USE_DOM: boolean =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined';


const skipCollaborationInit = window.parent != null && window.parent.frames.right === window;

function prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
        const heading = $createHeadingNode('h1');
        heading.append($createTextNode('Welcome to the playground'));
        root.append(heading);
        const quote = $createQuoteNode();
        quote.append(
            $createTextNode(
                `In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. ` +
                `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`,
            ),
        );
        root.append(quote);
        const paragraph = $createParagraphNode();
        paragraph.append(
            $createTextNode('The playground is a demo environment built with '),
            $createTextNode('@lexical/react').toggleFormat('code'),
            $createTextNode('.'),
            $createTextNode(' Try typing in '),
            $createTextNode('some text').toggleFormat('bold'),
            $createTextNode(' with '),
            $createTextNode('different').toggleFormat('italic'),
            $createTextNode(' formats.'),
        );
        root.append(paragraph);
        const paragraph2 = $createParagraphNode();
        paragraph2.append(
            $createTextNode(
                'Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!',
            ),
        );
        root.append(paragraph2);
        const paragraph3 = $createParagraphNode();
        paragraph3.append(
            $createTextNode(`If you'd like to find out more about Lexical, you can:`),
        );
        root.append(paragraph3);
        const list = $createListNode('bullet');
        list.append(
            $createListItemNode().append(
                $createTextNode(`Visit the `),
                $createLinkNode('https://lexical.dev/').append(
                    $createTextNode('Lexical website'),
                ),
                $createTextNode(` for documentation and more information.`),
            ),
            $createListItemNode().append(
                $createTextNode(`Check out the code on our `),
                $createLinkNode('https://github.com/facebook/lexical').append(
                    $createTextNode('GitHub repository'),
                ),
                $createTextNode(`.`),
            ),
            $createListItemNode().append(
                $createTextNode(`Playground code can be found `),
                $createLinkNode(
                    'https://github.com/facebook/lexical/tree/main/packages/lexical-playground',
                ).append($createTextNode('here')),
                $createTextNode(`.`),
            ),
            $createListItemNode().append(
                $createTextNode(`Join our `),
                $createLinkNode('https://discord.com/invite/KmG4wQnnD9').append(
                    $createTextNode('Discord Server'),
                ),
                $createTextNode(` and chat with the team.`),
            ),
        );
        root.append(list);
        const paragraph4 = $createParagraphNode();
        paragraph4.append(
            $createTextNode(
                `Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance :).`,
            ),
        );
        root.append(paragraph4);
    }
}

const RichTextDom = () => {
    return (
        <div className={styled['rich-text-dom']}>
            {/* <div>新页面</div> */}
            {/* <p>回车开始编辑</p> */}
        </div>
    )
}

function Editor(): JSX.Element {
    const { historyState } = useSharedHistoryContext();
    const {
        settings: {
            isCollab,
            isAutocomplete,
            isMaxLength,
            isCharLimit,
            isCharLimitUtf8,
            isRichText,
            showTreeView,
            showTableOfContents,
            shouldUseLexicalContextMenu,
            tableCellMerge,
            tableCellBackgroundColor,
        },
    } = useSettings();
    const text = isCollab
        ? 'Enter some collaborative rich text...'
        : isRichText
            ? <RichTextDom />
            : 'Enter some plain text...';
    const placeholder = <Placeholder>{text}</Placeholder>;
    const [isSmallWidthViewport, setIsSmallWidthViewport] =
        useState<boolean>(false);

    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    const cellEditorConfig = {
        namespace: 'HuYu Editor',
        nodes: [...TableCellNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };

    useEffect(() => {
        const updateViewPortWidth = () => {
            const isNextSmallWidthViewport =
                CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };
        updateViewPortWidth();
        window.addEventListener('resize', updateViewPortWidth);

        return () => {
            window.removeEventListener('resize', updateViewPortWidth);
        };
    }, [isSmallWidthViewport]);

    const {
        settings: { emptyEditor },
    } = useSettings();

    const initialConfig = {
        editorState: isCollab
            ? null
            : emptyEditor
                ? undefined
                : prepopulatedRichText,
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };

    return (
        <div>
            <LexicalComposer initialConfig={initialConfig}>
                <SharedHistoryContext>
                    <TableContext>
                        <SharedAutocompleteContext>
                            {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />}
                            <div
                                className={`editor-container ${showTreeView ? 'tree-view' : ''} 
                                ${!isRichText ? 'plain-text' : ''
                                    }`}
                            >
                                <DragDropPaste />
                                {/* / 选择器 */}
                                <ComponentPickerPlugin />
                                <EmojiPickerPlugin />
                                <AutoEmbedPlugin />
                                <MentionsPlugin />
                                <EmojisPlugin />
                                <HashtagPlugin />
                                <KeywordsPlugin />
                                <SpeechToTextPlugin />
                                <InitPlugin />

                                {/* 导入、导出、删除 */}
                                <OptionsPlugin />

                                {/* <AutoLinkPlugin /> */}

                                <>
                                    {/* 撤销插件 */}
                                    {isCollab ? (
                                        <CollaborationPlugin
                                            id="main"
                                            providerFactory={createWebsocketProvider}
                                            shouldBootstrap={!skipCollaborationInit}
                                        />
                                    ) : (
                                        <HistoryPlugin externalHistoryState={historyState} />
                                    )}

                                    {/* 主体 */}
                                    <RichTextPlugin
                                        contentEditable={
                                            <div className="editor-scroller">
                                                <div className="editor" ref={onRef}>
                                                    <ContentEditable />
                                                </div>
                                            </div>
                                        }
                                        placeholder={placeholder}
                                        ErrorBoundary={LexicalErrorBoundary}
                                    />

                                    <TableCellResizer />
                                    <NewTablePlugin cellEditorConfig={cellEditorConfig}>
                                        <AutoFocusPlugin />
                                        <RichTextPlugin
                                            contentEditable={
                                                <ContentEditable className="TableNode__contentEditable" />
                                            }
                                            placeholder={null}
                                            ErrorBoundary={LexicalErrorBoundary}
                                        />
                                        <MentionsPlugin />
                                        <HistoryPlugin />
                                        <ImagesPlugin captionsEnabled={false} />
                                        <LinkPlugin />
                                        <LexicalClickableLinkPlugin />
                                        <FloatingTextFormatToolbarPlugin />
                                    </NewTablePlugin>
                                    <ImagesPlugin />
                                    <InlineImagePlugin />
                                    <LinkPlugin />
                                    <PollPlugin />
                                    <TwitterPlugin />
                                    <YouTubePlugin />
                                    <FigmaPlugin />
                                    <LexicalClickableLinkPlugin />
                                    <HorizontalRulePlugin />
                                    <EquationsPlugin />
                                    <ExcalidrawPlugin />
                                    <TabFocusPlugin />
                                    <TabIndentationPlugin />
                                    <CollapsiblePlugin />
                                    <PageBreakPlugin />
                                    <LayoutPlugin />

                                    {floatingAnchorElem && !isSmallWidthViewport && (
                                        <>
                                            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                                            <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                                            <FloatingLinkEditorPlugin
                                                anchorElem={floatingAnchorElem}
                                                isLinkEditMode={isLinkEditMode}
                                                setIsLinkEditMode={setIsLinkEditMode}
                                            />
                                            <TableCellActionMenuPlugin
                                                anchorElem={floatingAnchorElem}
                                                cellMerge={true}
                                            />
                                            <FloatingTextFormatToolbarPlugin
                                                anchorElem={floatingAnchorElem}
                                            />
                                        </>
                                    )}
                                </>
                            </div>
                        </SharedAutocompleteContext>
                    </TableContext>
                </SharedHistoryContext>
            </LexicalComposer>
        </div>
    );
}

export default memo(Editor);
